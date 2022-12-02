import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

import {Question} from '../question';
import {Input} from '../input';
import {Scale} from '../scale';

import {useContext} from '../../store/context';
import {useSubmitForms} from '../../hooks/useSubmitForms';

import {actions} from '../../store/reducers';
import {random} from '../../hooks/useRandom';

import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';

export const questionTypes = {
  checkbox: 'checkbox',
  checkbox_other: 'checkbox_other',
  choice: 'choice',
  input: 'input',
  skip: 'skip',
  text: 'text',
  other: 'other',
  start: 'start',
  scale: 'scale',
  submit: 'submit',
  time: 'time',
  date: 'date',
};

export const Tools = () => {
  const {
    dispatch,
    formData,
    questions,
    chatIndex,
  } = useContext();

  const [timePickerValue, setTimePickerValue] = useState(
    moment(new Date()).format('hh:mm'));
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [other, setOther] = useState('');
  const [submit, setSubmit] = useState(false);

  useSubmitForms(formData?._id, submit);

  const clickSubmitForm = () => {
    setSubmit(true);
    createMessage('/Submit');
  };

  useEffect(() => {
    if (formData?.items[chatIndex]?.type === questionTypes.choice) {
      dispatch({
        type: actions.ADD_QUESTIONS,
        payload: formData?.items[chatIndex]?.questions,
      });
    }
  }, [chatIndex]);

  useEffect(() => {
    dispatch({type: actions.TYPING, payload: true});

    setTimeout(() => {
      if (formData?.items[chatIndex]?.type === questionTypes.text) {
        return createMessage(formData?.items[chatIndex]?.text, true);
      }

      dispatch({type: actions.TYPING, payload: false});
    }, 1000);
  }, [chatIndex]);

  const createMessage = (message, is = false, type) => {
    if (message?.trim()) {
      dispatch({
        type: actions.ADD_MESSAGE, payload: {
          text: message?.trim(),
          itemId: random(),
          type: type ? type : formData.items[chatIndex].type,
          is: !!is,
          date: new Date().toLocaleTimeString('en-GB', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
          }).toString(),
        },
      });

      dispatch({type: actions.CHAT_INDEX});
    }
  };

  return (
    <div className="chat-tools">
      <div className="chat-tools-container">
        <div className="rows-wrapper">
          <div className={cx('row', {
            'active': formData.items[chatIndex]?.type === questionTypes.choice,
          })}>
            <Question
              questions={formData?.items[chatIndex]?.questions}
              onClickQuestionRadio={(message) => createMessage(message)}
              onClickQuestionCheckbox={(id) => dispatch({
                type: actions.CHANGE_QUESTIONS, payload: id,
              })}
              choiceQuestionsType={formData.items[chatIndex]?.questionsType?.toLowerCase()}
            />
          </div>

          <div
            className={cx('row', {
              'active': formData.items[chatIndex]?.type ===
                questionTypes.input ||
                formData.items[chatIndex]?.questions?.find(
                  (question) => question?.isOther),
            })}
            style={{width: '100%'}}
          >
            {
              formData.items[chatIndex]?.type === questionTypes.input ||
              formData.items[chatIndex]?.questions?.find(
                (question) => question?.isOther) ?
                <Input
                  onClick={(message) => formData.items[chatIndex]?.questionsType?.toLowerCase()
                    ? createMessage(message, false, questionTypes.other)
                    : createMessage(message)}
                  onClickQuestionCheckbox={(message) => setOther(message)}
                  choiceQuestionsType={formData.items[chatIndex]?.questionsType?.toLowerCase()}
                /> : null
            }
          </div>

          <div className={cx('row', {
            'active': formData.items[chatIndex]?.type === questionTypes.scale,
          })}>
            <Scale
              onClick={(message) => createMessage(message)}
              scaleQuestion={formData.items[chatIndex]?.options}
            />
          </div>

          <div className={cx('row', {
            'active': formData.items[chatIndex]?.type === questionTypes.submit,
          })}>
            <button
              className="btn"
              onClick={() => clickSubmitForm()}
            >Submit
            </button>
          </div>

          <div className={cx('row', {
            'active': formData.items[chatIndex]?.type === questionTypes.start,
          })}>
            <button
              className="btn"
              onClick={() => createMessage('/Start')}
            >Start
            </button>
          </div>

          <div className={cx('row', {
            'active': formData.items[chatIndex]?.type === questionTypes.date,
          })}>
            <div className="picker__wrapper">
              <DatePicker
                selected={datePickerValue}
                onChange={(datePickerValue) => setDatePickerValue(
                  datePickerValue)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <button
                className="btn"
                onClick={() => createMessage(
                  moment(datePickerValue).format('DD/MM/YYYY'))}
              >Select
              </button>
            </div>
          </div>

          <div className={cx('row', {
            'active': formData.items[chatIndex]?.type === questionTypes.time,
          })}>
            <div className="picker__wrapper">
              <TimePicker
                onChange={(timePickerValue) => setTimePickerValue(
                  timePickerValue)}
                onKeyPress={event => event.key === 'Enter' &&
                  createMessage(timePickerValue)}
                value={timePickerValue}
              />
              <button
                className="btn"
                onClick={() => createMessage(timePickerValue)}
              >Select
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('row', {
        'active': formData.items[chatIndex]?.questionsType?.toLowerCase() ===
          questionTypes.checkbox,
      })}>
        <button
          className={cx('btn', {
            'disabled': other.length === 0 &&
              !questions.find(question => question.checked === true),
          })}
          onClick={() => {
            let checkedQuestions = [];
            questions.find(question => {
              if (question.checked === true) {
                checkedQuestions.push(question.value);
              }
            });

            if (other.length !== 0) {
              checkedQuestions.push(other);
            }

            if (other.length !== 0 && checkedQuestions.length === 1) {
              createMessage(
                checkedQuestions.join(', '),
                false,
                questionTypes.other,
              );
              return;
            }

            createMessage(
              checkedQuestions.join(', '),
              false,
              other.length === 0
                ? questionTypes.checkbox
                : questionTypes.checkbox_other,
            );
          }}
          style={{width: '-webkit-fill-available'}}
        >Select
        </button>
      </div>

      <div className={cx('row', {
        'active': formData.items[chatIndex]?.required,
      })}>
        <button
          className="btn skip"
          onClick={() => createMessage('/Skip', false, questionTypes.skip)}
        >
          Skip
        </button>
      </div>

    </div>
  );
};