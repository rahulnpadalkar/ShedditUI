<template>
  <div class="section tabs">
    <div class="container">
      <Tabs orientation="vertical">
        <Tab name="Reddit" :selected="true">
          <Reddit />
        </Tab>
        <Tab name="Twitter">
          <Twitter />
        </Tab>
        <Tab name="Schedules">
          <Schedules />
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { Tabs, Tab } from "@crow1796/vue-bulma-tabs";
import Reddit from "./Reddit";
import Twitter from "./Twitter";
import Schedules from "./Schedules";
export default {
  components: {
    Tabs,
    Tab,
    Reddit,
    Twitter,
    Schedules
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  padding-top: 0rem;
}
</style>