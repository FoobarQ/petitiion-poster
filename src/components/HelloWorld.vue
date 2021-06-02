<template>
  <div class="hello">
    <p>
      {{ text }}
    </p>
    <p>
      {{ continued }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private text!: string;
  @Prop() private continued!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h2 {
  color: white;
  background: #080;
  margin-top: 0px;
}

.hello {
  width: 32%;
  height: 300px;
  float: left;
  padding: 0px;
  background: white;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
  border-radius: 25px;
}
p {
  color: #080;
  padding: 5%;
  padding-top: 0%;
}
</style>
