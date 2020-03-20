<template>
  <div class="section allschedules">
    <div class="columns">
      <div class="column">All Scheduled Posts</div>
    </div>
    <div class="columns">
      <div class="column table-container">
        <table class="table scheduletable">
          <tr v-for="(schedule,index) in allschedules" :key="index">
            <td v-for="(value,key) in schedule" :key="key" v-html="value"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../services/storage";
import { getAllSchedules } from "../services/network";
import { getUsefulData } from "../services/post";
export default {
  data() {
    return {
      allschedules: []
    };
  },
  mounted() {
    get("serverConfig").then(res => {
      getAllSchedules(res.serverAddr).then(data => {
        this.allschedules = getUsefulData(data);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.allschedules {
  padding: 0;
  .table-container {
    height: 26rem;
    overflow: auto;
  }
  table.scheduletable {
    width: 100%;
  }
}
</style>