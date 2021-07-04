<template>
  <Tweet v-bind:id="tweetId"></Tweet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tweet } from "vue-tweet-embed";

@Component({
  components: {
    Tweet,
  },
})
export default class Tweets extends Vue {
  @Prop({}) tweetId!: string;
}
</script>

<style lang="scss" scoped>
div.twitter-tweet.twitter-tweet-rendered {
  margin: none;
  margin-bottom: none;
  margin-top: none;
  height: 100px;
}

.flex-container > div {
  border: none;
  padding: none;
  height: fit-content;
  background: none;
  width: 550px;
}

@media (max-width: 1080px) {
  .flex-container > div {
    width: 90%;
  }
}
</style>
