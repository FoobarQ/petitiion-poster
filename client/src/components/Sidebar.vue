<template>
  <div class="sidebar">
    <div>
      <ticker />
      <div class="key">
        <template>
          <h4>Tracking Realtime Signatures</h4>
          <div class="constituency">
            <input type="checkbox" :name="total" checked disabled />
            <label :for="total">All regions</label>
          </div>
          <div
            v-for="(item, index) in trackingNames"
            v-bind:key="index"
            class="constituency"
          >
            <input
              type="checkbox"
              :name="item"
              @click="toggleLine(item, trackingType[item])"
              checked
            />
            <label :for="item">{{ item }}</label>
          </div>
        </template>
        <h3>Add To Tracking</h3>
        <input
          type="text"
          placeholder="Search.."
          id="myInput"
          v-model="filterCriteria"
        />
        <h4 v-show="filterCriteria">
          Constituencies containing "{{ filterCriteria }}"
        </h4>
        <div
          v-for="constituency of allConstituencies"
          v-bind:key="constituency.ons_code"
          class="constituency"
          @click="toggleLine(constituency.name, 'signatures_by_constituency')"
        >
          <input
            type="checkbox"
            :id="constituency.ons_code"
            :name="constituency.ons_code"
          />
          <label :for="constituency.ons_code">{{ constituency.name }}</label>
        </div>
        <template v-if="filterCriteria">
          <h4>Regions containing "{{ filterCriteria }}"</h4>
          <div
            v-for="(item, index) in allRegions"
            v-bind:key="index"
            class="constituency"
            @click="toggleLine(item, 'signatures_by_region')"
          >
            <input type="checkbox" :name="item" />
            <label :for="item">{{ item }}</label>
          </div>
        </template>
        <template v-if="filterCriteria">
          <h4>Constituencies in Regions containing "{{ filterCriteria }}"</h4>
          <div
            v-for="constituency of constituenciesByRegion"
            v-bind:key="constituency.name"
            class="constituency"
            @click="toggleLine(constituency.name, 'signatures_by_constituency')"
          >
            <input type="checkbox" :name="constituency.name" />
            <label :for="constituency.name">{{ constituency.name }}</label>
          </div>
        </template>
      </div>
      <div class="follow">
        Follow
        <a href="https://twitter.com/intent/user?screen_name=UKPetitionPosts"
          >@UKPetitionPosts on Twitter</a
        >
        to stay up to date with government petitions.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Constituency,
  constituencies,
  regions,
} from "../assets/constituencies";
import Ticker from "../components/Ticker.vue";

@Component({
  components: {
    Ticker,
  },
})
export default class Sidebar extends Vue {
  filterCriteria = "";
  trackingType: Record<string, string> = {};
  trackingNames: Array<string> = [];
  get allConstituencies(): Constituency[] {
    const search = this.filterCriteria.toUpperCase();
    return constituencies.filter(
      (value) =>
        value.name.toUpperCase().includes(search) &&
        !this.trackingNames.includes(value.name)
    );
  }

  get constituenciesByRegion(): Constituency[] {
    const search = this.filterCriteria.toUpperCase();
    return constituencies.filter(
      (value) =>
        value.region.toUpperCase().includes(search) &&
        !this.trackingNames.includes(value.name)
    );
  }

  get allRegions(): string[] {
    const search = this.filterCriteria.toUpperCase();
    return regions.filter(
      (value) =>
        value.toUpperCase().includes(search) &&
        !this.trackingNames.includes(value)
    );
  }

  toggleLine(name: string, type: string): void {
    if (this.$store.state.keyPairs[type + ":" + name]) {
      console.log(name, type);
      this.trackingNames.splice(this.trackingNames.indexOf(name));
      delete this.trackingType[name];

      console.log(this.$store.state.keyPairs[type + ":" + name]);
      console.log(type, name);
      this.$store.state.chartOptions.series.splice(
        this.$store.state.keyPairs[type + ":" + name]
      );
      delete this.$store.state.keyPairs[type + ":" + name];
      return;
    }

    this.$store.state.keyPairs[type + ":" + name] =
      this.$store.state.chartOptions.series.length;
    this.$store.state.chartOptions.series.push({
      data: [],
      type: "spline",
      marker: {
        enabled: false,
      },
      visible: this.$store.getters.showRealtime,
      showInLegend: this.$store.getters.showRealtime,
      name,
    });
    this.trackingNames.push(name);
    this.trackingType[name] = type;
  }
}
</script>

<style lang="scss" scoped>
.region {
  cursor: pointer;
  text-align: left;

  h1 {
    padding: 0px;
    margin: 0px;
  }
}

.region:hover,
.constituency:hover {
  background: rgb(240, 240, 240);
  cursor: pointer;
}

.constituency {
  border-bottom-style: solid;
  border-bottom-width: 0px;
  text-align: left;
}

.sidebar > div {
  width: 11%;
  min-width: 300px;
  float: left;
  top: 10%;
  height: 100%;
  border-right-color: lightgrey;
  border-right-style: solid;
  border-right-width: 1px;
  position: fixed;
  z-index: 1;
  bottom: 4%;
}

.key {
  height: 75%;
  max-height: 75%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: 2px;
}

.key::-webkit-scrollbar {
  width: 2px;
}

.class {
  position: absolute;
  bottom: 0px;
}

.follow {
  font-size: 1.2em;
  box-shadow: 0px -1px 3px 0px #ccc;
}

h4,
h3 {
  background: #080;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  padding-bottom: 0.33em;
  padding-top: 0.33em;
  box-shadow: 0px 1px 3px 0px #ccc;
  color: white;
  cursor: default;
}

input[type="text"] {
  width: 95%;
  margin-bottom: 4px;
}
</style>
