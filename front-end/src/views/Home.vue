<template>
  <div class="home">
    <div class="options">
      <button @click="toggleCreateDiscussion">Create a Discussion</button>
      <router-link to="/settings"><button>Discussion Settings</button></router-link>
      <uploader :show="show" :discussions="discussions" @close="close" @uploadFinished="uploadFinished"/>
    </div>
    <table border="0" width="100%;">
      <tr>
        <td>
          <all-discussions :discussions="discussions" />
        </td>
        <td width="30%">
          <div class="statistics">
            <h2 class = 'numDiscussions'> Discussions: {{this.discussions.length}} </h2>
          </div>
        </td>
      </tr>
</table>
  </div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import AllDiscussions from '@/components/AllDiscussions.vue';

export default
{
  name: 'Home',
  components:
  {
    Uploader,
    AllDiscussions
  },

  data()  {
    return  {
      discussions: [],
      show: false,
    }
  },

  created()
  {
    this.getDiscussions();
  },

  methods:
  {
    toggleCreateDiscussion()
    {
      this.show = true;
    },

    close()
    {
      this.show = false;
    },

    async uploadFinished()
    {
      this.show = false;
      this.getDiscussions();
    },

    async getDiscussions()
    {
      try
      {
        let response = await axios.get("/discussion");
        this.discussions = response.data;
      }
      catch (error)
      {
        console.log(error);
      }
    },

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

<style>
  .options
  {
    margin-top: 50px;
    margin-bottom: 75px;
    display: flex;
    justify-content: space-evenly;
  }

  .options button
  {
    font-family: 'Work Sans';
    background-color: black;
    color: white;
    padding: 8px;
    border: none;
    border-radius: 10px;
    width: 110px;
  }

  .discussions
  {
    margin: 15px;
    border: 2px solid black;
    border-radius: 20px;
    height: 100px;
  }

  .statistics
  {
    display: block;
    font-family: 'Work Sans';
    margin-right: 200px;
    padding: 40px;
    background-color: #ff7f00;
    border-radius: 30px;
  }

  .numDiscussions {
    color: black;
    padding-bottom: 20px;
  }

  .numComments {
    color: black;
  }
</style>
