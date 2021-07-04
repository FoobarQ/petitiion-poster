<template>
  <MediaQueryProvider :queries="{ mobile: '(max-width: 1080px)' }">
    <div class="Petition">
      <MatchMedia v-slot="{ mobile }">
        <template v-if="!$store.state.ready">
          <Loading :active="true" />
        </template>

        <template v-else-if="$store.state.status && mobile">
          <Dashboard />
          <Footer />
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
      </MatchMedia>
    </div>
  </MediaQueryProvider>
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
import { MediaQueryProvider, MatchMedia } from "vue-component-media-queries";
import Follow from "../components/Follow.vue";
import Footer from "../components/Footer.vue";

const seconds = 1000;
@Component({
  components: {
    Loading,
    Sidebar,
    Header,
    Dashboard,
    MediaQueryProvider,
    MatchMedia,
    Follow,
    Footer,
  },
})
export default class Petition extends Vue {
  @Getter("link")
  link!: string;
  tick: ReturnType<typeof setTimeout> = setInterval(
    this.handlePetitionResponse,
    5 * seconds
  );

  async beforeMount(): Promise<void> {
    await this.setTick(this.$route.params.id);
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
        console.error(err);
      }
    }
  }

  async setTick(id: string): Promise<void> {
    clearInterval(this.tick);
    await this.$store.dispatch("setPetitionId", id);
    this.tick = setInterval(this.handlePetitionResponse, 5 * seconds);
  }

  beforeDestroy(): void {
    clearInterval(this.tick);
  }
}
</script>
