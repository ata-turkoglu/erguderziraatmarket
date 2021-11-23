<template>
  <div id="dealership">
    <div id="top"></div>
    <div class="container">
      <img
        v-for="(item, index) in getDealers"
        :key="index"
        :src="item.imageURL"
        alt="aaa"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      images: [],
    };
  },

  computed: {
    ...mapGetters(["getDealers"]),
  },
};
</script>

<style scoped>
#dealership {
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 3vmax;
  padding: 1vmax;
  justify-content: space-around;
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 2vmax;
  border-radius: 50%;
  box-shadow: 0 0.5vmax 1vmax -0.2vmax rgb(100, 130, 100);
}

@media screen and (max-width: 768px) {
  #top {
    height: 12vmax;
  }
}
</style>
