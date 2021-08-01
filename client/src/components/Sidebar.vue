<template>
  <div class="sidebar">
    <div>
      <ticker />
      <div class="key">
        <template>
          <h4>Tracking Realtime Signatures</h4>
          <div class="tracking">
            <input type="checkbox" name="total" checked disabled />
            <label for="total">All regions</label>
          </div>
          <div
            v-for="(item, index) in trackingNames"
            v-bind:key="index"
            class="tracking"
          >
            <input
              type="checkbox"
              :name="item"
              @click="toggleLine(item, trackingType[item])"
              :checked="item"
            />
            <label :for="item">{{ item }}</label>
            <div class="mini-ticker">
              {{
                $store.state.signature_counts[item]
                  ? $store.state.signature_counts[item]
                  : 0
              }}
            </div>
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
      this.trackingNames.splice(this.trackingNames.indexOf(name), 1);
      delete this.trackingType[name];

      this.$store.state.chartOptions.series.splice(
        this.$store.state.keyPairs[type + ":" + name],
        1
      );
      for (const key in this.$store.state.keyPairs) {
        if (
          this.$store.state.keyPairs[key] >
          this.$store.state.keyPairs[type + ":" + name]
        ) {
          this.$store.state.keyPairs[key]--;
        }
      }
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
    Vue.set(this.trackingNames, this.trackingNames.length, name);
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
.constituency:hover,
.tracking:hover {
  background: rgb(240, 240, 240);
  cursor: pointer;
}

.constituency,
.tracking {
  border-bottom-style: solid;
  border-bottom-width: 0px;
  text-align: left;
}

.tracking {
  padding-top: 3px;
  border-top-color: lightgrey;
  border-top-width: 1px;
  border-top-style: solid;
  vertical-align: text-bottom;
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
  background: white;
}

.key {
  height: 75%;
  max-height: 75%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none;
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

.mini-ticker {
  height: 100%;
  max-width: 20%;
  float: right;
  font-weight: bold;
  padding-top: 2px;
  padding-right: 2px;
}

.tracking:hover > .mini-ticker {
  color: #080;
}

.tracking:first-of-type {
  border-top-color: white;
}
</style>
