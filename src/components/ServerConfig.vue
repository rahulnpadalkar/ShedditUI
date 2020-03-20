<template>
  <div class="section server-config">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column">
          Server Address
          <input
            v-model="serverAddr"
            class="sheddit-input addr"
            placeholder="Sheddit Server IP"
          />
        </div>
      </div>
      <div class="columns is-vcentered">
        <div class="column">
          <div class="button is-danger" @click="saveConfig">Check Server Status</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { insert, get } from "../services/storage";
import { isServerOnline } from "../services/network";
export default {
  name: "ServerConfig",
  data() {
    return {
      serverAddr: ""
    };
  },
  methods: {
    saveConfig() {
      let serverAddr = this.serverAddr;
      if (this.validate(serverAddr)) {
        this.checkServerStatus(serverAddr)
          .then(() => {
            insert("serverConfig", { serverAddr }).then(() => {
              this.$toasted.success("Server is online!");
            });
          })
          .catch(() => {
            this.$toasted.error("Server isn't online.");
          });
      } else {
        this.$toasted.error("Invalid Server URL");
      }
    },
    validate(serverAddress) {
      try {
        new URL(serverAddress);
        return true;
      } catch {
        return false;
      }
    },
    checkServerStatus(serverAddr) {
      return isServerOnline(serverAddr);
    }
  },

  mounted() {
    get("serverConfig").then(obj => {
      this.serverAddr = obj.serverAddr;
    });
  }
};
</script>

<style lang="scss">
.server-config {
  input.addr {
    width: 70%;
    margin-left: 0.3rem;
  }
  input.port {
    width: 40%;
    margin-left: 0.3rem;
  }
}

.sheddit-input {
  font-size: 1rem;
  padding: 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
}

.sheddit-input:focus {
  outline: none;
  border-color: #0466d6;
}
</style>