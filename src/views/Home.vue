<template>
  <div style="margin:25px 50px 0px 50px">
    <!-- <GChart type="ColumnChart" :data="getMainChart.GChart" :options="chartOptions" /> -->
    <v-row class="hidden-md-and-down">
      <v-col cols="6">
        <v-card class="mx-auto primary" style="border-radius:8px">
          <v-card-text>
            <span style="font-size:25px;color:white">Your earnings</span>
            <v-row>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Today
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.todaySales}}</v-list-item-title>
                    {{(getMainChart.todaySales-getMainChart.yesterdaySales) >0 ? '+'+(getMainChart.todaySales-getMainChart.yesterdaySales) : (getMainChart.todaySales-getMainChart.yesterdaySales)}} ₹
                    <br />vs Yesterday
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Month
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.thisMonthSales}}</v-list-item-title>
                    {{(getMainChart.thisMonthSales-getMainChart.lastMonthSales) >0 ? '+'+(getMainChart.thisMonthSales-getMainChart.lastMonthSales) : (getMainChart.thisMonthSales-getMainChart.lastMonthSales)}} ₹
                    <br />vs Last month
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.thisYearSales}}</v-list-item-title>
                    {{(getMainChart.thisYearSales-getMainChart.lastYearSales) >0 ? '+'+(getMainChart.thisYearSales-getMainChart.lastYearSales) : (getMainChart.thisYearSales-getMainChart.lastYearSales)}} ₹
                    <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto primary" style="border-radius:8px" >
          <v-card-text>
            <span style="font-size:25px;color:white">Balance</span>
            <span style="font-size:15px;color:white">(Today so far)</span>
            <v-row>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹5</v-list-item-title>
                    +0 ₹
                    <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹406</v-list-item-title>
                    +0 ₹
                    <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹1033</v-list-item-title>
                    +0 ₹
                    <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="hidden-lg-and-up">
      <v-col cols="12">
        <v-card class="mx-auto primary" style="border-radius:8px">
          <v-card-text>
            <span style="font-size:25px;color:white">Your earnings</span>
            <v-row>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Today
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.todaySales}}</v-list-item-title>
                    {{(getMainChart.todaySales-getMainChart.yesterdaySales) >0 ? '+'+(getMainChart.todaySales-getMainChart.yesterdaySales) : (getMainChart.todaySales-getMainChart.yesterdaySales)}} ₹
                    <br />vs Yesterday
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Month
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.thisMonthSales}}</v-list-item-title>
                    {{(getMainChart.thisMonthSales-getMainChart.lastMonthSales) >0 ? '+'+(getMainChart.thisMonthSales-getMainChart.lastMonthSales) : (getMainChart.thisMonthSales-getMainChart.lastMonthSales)}} ₹
                    <br />vs Last month
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.thisYearSales}}</v-list-item-title>
                    {{(getMainChart.thisYearSales-getMainChart.lastYearSales) >0 ? '+'+(getMainChart.thisYearSales-getMainChart.lastYearSales) : (getMainChart.thisYearSales-getMainChart.lastYearSales)}} ₹
                    <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto primary" style="border-radius:8px">
          <v-card-text>
            <span style="font-size:25px;color:white">Your earnings</span>
            <v-row>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Today
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.todaySales}}</v-list-item-title>
                    {{(getMainChart.todaySales-getMainChart.yesterdaySales) >0 ? '+'+(getMainChart.todaySales-getMainChart.yesterdaySales) : (getMainChart.todaySales-getMainChart.yesterdaySales)}} ₹
                    <br />vs Yesterday
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Month
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.thisMonthSales}}</v-list-item-title>
                    {{(getMainChart.thisMonthSales-getMainChart.lastMonthSales) >0 ? '+'+(getMainChart.thisMonthSales-getMainChart.lastMonthSales) : (getMainChart.thisMonthSales-getMainChart.lastMonthSales)}} ₹
                    <br />vs Last month
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title
                      class="headline mb-1 white--text"
                    >₹{{getMainChart.thisYearSales}}</v-list-item-title>
                    {{(getMainChart.thisYearSales-getMainChart.lastYearSales) >0 ? '+'+(getMainChart.thisYearSales-getMainChart.lastYearSales) : (getMainChart.thisYearSales-getMainChart.lastYearSales)}} ₹
                    <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {
        chart: {
          title: "Store Performance",
          subtitle: "Last 24 hour sales"
        }
      }
    };
  },
  methods: {
    ...mapActions(["fetchMainChart"])
  },
  computed: {
    ...mapGetters(["getMainChart"])
  },
  created() {
    this.fetchMainChart();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
