<template>
  <div class="Petition">
    <Header />
    <Sidebar />
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import request from "request-promise";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Dashboard from "@/components/Dashboard.vue";
import { Getter } from "vuex-class";

const seconds = 1000;
@Component({
  components: {
    Sidebar,
    Header,
    Dashboard,
  },
})
export default class Petition extends Vue {
  @Getter("link")
  link!: string;

  async mounted(): Promise<void> {
    await this.$store.dispatch("setPetitionId", this.$route.params.id);
    setInterval(this.handlePetitionResponse, 5 * seconds);
  }

  async handlePetitionResponse(): Promise<void> {
    const options = {
      method: "GET",
      url: `${this.link}.json`,
    };
    const whatever = await request(options);
    this.$store.commit("setPetition", JSON.parse(whatever).data.attributes);
  }
}
</script>

<style lang="scss"></style>
