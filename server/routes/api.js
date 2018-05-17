const express = require('express');
const app = express();
const router = express.Router();

const Post = require('../../models/Post');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// /* GET api listing. */
// router.get('/', (req, res) => {
//   // res.send('api works');
// });

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

// Saving route
router.route('/add').post(function (req, res) {
  var post = new Post(req.body);
    post.save()
    .then(item => {
      res.status(200).json({'post': 'Post added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Get data route
router.route('/').get(function (req, res) {
  Post.find(function (err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts);
    }
  });
});

//Edit route
router.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Post.findById(id, function (err, post){
    res.json(post);
  });
});

//Update route
router.route('/update/:id').post(function (req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (!post)
      return next(new Error('Could not load Document'));
    else {
      post.title = req.body.title;
      post.body = req.body.body;

      post.save().then(post => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

//Delete route
router.route('/delete/:id').get(function (req, res) {
  Post.findByIdAndRemove({_id: req.params.id}, function(err, post) {
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = router;
