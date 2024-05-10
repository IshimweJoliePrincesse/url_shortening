const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  originalUrl: String,
  shortUrl: {
    type: String,
    default: shortid.generate
  }
});

const Url = mongoose.model('Url', urlSchema);

exports.Url = Url;