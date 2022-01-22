<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
  name: "AntennaChart",
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false
    }
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
}
</script>

<style scoped>

</style>