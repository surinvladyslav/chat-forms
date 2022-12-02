const forms = require('../database/models/forms');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const AppError = require('../utils/appError');
const questionTypes = require('../config/types');

const addForms = (payload) => {
  return forms.create(payload);
};

const findOne = (id) => {
  return forms.findOne({
    _id: id,
  });
};

const matches = (text, pattern) => ({
  [Symbol.iterator]: function* () {
    const clone = new RegExp(pattern.source, pattern.flags);
    let match = null;
    do {
      match = clone.exec(text);
      if (match) {
        yield match;
      }
    } while (match);
  },
});

const getLink = (baseUrl, paramNames, paramValues) => {
  const Url = new URL(baseUrl);
  const urlParams = new URLSearchParams(Url.search);
  for (const key in paramNames) {
    switch (paramValues[key].type) {
      case questionTypes.skip:
        urlParams.append(paramNames[key], '');
        break;
      case questionTypes.checkbox:
        const checkboxes = paramValues[key].text.split(', ');
        checkboxes.forEach((value) => {
          urlParams.append(`${paramNames[key]}`, value);
        });
        break;
      case questionTypes.checkbox_other:
        const checkboxes_other = paramValues[key].text.split(', ');
        const other = checkboxes_other.pop();
        checkboxes_other.forEach((value) => {
          urlParams.append(`${paramNames[key]}`, value);
        });
        urlParams.append(paramNames[key], '__other_option__');
        urlParams.append(`${paramNames[key]}.other_option_response`, other);
        break;
      case questionTypes.other:
        urlParams.append(paramNames[key], '__other_option__');
        urlParams.append(`${paramNames[key]}.other_option_response`,
          paramValues[key].text);
        break;
      case questionTypes.date:
        const date = paramValues[key].text.split('/');
        const datesTypes = ['day', 'month', 'year'];

        date.forEach((value, index) => {
          urlParams.append(`${paramNames[key]}_${datesTypes[index]}`, value);
        });
        break;
      case questionTypes.time:
        const time = paramValues[key].text.split(':');
        const timesTypes = ['hour', 'minute'];

        time.forEach((value, index) => {
          urlParams.append(`${paramNames[key]}_${timesTypes[index]}`, value);
        });
        break;
      default:
        urlParams.append(paramNames[key], paramValues[key].text);
    }
  }
  Url.search = urlParams.toString();
  return Url.toString();
};

const getIds = (script) => {
  let ids = [];
  for (const match of matches(script, /(?<=\[\[)(\d+)/g)) {
    ids.push(match[0]);
  }

  ids.shift();

  return ids.filter(id => id.length > 5).map(id => `entry.${id}`);
};

const getFormData = async (formId, token) => {
  try {
    const response = await fetch(
      `https://forms.googleapis.com/v1/forms/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return await response.json();
  }
  catch (error) {
    throw new Error(error.message);
  }
};

const getFormImage = async (url) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  });

  const image = await page.$eval('.vnFTpb.teQAzf.ErmvL.KHCwJ',
    el => getComputedStyle(el).getPropertyValue('background-image'));
  await browser.close();

  return image.substring(5).slice(0, -2);
};

const getFormByFormId = (formId) => {
  return forms.findOne({
    formId,
  });
};

const fetchForm = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.text();
  }
  catch (error) {
    throw new AppError(404, error.message);
  }
};

const updateForms = (formId, formData) => {
  return forms.updateOne({
    formId,
  }, formData);
};

module.exports = {
  addForms,
  findOne,
  getFormByFormId,
  getLink,
  getFormImage,
  updateForms,
  fetchForm,
  getFormData,
  getIds,
};
