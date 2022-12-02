const httpStatus = require('http-status');
const formsService = require('../services');
const catchError = require('../utils/catchError');
const AppError = require('../utils/appError');
const questionTypes = require('../config/types');

const submit = catchError(async (req, res) => {
  const {messages} = req.body;
  const id = req.params.id;

  if (!id || !messages) {
    throw new AppError(httpStatus.BAD_REQUEST);
  }

  const forms = await formsService.findOne(id);
  if (!forms) {
    throw new AppError(httpStatus.NOT_FOUND);
  }

  const script = await formsService.fetchForm(forms.responderUri);

  const ids = formsService.getIds(script.match(/<script ([^>]*)?>var F.*?<\/script>/g));

  const link = formsService.getLink(forms.responderUri.replace('viewform', 'formResponse'), ids, messages);

  const json = await formsService.fetchForm(link);

  return res.status(httpStatus.OK).json(json);
});

const create = catchError(async (req, res) => {
  const {id, token} = req.body;

  if (!id || !token) {
    throw new AppError(httpStatus.BAD_REQUEST, `id or token not valid`);
  }

  const form = await formsService.getFormByFormId(id);

  const formData = await formsService.getFormData(id, token);
  if (!formData) {
    throw new AppError(httpStatus.NOT_FOUND, `form data not found`);
  }

  // const formImage = await formsService.getFormImage(formData?.responderUri);

  const data = [
    {
      text: 'Hi',
      type: questionTypes.text,
    },
    {
      text: `Welcome to ${formData?.info?.title}`,
      // image: formImage,
      type: questionTypes.text,
    },
    {
      text: `${formData?.info?.description}`,
      type: questionTypes.text,
    },
    {
      type: questionTypes.start,
    },
  ];
  // .forEach((item) => {
  //     data.push({
  //         text: item?.text,
  //         type: item.type,
  //         ...item
  //     })
  // })

  // data.push({
  //     type: questionTypes.start,
  // });

  formData?.items?.forEach((item, index) => {
    // if(index === 1) {
    //     data.push({
    //         text: `Question ${index+1} out of ${formData?.items?.length}`,
    //         type: 'text',
    //     })
    // }

    // if(index+1 === formData?.items?.length) {
    //     data.push({
    //         text: 'Last question',
    //         type: 'text',
    //     })
    // }
    if (item?.title) {
      data.push({
        text: item.title,
        type: questionTypes.text,
      });
    }

    if (item?.description) {
      data.push({
        text: item?.description,
        type: questionTypes.text,
      });
    }

    if (item?.questionGroupItem) {
      item?.questionGroupItem?.questions.map((question) => {
        data.push({
          text: question?.rowQuestion?.title,
          type: questionTypes.text,
        });

        data.push({
          questions: item?.questionGroupItem?.grid?.columns?.options?.map(
            (option) => ({
              ...option,
            })),
          questionsType: item?.questionGroupItem?.grid?.columns?.type,
          required: !question?.required,
          type: questionTypes.choice,
        });
      });
    }

    if (item?.questionItem?.question?.choiceQuestion) {
      data.push({
        required: !item?.questionItem?.question?.required,
        questions: item?.questionItem?.question?.choiceQuestion?.options?.map(
          (option) => ({
            ...option,
          })),
        questionsType: item?.questionItem?.question?.choiceQuestion?.type,
        type: questionTypes.choice,
      });
    }

    if (item?.questionItem?.question?.scaleQuestion) {
      data.push({
        text: `${item?.questionItem?.question?.scaleQuestion?.low} ${item?.questionItem?.question?.scaleQuestion?.lowLabel}`,
        type: questionTypes.text,
      });

      data.push({
        text: `${item?.questionItem?.question?.scaleQuestion?.high} ${item?.questionItem?.question?.scaleQuestion?.highLabel}`,
        type: questionTypes.text,
      });

      data.push({
        required: !item?.questionItem?.question?.required,
        options: {
          ...item?.questionItem?.question?.scaleQuestion,
        },
        type: questionTypes.scale,
      });
    }

    if (item?.questionItem?.question?.textQuestion) {
      data.push({
        required: !item?.questionItem?.question?.required,
        type: questionTypes.input,
      });
    }

    if (item?.questionItem?.question?.dateQuestion) {
      data.push({
        required: !item?.questionItem?.question?.required,
        options: {
          ...item?.questionItem?.question?.dateQuestion,
        },
        type: questionTypes.date,
      });
    }

    if (item?.questionItem?.question?.timeQuestion) {
      data.push({
        required: !item?.questionItem?.question?.required,
        options: {
          ...item?.questionItem?.question?.timeQuestion,
        },
        type: questionTypes.time,
      });
    }
  });

  data.push({
    required: false,
    type: questionTypes.submit,
  });

  data.push({
    text: 'Thank you!',
    type: questionTypes.text,
  });

  if (form) {
    await formsService.updateForms(id, {
      ...formData,
      items: data,
    });
    return res.status(httpStatus.CREATED).json(form.id);
  }

  const newForms = await formsService.addForms({
    ...formData,
    items: data,
  });
  return res.status(httpStatus.CREATED).json(newForms.id);
});

const findOne = catchError(async (req, res) => {
  const id = req.params.id;

  const form = await formsService.findOne(id);
  if (!form) {
    throw new AppError(httpStatus.NOT_FOUND, `form not found`);
  }
  return res.status(httpStatus.OK).json(form);
});

module.exports = {
  findOne,
  submit,
  create,
};