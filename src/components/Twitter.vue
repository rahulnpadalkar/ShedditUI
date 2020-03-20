<template>
  <div class="section twitter">
    <div class="container">
      <div class="columns is-vcentered tweet">
        <div class="column is-2">Tweet</div>
        <div class="column is-10">
          <textarea
            v-model="tweet"
            class="textarea sheddit-input"
            placeholder="Tweet your heart out!"
          />
        </div>
      </div>
      <div class="columns is-vcentered scheduledate">
        <div class="column is-2">Schedule Date</div>
        <div class="column is-10">
          <VueCtkDateTimePicker
            v-model="scheduledate"
            :no-label="true"
            hint="Pick schedule date and time"
            :no-button-now="true"
          />
        </div>
      </div>
      <div class="columns is-vcentered scheduleaction">
        <div class="column">
          <div class="button is-primary is-medium" @click="schedulePost">Schedule</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import { isEmpty } from "validator";
import { postTwitter } from "../services/post";
export default {
  name: "Twitter",
  components: {
    VueCtkDateTimePicker
  },
  data() {
    return {
      tweet: "",
      scheduledate: ""
    };
  },
  methods: {
    schedulePost() {
      if (this.validate(this.tweet, this.scheduledate)) {
        postTwitter({
          text: this.tweet,
          scheduledate: this.scheduledate
        })
          .then(() => {
            this.$toasted.success("Sccessfully scheduled!");
          })
          .catch(e => {
            this.$toasted.error(e);
          });
      } else {
        this.$toasted.error("All fields are compulsary");
      }
    },
    validate(tweet, scheduledate) {
      if (isEmpty(tweet) || isEmpty(scheduledate)) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.twitter {
  .columns {
    margin-bottom: 4rem;
  }
}
</style>