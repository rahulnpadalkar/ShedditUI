<template>
  <div class="section createenv">
    <div class="title">Create .env file</div>
    <div class="header">
      <div class="head">Reddit</div>
      <div class="columns reddit client is-vcentered">
        <div class="column is-1">Client ID</div>
        <div class="column is-3">
          <input
            type="text"
            class="sheddit-input"
            v-model="reddit.clientid"
            placeholder="Reddit Client ID"
          />
        </div>
        <div class="column is-1">Client Secret</div>
        <div class="column is-3">
          <input
            type="text"
            class="sheddit-input"
            v-model="reddit.clientsecret"
            placeholder="Reddit Client Secret"
          />
        </div>
        <div class="column is-1">Useragent</div>
        <div class="column is-3">
          <input
            type="text"
            class="sheddit-input"
            v-model="reddit.useragent"
            placeholder="Reddit Useragent ex.MyAwesomeBot"
          />
        </div>
      </div>
      <div class="columns is-vcentered">
        <div class="column is-1">Username</div>
        <div class="column is-5">
          <input
            type="text"
            class="sheddit-input"
            v-model="reddit.username"
            placeholder="Reddit Username"
          />
        </div>
        <div class="column is-1">Passowrd</div>
        <div class="column is-5">
          <input
            type="text"
            class="sheddit-input"
            v-model="reddit.password"
            placeholder="Reddit Password"
          />
        </div>
      </div>
    </div>
    <div class="header">
      <div class="head">Twitter</div>
      <div class="columns is-vcentered">
        <div class="column is-2">Consumer Key</div>
        <div class="column is-4">
          <input
            type="text"
            class="sheddit-input"
            v-model="twitter.consumerkey"
            placeholder="Twitter Consumer Key"
          />
        </div>
        <div class="column is-2">Consumer Secret</div>
        <div class="column is-4">
          <input
            type="text"
            class="sheddit-input"
            v-model="twitter.consumersecret"
            placeholder="Twitter Consumer Secret"
          />
        </div>
      </div>
      <div class="columns is-vcentered">
        <div class="column is-2">Access Token</div>
        <div class="column is-4">
          <input
            type="text"
            class="sheddit-input"
            v-model="twitter.accesstoken"
            placeholder="Twitter Access Token"
          />
        </div>
        <div class="column is-2">Access Secret</div>
        <div class="column is-4">
          <input
            type="text"
            class="sheddit-input"
            v-model="twitter.accesssecret"
            placeholder="Twitter Access Secret"
          />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column generateenv">
        <div class="button is-warning" @click="createFile">Generate file</div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "validator";
import { writeAndSave } from "../services/osservices";
export default {
  name: "Settings",
  data() {
    return {
      reddit: {
        clientid: "",
        clientsecret: "",
        useragent: "",
        username: "",
        password: ""
      },
      twitter: {
        consumerkey: "",
        consumersecret: "",
        accesstoken: "",
        accesssecret: ""
      }
    };
  },
  methods: {
    createFile() {
      if (this.validate()) {
        writeAndSave(this.twitter, this.reddit);
        this.$toasted.success("File created successfully!");
      } else {
        this.$toasted.error("All fields are mandatory");
      }
    },
    validate() {
      return this.emptyCheck([this.reddit, this.twitter]);
    },
    emptyCheck(objs) {
      for (let j = 0; j < objs.length; j++) {
        let keys = Object.keys(objs[j]);
        for (let i = 0; i < keys.length; i++) {
          if (isEmpty(objs[j][keys[i]])) {
            return false;
          }
        }
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.createenv {
  .title {
    text-align: center;
  }
  .header {
    margin-bottom: 2rem;
    .head {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
    padding: 1rem 2rem 2rem 2rem;
    border: 2px solid #efefef;
    border-radius: 1rem;
    input.sheddit-input {
      width: 100%;
    }
  }
  .generateenv {
    text-align: center;
  }
}
</style>