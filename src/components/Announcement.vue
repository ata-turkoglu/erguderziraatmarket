<template>
  <div id="announcement">
    <p class="head">Duyurular</p>
    <div class="container">
      <div id="item" v-for="(anno, index) in getAnnouncements" :key="index">
        <p id="date">{{ anno.addedDate }}</p>
        <p id="text">{{ anno.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAnnouncements"]),
  },
};
</script>

<style scoped>
#announcement {
  box-sizing: border-box;
  margin: 1vmax;
  height: 28.5vmax;
  width: 35vmax;
  /*background-color: rgb(240, 250, 240);*/
  background-color: rgba(17, 54, 20, 0.8);
  color: white;
  border-radius: 0.5vmax;
  box-shadow: 0 0.5vmax 1vmax -0.1vmax rgb(120, 120, 120);
  box-shadow: 0 0.5vmax 1vmax -0.1vmax black;
  padding: 1vmax;
  overflow: hidden;
  display: grid;
  grid-template-rows: 10% 90%;
}

.container {
  box-sizing: border-box;
  height: 95%;
  margin-top: 1vmax;
  text-align: left;
  font-size: 1vmax;
  font-weight: 400;
  text-decoration-style: dotted;
  text-emphasis-color: black;
  overflow: auto;
  width: 100%;
}

.head {
  font-size: 1.5vmax;
  text-align: left;
  margin: 0;
  color: rgba(226, 134, 69, 1);
  width: 100%;
  border-bottom: 1px solid white;
}

#item {
  box-sizing: border-box;
  width: 95%;
  min-height: 1.8vmax;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  margin: 0.5vmax;
  font-size: 0.9vmax;
}
#date {
  color: rgba(226, 134, 69, 1);
  font-size: inherit;
  margin: 0;
  margin-right: 1vmax;
  align-self: flex-start;
}
#text {
  font-weight: 400;
  font-size: inherit;
  margin: 0;
  align-self: flex-start;
  text-align: left;
}

@media screen and (max-width: 768px) {
  #announcement {
    width: 100%;
    margin-inline: 0;
    grid-template-rows: 15% 85%;
  }

  .head {
    font-size: 3vmax;
  }

  .container {
    font-size: 1.7vmax;
  }

  #item {
    font-size: 1.6vmax;
    margin-bottom: 1.4vmax;
  }
}
</style>
