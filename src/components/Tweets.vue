<template>
<Tweet v-bind:id="tweetId"></Tweet>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Tweet, Moment, Timeline } from 'vue-tweet-embed';

@Component({
  components: {
    Tweet
  }
})
export default class Twitter extends Vue {
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
  width: 550px;
  height: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;
  background: none;
}
</style>