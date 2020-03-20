<template>
  <div class="branding">
    <div class="columns title">
      <div class="column">
        <img src="../assets/ShedditLogo.png" width="100" height="100" />
        <span class="actions">
          <span class="icon sheddit-icon" @click="openSettings" title="Generate .env file">
            <i class="fas fa-file-code"></i>
          </span>
          <span class="icon sheddit-icon" @click="openGithub">
            <i class="fab fa-github"></i>
          </span>
        </span>
        <div>Sheddit</div>
      </div>
    </div>
    <div class="columns subtitle">
      <div class="column">Schedule posts for reddit and twitter for free! 💸</div>
    </div>
    <div class="columns">
      <div class="column">
        <modal name="settings" height="60%" width="80%">
          <Settings />
        </modal>
      </div>
    </div>
  </div>
</template>


<script>
import { openLink } from "../services/osservices";
import Settings from "./Settings";
export default {
  name: "Branding",
  components: {
    Settings
  },
  methods: {
    openGithub() {
      openLink("https://github.com/rahulnpadalkar/Sheddit");
    },
    openSettings() {
      this.$modal.show("settings");
    }
  }
};
</script>

<style lang="scss" scoped>
.branding {
  padding-bottom: 2rem;
  .title {
    font-size: 2rem;
    img {
      margin-left: 8rem;
    }
    span.actions {
      .sheddit-icon {
        margin: 0 0.3rem;
      }
      float: right;
      margin-top: 1.75rem;
      margin-right: 2rem;
    }
  }
}
</style>