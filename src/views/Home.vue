<template>
  <v-container>
    <GChart
    type="ColumnChart"
    :data="getMainChart"
    :options="chartOptions"
  />
  </v-container>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {
        chart: {
          title: 'Store Performance',
          subtitle: 'Last 24 hour sales',
        }
      }
    }
  },
  methods:{
    ...mapActions(['fetchMainChart'])
  },
  computed:{
    ...mapGetters(['getMainChart'])
  },
  created(){
    this.fetchMainChart()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
