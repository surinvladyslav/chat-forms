const {Schema, model} = require('mongoose');

const forms = new Schema({
  formId: {
    type: String,
    unique: true,
    required: true,
  },
  info: {
    title: {
      type: String,
      required: true,
    },
    description: String,
    documentTitle: String,
  },
  items: {
    type: Array,
    required: true,
    allowNull: false,
  },
  revisionId: String,
  responderUri: String,
  imageUri: {
    type: String,
    allowNull: true,
  },
  createdAt: {
    type: String,
    default: Date,
  },
}, { minimize: false });

module.exports = model('forms', forms);