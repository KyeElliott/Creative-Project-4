<template>
<div>
  <div class = "discussion">
    <h1 class = "poster-info">{{discussion.name}}</h1>
    <h2>{{discussion.title}}</h2>
    <p class = "description">{{discussion.description}}</p>
    <p class = "date-created"><em>{{formatDate(discussion.created)}}</em></p>
  </div>

  <div class="comment">
    <h1 class = "comment-heading">Comments</h1>
    <div class = "form">
      <input class = "input" autocomplete="off" v-model="name" placeholder="Name">
      <input class = "input" autocomplete="off" v-model="comment" placeholder="Add a comment...">
      <button class = "comment-button" @click="uploadComment">Comment</button>
    </div>

    <div class = "comments" v-for="comment in comments" v-bind:key="comment.commentText">
      <p><b class = "name">{{comment.name}}</b> {{formatDate(comment.created)}}</p>
      <p class = "commentString">{{comment.commentText}}</p>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Discussion',

  data() {
    return {
      discussion: '',
      comments: [],
      name: '',
      comment: '',
    }
  },

  async created() {
    this.getDiscussion();
    this.getComments();
  },

  methods: {
    async getDiscussion() {
      try {
        let response = await axios.get("/discussion/" + this.$route.params.id);
        this.discussion = response.data;
        } catch (error) {
          this.error = error.response.data.message;
        }
    },

   async getComments() {
      try {
        this.response = await axios.get("/discussion/comment/" + this.$route.params.id);
        this.comments = this.response.data;
        } catch (error) {
          this.error = error.response.data.message;
        }
    },

    async uploadComment() {
    try {
      let response = await axios.post("/discussion/comment/" + this.$route.params.id, {
        name: this.name,
        comment: this.comment,
      });

      this.comments.push(response.data);
      this.name = '';
      this.comment = '';
      }
      catch (error) {
      console.log(error);
      }
    },

    formatDate(date) {
    if (moment(date).diff(Date.now(), 'days') < 15)
      return moment(date).fromNow();
    else
      return moment(date).format('d MMMM YYYY');
      },
  }
}
</script>

<style scoped>
.discussion
{
  font-family: 'Work Sans';
  display: block;
  overflow: hidden;
  color: white;
  background-color: black;
  margin-left: 200px;
  margin-right: 200px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
  margin-top: 50px;
}

.description
{
  margin-top: 20px;
  margin-bottom: 40px;
}

.comment-heading {
  color: black;
}

.input {
  font-family: 'Work Sans';
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
}

.comment-button {
  font-family: 'Work Sans';
  color: white;
  margin-left: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: black;
}

.comment {
  margin-top: 100px;
}

.comments {
  font-family: 'Work Sans';
  color: black;
  margin-top: 50px;
}

.name {
  font-size: 1.2em;
}

.commentString {
  margin-top: 20px;
  font-size: 1.4em;
}
</style>
