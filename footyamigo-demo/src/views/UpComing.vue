<template>
  <div class="up-coming px-5">
    <b-overlay :show="loading" rounded="lg">
      <div
        class="
          up-coming-header
          d-flex
          align-items-start
          justify-content-space-between
        "
      >
        <div style="width: 50%">
          <div class="section d-flex align-items-center">
            <h1 class="up-coming-title">Upcomings</h1>
            <b-link href="#" class="helpLink"
              ><big><b-icon icon="caret-right-fill" class="mr-1"></b-icon></big
              >How it works?</b-link
            >
          </div>
          <p class="up-coming-description">
            This page shows you all the upcoming picks for all your active
            strategies all on one page.
          </p>
        </div>
        <b-button variant="success" class="add-strategy-btn"
          ><b-icon icon="plus" class="mr-3"></b-icon>Add New Strategy</b-button
        >
      </div>
      <div class="divider"></div>
      <div class="up-coming-body">
        <b-pagination
          v-model="currentPage"
          :total-rows="strategies.length"
          :per-page="perPage"
          aria-controls="my-table"
          class="mt-3"
          @change="changedPage"
        ></b-pagination>
        <div class="strategy-card mt-2">
          <div class="strategy-header">
            <div class="strategy-header-text">
              <h1 class="strategy-header-title">
                {{ loading ? "" : strategies[currentPage - 1]["title"] }}
              </h1>
              <span class="strategy-header-description">
                {{ loading ? "" : strategies[currentPage - 1]["note"] }}
              </span>
            </div>
            <div class="mt-1">
              <b-button class="mr-2 strategy-header-action"
                ><b-icon icon="calendar" class="mr-3"></b-icon>January 10,
                2022</b-button
              >
              <b-button class="strategy-header-action"
                ><b-icon icon="bar-chart" class="mr-3"></b-icon>Stats</b-button
              >
            </div>
          </div>
          <div class="divider"></div>
          <div class="strategy-body">
            <div
              class="strategy-play-info mt-4"
              v-for="fixture in fixtures"
              :key="fixture.fixture_id"
            >
              <div class="strategy-play-info-header mb-3">
                <div class="strategy-play-info-title">
                  <CountryFlag  v-bind:country="fixture.iso" size='normal' />&nbsp;{{fixture.country_name}}
                </div>
                <div class="strategy-play-info-action">EXCLUDE LEAGUE</div>
              </div>
              <div class="strategy-play-info-body">
                <div class="strategy-play-info-item">
                  <div class="play-time-level">
                    <span class="mr-3">{{fixture.time}}</span><span>{{fixture.fixture_name}}</span>
                  </div>
                  <div class="play-content">
                    <div>
                      <div class="team">
                        <img
                          class="team-mark"
                          v-bind:src="fixture.away_logo"
                        />
                        {{fixture.away_name}}
                      </div>
                      <div class="team">
                        <img
                          class="team-mark"
                          v-bind:src="fixture.home_logo"
                        />
                        {{fixture.home_name}}
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="play-info-opt mr-4">
                        <span class="opt-name">Home Win</span>
                        <b-button size="sm" class="opt-value" variant="danger"
                          >{{fixture.probability.home_win_probability}} %</b-button
                        >
                      </div>
                      <div class="play-info-opt mr-4">
                        <span class="opt-name">Draw</span>
                        <b-button size="sm" class="opt-value" variant="warning"
                          >{{fixture.probability.draw_probability}} %</b-button
                        >
                      </div>
                      <div class="play-info-opt mr-4">
                        <span class="opt-name">Away Win</span>
                        <b-button size="sm" class="opt-value" variant="success"
                          >{{fixture.probability.away_win_probability}} %</b-button
                        >
                      </div>
                      <div class="play-info-opt mr-4">
                        <span class="opt-name">BTTS</span>
                        <b-button size="sm" class="opt-value" variant="warning"
                          >{{fixture.probability.btts_probability}} %</b-button
                        >
                      </div>
                      <div class="play-info-opt mr-4">
                        <span class="opt-name">+2.5 Goals</span>
                        <b-button size="sm" class="opt-value" variant="success"
                          >{{fixture.probability.o25_goals_probability}} %</b-button
                        >
                      </div>
                      <div class="play-info-opt mr-4">
                        <span class="opt-name">+0.5 Home Goals</span>
                        <b-button size="sm" class="opt-value" variant="success"
                          >{{fixture.probability.o05_home_goals_probability}} %</b-button
                        >
                      </div>
                      <div class="play-info-opt mr-4">
                        <b-button
                          size="sm"
                          class="opt-arrow-btn"
                          variant="warning"
                        >
                          <b-icon icon="arrow-left"></b-icon>
                        </b-button>
                        <b-button
                          size="sm"
                          class="opt-arrow-btn mt-1"
                          variant="warning"
                        >
                          <b-icon icon="arrow-right"></b-icon>
                        </b-button>
                      </div>
                      <b-button size="lg" class="opt-status">{{fixture.status}}</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <b-overlay :show="loading_fixtures" rounded="lg">
              <div :show="loading_fixtures" class="overlay-region"></div>
            </b-overlay>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: "UpComing",
  props: {
    msg: String,
  },
  components: {
        CountryFlag
  },
  data() {
    return {
      perPage: 1,
      currentPage: 1,
      strategies: [],
      fixtures: [],
      loading: true,
      loading_fixtures: false,
    };
  },
  mounted() {
    this.$axios
      .get("https://footy-amigo-backend.herokuapp.com/api/strategies/21")
      .then((response) => {
        this.strategies = response.data;
        console.log(this.strategies);
        this.changedPage(1);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    changedPage: function (value) {
      this.fixtures = [];
      this.loading_fixtures = true;
      this.getFixtureData(value);
    },
    getFixtureData: function (value) {
      this.$axios
        .post("https://footy-amigo-backend.herokuapp.com/api/fixtures", {
          strategy: this.strategies[value - 1],
        })
        .then((response) => {
          this.fixtures = this.fixtures.concat(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading_fixtures = false));
    },
  },
};
</script>
