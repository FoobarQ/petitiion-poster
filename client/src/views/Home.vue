<template>
  <div class="home">
    <div class="header">
      <div class="data">
        <h1>Petition Tracker - See Data on UK Government ePetitions</h1>
        <div class="bumper">
          <h2>
            <a
              style="color: white"
              href="https://twitter.com/intent/user?screen_name=UKPetitionPosts"
              >Follow @UKPetitionPosts On Twitter!</a
            >
          </h2>
        </div>
      </div>
    </div>
    <template v-if="!actions">
      <Loading :active="true" />
    </template>
    <p>
      Congratulations! You're here before the site has a proper description.
      You're one of the specials ones. This is the companion site of
      <a href="https://twitter.com/intent/user?screen_name=UKPetitionPosts"
        >@UKPetitionPosts</a
      >. The twitter bot's purpose is to show people more of what's going on in
      government - the stuff that isn't usually covered in the daily news
      breifings, whereas the purpose of this site is to show just how effective
      or ineffective the petition process is with bringing about real change.
      The website is still being fleshed out but for now: please click around to
      see what you can see, and follow @UKPetitionPosts on twitter to send
      feedback on the site and/or to get petition updates right in your feed.
    </p>
    <div class="actions" v-if="actions">
      <div class="top">
        <select @change="changeOrder()" v-model="sortBy">
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
          <option value="za">A-Z</option>
          <option value="az">Z-A</option>
        </select>
      </div>
      <template v-for="action of actions">
        <div
          v-bind:key="action.id"
          @click="() => $router.push(`petitions/${action.id}`)"
          class=""
        >
          <h2>
            <a>{{ action.action }}</a>
          </h2>
        </div>
      </template>
      <div class="nav">
        <button @click="getPrevActions()" :disabled="!(offset >= 2 * limit)">
          prev
        </button>
        <button @click="getNextActions()">next</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

@Component({ components: Loading })
export default class Home extends Vue {
  sortBy = "new";
  mapping: Record<string, { orderBy: string; order: string }> = {
    new: { orderBy: "id", order: "DESC" },
    old: { orderBy: "id", order: "ASC" },
    most: { orderBy: "signature_count", order: "DESC" },
    least: { orderBy: "signature_count", order: "ASC" },
    az: { orderBy: "action", order: "DESC" },
    za: { orderBy: "action", order: "ASC" },
  };
  offset = 0;
  limit = 13;
  beforeMount(): void {
    this.getActions();
  }
  actions: any = [];

  getActions(): void {
    const { orderBy, order } = this.mapping[this.sortBy];

    fetch("/api/actions", {
      method: "post",
      body: JSON.stringify({
        limit: this.limit,
        offset: this.offset,
        orderBy,
        order,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.actions = data;
        this.offset += this.limit;
      });
  }

  getNextActions(): void {
    this.getActions();
  }

  getPrevActions(): void {
    this.offset -= 2 * this.limit;
    this.offset = Math.max(this.offset, 0);
    this.getActions();
  }

  changeOrder(): void {
    this.offset = 0;
    this.getActions();
  }
}
</script>

<style scoped>
.actions {
  position: fixed;
  border: lightgrey 2px solid;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 75%;
  bottom: 3%;
  top: 25%;
  left: 12.5%;
}

.actions div:not(.top):not(.nav) {
  cursor: pointer;
  height: 7%;
  text-align: left;
}

.actions div:not(.top):not(.nav):hover {
  background: lightgrey;
  margin: none;
}

.actions div:not(.top) + div:not(.top):not(.nav) {
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: black;
}

.top > div {
  text-align: right;
  display: inline-block;
  position: relative;
}

.nav {
  height: fit-content;
}

.nav button {
  position: absolute;
  left: 0px;
  outline: 2px;
  bottom: 0px;
}

.nav button + button {
  position: absolute;
  right: 0px;
  left: auto;
}

input {
  border-width: 0px;
  display: inline;
  padding: 0px;
  margin: 0px;
  max-width: 4em;
  font: inherit;
  font-size: 1em;
}

input:focus {
  border-bottom-color: #080;
  border-bottom-width: 3px;
  border-bottom-style: groove;
  outline: none;
}

.header {
  position: fixed;
  height: 10%;
  min-height: fit-content;
  width: 100%;
  z-index: 2;
  top: 0px;
  box-shadow: 0px 5px 3px 0px #ccc;
  min-height: 10%;
}

.bumper {
  position: relative;
  background: #080;
  color: white;
  bottom: 0px;
  margin: 0;
}

.bumper h2 {
  margin: 0;
}

.header h1 {
  font-size: 2.5em;
  background: none;
}

.header h2 {
  cursor: default;
}

.data {
  position: absolute;
  bottom: 0px;
}

.button:before {
  content: "";
  height: 110%;
  width: 100%;
  display: block;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
}

.button {
  background-color: #080;
  position: relative;
  display: inline-block;
  padding: 0.3em 0.6em 0.2em 0.6em;
  border: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-appearance: none;
  -webkit-box-shadow: 0 2px 0 #003c00;
  -moz-box-shadow: 0 2px 0 #003c00;
  box-shadow: 0 2px 0 #003c00;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  color: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 10px 5px 5px 0;
  padding: 0.1em;
  vertical-align: top;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  text-transform: none;
  text-align: center;
  width: 10%;
}

.button:hover {
  background: darkgreen;
}

.button:focus {
  background: #080;
}

.button + .button {
  background: grey;
}

.button + .button:hover {
  background: lightgrey;
}

.button + .button:focus {
  background: grey;
}

p {
  position: fixed;
  top: 15%;
  width: 75%;
  left: 12.5%;
}
</style>
