<template>
  <div id="about">
    <div id="top"></div>
    <div class="container">
      <div v-for="(image, index) in getImages" :key="index">
        <img class="item" :src="image.imageURL" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["getImages"]),
  },
};
</script>

<style scoped>
#about {
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

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 2vmax;
  grid-gap: 2vmax;
  padding: 2vmax;
}

.item {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 0.5vmax;
  box-shadow: -0.3vmax -0.3vmax 0.3vmax white,
    0.3vmax 0.3vmax 0.4vmax rgb(189, 188, 188);
  border-left: 1px solid white;
  border-top: 1px solid white;
}

@media screen and (max-width: 768px) {
  #top {
    height: 12vmax;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 2vmax;
    grid-gap: 2vmax;
    padding: 2vmax;
  }
}
</style>
