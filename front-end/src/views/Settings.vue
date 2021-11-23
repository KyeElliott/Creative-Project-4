<template>
  <div class="home">
    <div class="options">
      <button @click="deleteDiscussions">Delete Discussions</button>
      <button @click="deleteComments">Delete Comments</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default
{
  name: 'Settings',

  methods:
  {
    async deleteDiscussions()
    {
      try
      {
        await axios.delete("/discussion");
        this.deleteComments();
        this.getDiscussions();
      }
      catch (error)
      {
        console.log(error);
      }
    },

    async deleteComments()
    {
      try
      {
        await axios.delete("/discussion/comment");
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }
}
</script>
