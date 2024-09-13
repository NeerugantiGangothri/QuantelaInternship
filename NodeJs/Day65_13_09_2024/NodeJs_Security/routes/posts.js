const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const posts = require('../models/posts');

// Rate limiter for post creation (2 posts per minute)
const postCreationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2, 
  message: 'You have reached the limit of 2 posts per minute. Please wait.'
});

router.get('/', (req, res) => {
  res.json(posts.getAllPosts());
});

router.post('/', postCreationLimiter, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newPost = posts.createPost(title, content);
  res.status(201).json(newPost);
});

module.exports = router;
