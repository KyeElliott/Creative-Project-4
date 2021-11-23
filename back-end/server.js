const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/creativeproject4', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const discussionSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const commentSchema = new mongoose.Schema({
  discussion: {
    type: mongoose.Schema.ObjectId,
    ref: 'Discussion'
  },

  name: String,
  commentText: String,
});

const Discussion = mongoose.model('Discussion', discussionSchema);
const Comment = mongoose.model('Comment', commentSchema);

//Create a new discussion
app.post("/discussion", async (req, res) => {
    const discussion = new Discussion({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
    });

    try {
      await discussion.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

//Retrieve all discussions
app.get("/discussion", async(req, res) => {
  try {
    let discussions = await Discussion.find();

    return res.send(discussions);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Retrieve a discussion by its ID
app.get("/discussion/:id", async (req, res) => {
  try {
    let discussion = await Discussion.findOne({
      _id: req.params.id
    });

    return res.send(discussion);
  }
  catch (error) {
    console.log(error);
    res.sendStatis(500);
  }
});

//Delete all discussions
app.delete("/discussion", async (req, res) => {
  try {
    await Discussion.deleteMany({});
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Delete all comments
app.delete("/discussion/comment", async (req, res) => {
  try {
    await Comment.deleteMany({});
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Create a comment
app.post("/discussion/comment/:id", async (req, res) => {
  try {
    let discussion = await Discussion.findOne({
      _id: req.params.id
    });

  let comment = new Comment({
    discussion: discussion,
    name: req.body.name,
    commentText: req.body.comment,
  });

    await comment.save();
    res.send(comment);
  }
  catch(error) {
    console.log(error);
    res.sendStatus(500);
  }

});

//Retrieve a list of all comments for a discussion
app.get("/discussion/comment/:id", async (req, res) => {
  try {
    let discussion = await Discussion.findOne({
      _id: req.params.id
    });

    let comments = await Comment.find({
      discussion: discussion
    });

    return res.send(comments);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));
