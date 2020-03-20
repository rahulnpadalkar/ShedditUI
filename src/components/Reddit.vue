<template>
  <div class="section reddit">
    <div class="container">
      <div class="columns subreddits is-vcentered">
        <div class="column is-2">Subreddits</div>
        <div class="column is-10">
          <input
            class="sheddit-input"
            placeholder="Comma seperate if multiple"
            v-model="subreddits"
          />
        </div>
      </div>
      <div class="columns posttitle is-vcentered">
        <div class="column is-2">Title</div>
        <div class="column is-10">
          <input class="sheddit-input" placeholder="Post Title" v-model="title" />
        </div>
      </div>
      <div class="columns posttype link is-vcentered">
        <div class="column is-2">Link</div>
        <div class="column is-10">
          <input
            class="sheddit-input"
            type="url"
            placeholder="Link to post"
            :disabled="postType === 'text' ? true: false"
            v-model="postlink"
          />
        </div>
      </div>
      <div class="columns posttype text is-vcentered">
        <div class="column is-2">Text</div>
        <div class="column is-10">
          <input
            class="sheddit-input"
            type="text"
            v-model="posttext"
            :disabled="postType === 'link' ? true: false"
            placeholder="Text to post"
          />
        </div>
      </div>
      <div class="columns scheduledate is-vcentered">
        <div class="column is-2">Schedule Date</div>
        <div class="column">
          <VueCtkDateTimePicker
            v-model="scheduledate"
            :no-label="true"
            hint="Pick schedule date and time"
            :no-button-now="true"
            :no-header="true"
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
import { postReddit } from "../services/post";
import { isEmpty, isURL } from "validator";

export default {
  name: "Reddit",
  components: {
    VueCtkDateTimePicker
  },
  computed: {
    postType: function() {
      if (this.postlink != "") {
        return "link";
      } else if (this.posttext != "") {
        return "text";
      }
      return "";
    }
  },
  data() {
    return {
      scheduledate: "",
      postlink: "",
      posttext: "",
      subreddits: "",
      title: ""
    };
  },
  methods: {
    //TODO: Validations for each field
    schedulePost() {
      if (this.validate()) {
        var schedulepost = {
          subreddits: this.subreddits,
          title: this.title,
          scheduledate: this.scheduledate,
          provider: "reddit"
        };
        if (this.posttext != "") {
          schedulepost["text"] = this.posttext;
        } else {
          schedulepost["link"] = this.postlink;
        }
        postReddit(schedulepost)
          .then(() => {
            this.$toasted.success("Scheduled Successfully!");
          })
          .catch(e => {
            this.$toasted.error(e);
          });
      } else {
        this.$toasted.error("All fileds are required.");
      }
    },
    validate() {
      if (
        isEmpty(this.subreddits) ||
        isEmpty(this.title) ||
        isEmpty(this.scheduledate) ||
        (isEmpty(this.posttext) && !isURL(this.postlink))
      ) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.reddit {
  .columns {
    margin-bottom: 1rem;
  }
  .subreddits,
  .posttitle,
  .posttype {
    input {
      width: 100%;
    }
    input:disabled {
      background-color: #ebebeb;
      cursor: not-allowed;
    }
  }

  .scheduledate {
    .datepicker {
      width: 70%;
    }
  }
}
</style>