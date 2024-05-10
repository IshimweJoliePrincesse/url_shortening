const express = require('express');
const router = express.Router();
const { Url } = require('../models/urlModel');
const shortid = require('shortid');
const auth=require('../middleware/auth')
const _=require('lodash')

router.get('/user/:userId/urls', async (req, res) => {
  try {
    const urls = await Url.findById(req.params.userId); 

    if (urls.length === 0) {
      return res.status(404).json({ error: 'No URLs found for this user' });
    }

    res.json(_.pick(urls,["originalUrl","shortUrl"]));
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/shorten',auth, async (req, res) => {
  const originalUrl = req.body.url; 
  if (!originalUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  const userId=req.user._id



  const shortUrl = shortid.generate();

  const newUrl = new Url({
    originalUrl: originalUrl,
    shortUrl: shortUrl,
    user:userId
  });

  await newUrl.save();

  res.json({ shortUrl: shortUrl });
});

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;

  const url = await Url.findOne({ shortUrl: shortUrl });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

module.exports = router;