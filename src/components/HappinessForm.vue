<template>
  <div class="happiness">
    <div><h1>This petition is now closed.</h1>
      <form>
      <question>How satisfied are you with the result?</question>
      <span class="input"><input type="radio" id="a" name="gender" value="1"></span>
      <span class="input"><input type="radio" id="b" name="gender" value="2"></span>
      <span class="input"><input type="radio" id="c" name="gender" value="3"></span>
      <span class="input"><input type="radio" id="d" name="gender" value="4"></span>
      <span class="input"><input type="radio" id="e" name="gender" value="5"></span>
      <span class="input"><input type="radio" id="f" name="gender" value="6"></span>
      <span class="input"><input type="radio" id="g" name="gender" value="7"></span>
      <question>Did You Sign This Petition?</question>
      <span class="input"><input type="radio" id="h" name="gender" value="8"></span>
      <span class="input"><input type="radio" id="i" name="gender" value="9"></span>
      <question>If You Had The Choice, Would You Vote For or Against?</question>
      <span class="input"><input type="radio" id="j" name="gender" value="10"></span>
      <span class="input"><input type="radio" id="k" name="gender" value="11"></span>
      <button>Submit</button>
      </form>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HappinessForm extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
.happiness {
  height: fit-content;
  max-height: 550px;
  width: 1400px;

  div {
    padding: 30px;
    font-size: 2em;
  }

  form {
    height: 200px;
  }
}
p {
  color: #080;
  padding: 1%;
  padding-top: 0%;
}

h1 {
  margin: 0px;
  padding: 0px;
}

question {
  font-family: 1.8em;
  display: block;
}
</style>
