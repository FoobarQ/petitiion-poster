<template>
  <div class="home" v-if="true">
    <Header />
    <chart-legend />
    <dashboard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import request from "request-promise";
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";
import ChartLegend from "@/components/ChartLegend.vue";
import Header from "@/components/Header.vue";
import Dashboard from "@/components/Dashboard.vue";
import { State, Getter } from "vuex-class";
import { AppState } from "@/store";

interface Debate {
  debated_on: string; //datetime
  transcript_url: string;
  video_url: string;
  debate_pack_url: string;
  overview: string;
}

interface Department {
  acronym: string;
  name: string;
  url: string;
}

interface GovernmentResponse {
  responded_on: string; //datetime
  summary: string;
  details: string;
  created_at: string; //datetime
  updated_at: string; //datetime
}

interface Rejection {
  code: string;
  details: string;
}

interface Country {
  name: string;
  code: string;
  signature_count: number;
}

interface Constituency {
  name: string;
  ons_code: string;
  mp: string;
  signature_count: number;
}

interface Region {
  name: string;
  ons_code: string;
  signature_count: number;
}

interface Attributes {
  action: string;
  background: string;
  additional_details: string;
  committee_note?: string;
  state: "open" | "closed";
  signature_count: number;
  created_at: Date;
  updated_at: Date;
  rejected_at?: Date;
  opened_at: Date;
  closed_at?: Date;
  moderation_threshold_reached_at?: Date;
  response_threshold_reached_at?: Date;
  government_response_at: Date;
  debate_threshold_reached_at?: Date;
  scheduled_debate_date?: Date;
  debate_outcome_at?: Date;
  creator_name: string;
  rejection?: Rejection;
  government_response?: GovernmentResponse;
  debate?: Debate;
  departments: Department[];
  topics: string[];
  signatures_by_country: Country[];
  signatures_by_constituency: Constituency[];
  signatures_by_region: Region[];
  other_parliamentary_business: any[];
}

interface Data {
  type: string;
  id: number;
  attributes: Attributes;
}

interface Links {
  self: string;
}
const seconds = 1000;
@Component({
  components: {
    LineChart,
    HelloWorld,
    PieChart,
    ChartLegend,
    Header,
    Dashboard,
  },
})
export default class Home extends Vue {
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
