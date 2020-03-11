const express = require('express');
const helpers = require("./userDb");

const router = express.Router();

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

router.post('/:id/posts', (req, res) => {
  // do your magic!
});


router.get('/', async(req, res) => {
  const users = await helpers.get();
  res.status(200).json({ users});
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  helpers
    .getById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "No users with that id " + id });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id/posts', async(req, res) => {
  const { id } = req.params;
  const posts= await helpers.getUserPosts(id);
  helpers
    .getUserPosts(Number(id))
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "No posts associated with that user id " });
      } else {
        res.status(200).json(posts);
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

router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const changes = req.body;
  helpers
    .update(id, changes)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "Please provide a new name for the  user you wish to update" });
      } else if (!user) {
        res
          .status(400)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(changes);
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "could not update post"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
