<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { MediaQueryProvider } from "vue-component-media-queries";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    MediaQueryProvider,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dee0e2;
}

a {
  text-decoration: none;
  color: #080;
}

.data {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.title.mobile {
  display: none;
}

body {
  margin: 0px;
  background: #dee0e2;
}

@media (max-width: 1080px) {
  .title.mobile {
    display: block;
    min-width: 98%;
  }
  .title.desktop {
    display: none;
  }
}
</style>
