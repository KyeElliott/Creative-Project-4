<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">AnonyMessage</router-link>
    </div>
    <router-view/>
    <div class ="github">
      <a href="https://github.com/KyeElliott/Creative-Project-4"><img src="Github Logo.png"></a>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 25px;
}

#nav a {
  font-family: 'Work Sans', sans-serif;
  font-weight: bold;
  color: white;
  padding: 12px;
  padding-top: 50px;
  text-decoration: none;
  font-size: 40px;
  background-color: black;
  border-radius: 10px;
}

.github {
  display: flex;
  justify-content: center;
}

.github img {
  border: 2px solid black;
  border-radius: 20px;
  padding: 20px;
  margin-top: 100px;
  width: 200px;
}
</style>
