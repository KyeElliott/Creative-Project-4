<template>
<div>
  <section class="all-discussions">
    <div class="discussion" v-for="discussion in discussions" v-bind:key="discussion.title">
      <router-link :to="{ name: 'Discussion', params: { id: discussion._id }}"><h1 class = "poster-info">{{discussion.name}}</h1>
      <h2>{{discussion.title}}</h2>
      <p class = "description">{{discussion.description}}</p>
      <p class = "date-created"><em>{{formatDate(discussion.created)}}</em></p></router-link>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AllDiscussions',
  props: {
    discussions: Array
  },
  
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
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
}

a {
  color: white;
  text-decoration: none;
}

.description
{
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>
