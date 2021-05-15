<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="4">
        <base-material-stats-card
          color="info"
          icon="mdi-emoticon-happy"
          title="빈 주차장"
          :value="emptyPark.count.toString() + '개'"
          sub-icon="mdi-parking"
          :sub-text="getParkPercentage(emptyPark.count)"
        />
      </v-col>
      <v-col cols="4">
        <base-material-stats-card
          color="red"
          icon="mdi-emoticon-cry"
          title="주차됨"
          :value="parkPark.count.toString() + '개'"
          sub-icon="mdi-parking"
          :sub-text="getParkPercentage(parkPark.count)"
        />
      </v-col>
      <v-col cols="4">
        <base-material-stats-card
          color="yellow"
          icon="mdi-emoticon-sad"
          title="예약"
          :value="reservePark.count.toString() + '개'"
          sub-icon="mdi-parking"
          :sub-text="getParkPercentage(reservePark.count)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <base-material-card
          id="coloured-line"
          color="red"
          title="시간별 통계"
          icon="mdi-chart-bell-curve"
        >
          <apexchart
            v-if="lineChart !== undefined"
            type="line"
            :options="lineChart.chartOptions"
            :series="lineChart.series"
          />
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'DashboardDashboard',

    data () {
      return {}
    },
    computed: {
      ...mapGetters(['emptyPark', 'parkPark', 'reservePark', 'lineChart']),
    },

    created () {
      this.getParkStatus()
      this.getStatisticDay()
    },

    methods: {
      ...mapActions(['getParkStatus', 'getStatisticDay']),
      getParkPercentage (count) {
        return ((count / 5) * 100).toString() + '%'
      },
    },
  }
</script>
