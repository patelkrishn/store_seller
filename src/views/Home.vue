<template>
  <div style="margin:25px 50px 0px 50px">
    <v-row class="hidden-md-and-down">
      <v-col cols="6">
        <v-card
          class="mx-auto primary"
          style="border-radius:8px"
          min-height="205"
        >
          <v-card-text>
            <span style="font-size:25px;color:white">Your earnings</span>
            <v-row>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Today
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.todaySales }}</v-list-item-title
                    >
                    {{
                      getMainChart.todaySales - getMainChart.yesterdaySales > 0
                        ? "+" +
                          (getMainChart.todaySales -
                            getMainChart.yesterdaySales)
                        : getMainChart.todaySales - getMainChart.yesterdaySales
                    }}
                    ₹ <br />vs Yesterday
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Month
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.thisMonthSales }}</v-list-item-title
                    >
                    {{
                      getMainChart.thisMonthSales -
                        getMainChart.lastMonthSales >
                      0
                        ? "+" +
                          (getMainChart.thisMonthSales -
                            getMainChart.lastMonthSales)
                        : getMainChart.thisMonthSales -
                          getMainChart.lastMonthSales
                    }}
                    ₹ <br />vs Last month
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.thisYearSales }}</v-list-item-title
                    >
                    {{
                      getMainChart.thisYearSales - getMainChart.lastYearSales >
                      0
                        ? "+" +
                          (getMainChart.thisYearSales -
                            getMainChart.lastYearSales)
                        : getMainChart.thisYearSales -
                          getMainChart.lastYearSales
                    }}
                    ₹ <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto primary"
          style="border-radius:8px"
          min-height="205"
        >
          <v-card-text>
            <span style="font-size:25px;color:white">Balance</span>
            <span style="font-size:15px;color:white">(Today so far)</span>
            <v-row>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Expenses
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.expenseTodaySoFar }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Earnings
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.earningTodaySoFar }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Balance
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{
                        getMainChart.earningTodaySoFar -
                          getMainChart.expenseTodaySoFar
                      }}</v-list-item-title
                    >
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
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.todaySales }}</v-list-item-title
                    >
                    {{
                      getMainChart.todaySales - getMainChart.yesterdaySales > 0
                        ? "+" +
                          (getMainChart.todaySales -
                            getMainChart.yesterdaySales)
                        : getMainChart.todaySales - getMainChart.yesterdaySales
                    }}
                    ₹ <br />vs Yesterday
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Month
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.thisMonthSales }}</v-list-item-title
                    >
                    {{
                      getMainChart.thisMonthSales -
                        getMainChart.lastMonthSales >
                      0
                        ? "+" +
                          (getMainChart.thisMonthSales -
                            getMainChart.lastMonthSales)
                        : getMainChart.thisMonthSales -
                          getMainChart.lastMonthSales
                    }}
                    ₹ <br />vs Last month
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    This Year
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.thisYearSales }}</v-list-item-title
                    >
                    {{
                      getMainChart.thisYearSales - getMainChart.lastYearSales >
                      0
                        ? "+" +
                          (getMainChart.thisYearSales -
                            getMainChart.lastYearSales)
                        : getMainChart.thisYearSales -
                          getMainChart.lastYearSales
                    }}
                    ₹ <br />vs Last year
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          class="mx-auto primary"
          style="border-radius:8px"
          min-height="205"
        >
          <v-card-text>
            <span style="font-size:25px;color:white">Balance</span>
            <span style="font-size:15px;color:white">(Today so far)</span>
            <v-row>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Expenses
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.expenseTodaySoFar }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Earnings
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{ getMainChart.earningTodaySoFar }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-divider class="mx-5" inset vertical></v-divider>
              <v-col cols="3.75">
                <v-list-item two-line>
                  <v-list-item-content class="white--text">
                    Balance
                    <v-list-item-title class="headline mb-1 white--text"
                      >₹{{
                        getMainChart.earningTodaySoFar -
                          getMainChart.expenseTodaySoFar
                      }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6" lg="4" md="6">
        <v-card>
          <v-card-title>
            <span>Highest Sale</span><sub>(This months)</sub>
          </v-card-title>
          <v-card-text>
            <apexchart
              type="donut"
              :options="{
                palette: 'palette10',
                labels: labels,
                legend: {
                  show: false,
                },
                noData: {
                  text: 'No data available',
                  align: 'center',
                  verticalAlign: 'middle',
                  offsetX: 0,
                  offsetY: 0,
                  style: {
                    color: undefined,
                    fontSize: '20px',
                    fontFamily: undefined,
                  },
                },
              }"
              :series="series"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" lg="4" md="6">
        <v-card>
          <v-card-title>
            <span>Highest Sale</span><sub>(This months)</sub>
          </v-card-title>
          <v-card-text>
            <apexchart
             height="340"
              type="line"
              :options="{
                xaxis: {
                  categories: categories,
                },
                legend: {
                  show: false,
                },
                noData: {
                  text: 'No data available',
                  align: 'center',
                  verticalAlign: 'middle',
                  offsetX: 0,
                  offsetY: 0,
                  style: {
                    color: undefined,
                    fontSize: '20px',
                    fontFamily: undefined,
                  },
                },
              }"
              :series="date"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Home",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      labels:[],
      date:[{
        name: 'series-1',
        data: []
      }],
      categories:[],
      series:[],
    };
  },
  methods: {
    ...mapActions(["fetchMainChart"]),
  },
  computed: {
    ...mapGetters(["getMainChart"]),
  },
  created() {
    this.fetchMainChart();
    setInterval(()=>{
      this.labels=this.getMainChart.highestSale.productName
      this.date[0].data=this.getMainChart.thisMonthSalesGraph.totalAmount
      this.categories=this.getMainChart.thisMonthSalesGraph.date
      this.series=this.getMainChart.highestSale.invoiceQuantity
    },100)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
