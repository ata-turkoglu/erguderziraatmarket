<template>
  <div id="images" @mouseleave="slide" @mouseover="stop">
    <div id="left" class="nav-button" style="left: 0">
      <img src="../../assets/left-arrow.png" @click="back" />
    </div>
    <div v-for="(url, index) in images" :key="index">
      <slide :image="{ url, index }"></slide>
    </div>
    <div id="right" class="nav-button" style="right: 0">
      <img src="../../assets/right-arrow.png" @click="forward" />
    </div>
  </div>
</template>

<script>
import Slide from "./Slide";
import { mapGetters } from "vuex";
import { eventBus } from "../../main";
export default {
  components: {
    Slide,
  },

  data() {
    return {
      ready: false,
      image: require("../../assets/bg.jpg"),
      images: [],
      intrvl: null,
      index: 0,
      slideDirection: "slide-right",
    };
  },

  created() {
    if (this.getImages.length > 0) {
      this.getImages.forEach((image) => {
        this.images.push(image.imageURL);
      });

      this.ready = true;
      this.slide();
    } else {
      eventBus.$on("imagesReady", async () => {
        await this.getImages.forEach((image) => {
          this.images.push(image.imageURL);
        });

        this.ready = true;
        this.slide();
      });
    }
  },
  mounted() {
    this.arrows();
  },

  computed: {
    ...mapGetters(["getImages"]),
  },

  methods: {
    slide() {
      if (this.ready) {
        this.intrvl = setInterval(() => {
          this.image = this.images[this.index];

          if (this.image == undefined) {
            this.image = require("../../assets/ezm.jpg");
          }

          if (this.index == this.images.length - 1) {
            this.index = 0;
          } else {
            this.index++;
          }
        }, 10000);
      }
    },

    stop() {
      clearInterval(this.intrvl);
    },

    beforeDestroy() {
      clearInterval(this.intrvl);
    },

    forward() {
      this.index++;

      if (this.index == this.images.length) {
        this.index = 0;
      }

      this.image = this.images[this.index];

      this.slideDirection = "slide-right";
    },

    back() {
      this.index--;

      if (this.index < 0) {
        this.index = this.images.length - 1;
      }

      this.image = this.images[this.index];

      this.slideDirection = "slide-left";
    },

    arrows() {
      let els = document.getElementsByClassName("nav-button");

      els[0].style.opacity = 0;
      els[0].style.display = "flex";
      els[1].style.opacity = 0;
      els[1].style.display = "flex";

      let val1 = 50;
      let val2 = -50;
      let op = 0;

      let els0 = setInterval(() => {
        els[0].style.transform = "translateX(" + val1 + "%)";
        val1 = val1 - 1;
        els[0].style.opacity = op;
        op = op + 0.02;
        if (val1 <= 0) {
          clearInterval(els0);
        }
      }, 20);

      let els1 = setInterval(() => {
        els[1].style.transform = "translateX(" + val2 + "%)";
        val2 = val2 + 1;
        els[1].style.opacity = op;
        op = op + 0.02;
        if (val2 >= 0) {
          clearInterval(els1);
        }
      }, 20);
    },
  },
};
</script>

<style scoped>
#images {
  position: relative;
  padding: 0;
  /*height: 28.5vmax;
  width: 51vmax;*/
  height: 22.3vmax;
  width: 40vmax;
  margin-inline: 1vmax;
  margin-top: 1vmax;
  margin-bottom: 1vmax;
  border-radius: 0.5vmax;
  /*box-shadow:  0 0.5vmax 1vmax -0.1vmax rgb(120, 120, 120);*/
  box-shadow: 0 0.5vmax 1vmax -0.1vmax black;
  overflow: hidden;
  cursor: pointer;
}

.nav-button {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  height: 100%;
  width: 2vmax;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  display: none;

  /*rgba(2,164,88)
    rgba(0,146,63)
    
    rgba(241,128,0)*/
}

.nav-button img {
  height: 3.5vmax;
  width: 2vmax;
  top: 0;
  bottom: 0;
  margin-block: auto;
  -webkit-filter: drop-shadow(0vmax 0vmax 0.6vmax #222);
  filter: drop-shadow(0vmax 0vmax 0.6vmax #222);
}

.nav-button img:hover {
  opacity: 0.5;
  transition-duration: 0.2s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/*.fade-leave-active{
  animation: outAnimation 4s ease-in-out
}
.fade-enter-active{
  animation: inAnimation 4s ease-in-out
}*/

@keyframes outAnimation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes inAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@media screen and (max-width: 768px) {
  #images {
    margin-inline: auto;
    width: 90%;
    /*height: 53vw;*/
    height: 45vw;
  }
}
</style>
