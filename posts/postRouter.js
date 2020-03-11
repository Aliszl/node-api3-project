const express = require('express');
const helpers = require("./postDb");

const router = express.Router();

router.get('/', async(req, res) => {
  const posts = await helpers.get();
  res.status(200).json({ posts });
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
