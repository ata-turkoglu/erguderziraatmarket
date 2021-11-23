<template>
  <div id="annos">
    <div id="top"></div>
    <div id="list">
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
#annos {
  width: 100%;
  min-height: 70vh;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgb(240, 250, 240);
  padding-bottom: 4vmax;
}
#top {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 8vmax;
  background-image: linear-gradient(rgba(57, 164, 75, 0.8), rgb(240, 250, 240));
  z-index: -1;
}
#list {
  min-height: 50vh;
  height: fit-content;
  width: 100%;
  margin: 2vmax;
  box-shadow: -0.3vmax -0.3vmax 0.3vmax white,
    0.3vmax 0.3vmax 0.4vmax rgb(189, 188, 188);
  border-radius: 1vmax;
  box-sizing: border-box;
  padding-top: 1vmax;
}
#item {
  box-sizing: border-box;
  width: 95%;
  min-height: 2vmax;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1vmax;
}
#date {
  margin: 0;
  margin-right: 2vmax;
  color: rgba(226, 134, 69, 1);
  font-size: 1.2vmax;
  align-self: flex-start;
}
#text {
  font-weight: 600;
  font-size: 1vmax;
  text-align: left;
  align-self: flex-start;
  margin: 0;
}

@media screen and (max-width: 768px) {
  #top {
    height: 12vmax;
  }
  #list {
    margin-top: 4vmax;
  }
  #item {
    margin-bottom: 1.5vmax;
  }
  #date,
  #text {
    font-size: 1.5vmax;
  }
}
</style>
