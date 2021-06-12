<template>
  <div id="app">
    <div id="nav"></div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: white;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header {
  box-shadow: 0px 5px 3px 0px #ccc;
  position: fixed;
  height: 150px;
  width: 100%;
  top: 0px;
  z-index: 2;
}

a {
  text-decoration: none;
  color: #080;
}

h1 + div {
  position: relative;
  background: #080;
  color: white;
  bottom: 0px;
  margin: 0;

  h2 {
    margin: 0;
  }
}

.data {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
