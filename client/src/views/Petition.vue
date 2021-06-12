<template>
  <div class="Petition">
    <template v-if="!$store.state.ready">
      <Loading :active="true" />
    </template>
    <template v-else-if="$store.state.status">
      <Header />
      <Sidebar />
      <Dashboard />
    </template>
    <template v-else>
      <div class="None">
        ERROR: The ID No. ({{ $route.params.id }}) doesn't correspond to a
        petition
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import request from "request-promise";
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import Dashboard from "../components/Dashboard.vue";
import { Getter } from "vuex-class";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const seconds = 1000;
@Component({
  components: {
    Loading,
    Sidebar,
    Header,
    Dashboard,
  },
})
export default class Petition extends Vue {
  @Getter("link")
  link!: string;
  tick: ReturnType<typeof setTimeout> = setInterval(() => {
    console.log("waiting"), 20 * seconds;
  });

  async beforeMount(): Promise<void> {
    await this.setTick(this.$route.params.id);
    console.log("beforeMount");
  }

  async handlePetitionResponse(): Promise<void> {
    const options = {
      method: "GET",
      url: `${this.link}.json`,
    };
    if (this.$store.state.status) {
      try {
        const whatever = await request(options);
        this.$store.commit("setPetition", JSON.parse(whatever).data.attributes);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async setTick(id: string) {
    clearInterval(this.tick);
    await this.$store.dispatch("setPetitionId", id);
    this.tick = setInterval(this.handlePetitionResponse, 5 * seconds);
    return;
  }

  beforeDestroy() {
    clearInterval(this.tick);
  }
}
</script>

<style lang="scss"></style>
