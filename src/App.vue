<template>
  <div id="app">
    <Branding />
    <ServerConfig />
    <Tabs />
  </div>
</template>

<script>
import Branding from "./components/Branding";
import ServerConfig from "./components/ServerConfig";
import Tabs from "./components/Tabs";
import { subscribeToNetwork } from "./services/network";
export default {
  name: "App",
  components: {
    Branding,
    ServerConfig,
    Tabs
  },
  mounted() {
    subscribeToNetwork(
      () => {
        this.$toasted.error("No network 😔", {
          duration: null,
          position: "top-right",
          theme: "toasted-primary",
          className: "network-toast"
        });
      },
      () => {
        this.$toasted.clear();
        this.$toasted.success("🥳 Looks like the network is back! YAY!🎉", {
          duration: 5000,
          position: "top-right",
          theme: "toasted-primary",
          className: "network-toast"
        });
      }
    );
  }
};
</script>

<style>
.network-toast {
  padding: 1rem;
}
.sheddit-icon {
  color: black !important;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 1.25rem;
  border-radius: 1.5rem;
}
.sheddit-icon:hover {
  background: #ebebeb;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.2rem;
}
</style>
