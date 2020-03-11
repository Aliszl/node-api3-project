const express = require('express');
const helpers = require("./postDb");

const router = express.Router();

router.get('/', async(req, res) => {

  const posts = await helpers.get();
  res.status(200).json({ posts });
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  helpers
    .getById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "No post with id " + id });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
    });
});

router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const deletedPosts =[];

  helpers.getById(id).then(post =>{
    deletedPosts.push(post);
    res.status(200).json(post);
  })

  helpers
    .remove(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(204).json({ message: "Removed " });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/", async (req, res) => {
  const payload = req.body;
  helpers
    .insert(payload)
    .then(post => {
      if (!post) {
        res
          .staus(400)
          .json({
            errorMessage: "Please provide text for the post"
          });
      } else {
        res.status(201).json(payload);
      }
    })
    .catch(error => {
      console.log(error);
      res.end();
      res.status(500).json({
        error: "could not add post"
      });
    });
});
router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
