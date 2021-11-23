<template>
  <div id="home">
    <div id="first">
      <p class="info">Kaliteyi güvenle size getiriyoruz</p>
      <Images />
    </div>

    <div id="second">
      <p class="info2">Geniş ürün yelpazesi ile hizmetinizdeyiz</p>
      <router-link tag="button" id="toproducts" to="/productlist">
        İncele
      </router-link>
    </div>

    <div id="anno">
      <Announcement />
    </div>

    <div id="third">
      <p class="head">Yeni Gelen Ürünler</p>
      <hr style="align: left; margin-bottom: 2vmax" />
      <div class="list">
        <div class="product" v-for="(item, index) in newProducts" :key="index">
          <p class="name">{{ item.name }}</p>
          <p class="sub">{{ item.subCategory }}</p>
          <img
            class="pimg"
            :src="item.imageURL"
            @click="show(item.id), (dialog = true)"
          />
        </div>
      </div>
    </div>

    <div id="fourth">
      <p class="info3">Sektörün Öncü Markaları ile Çalışmaktayız</p>
      <router-link
        tag="button"
        id="toproducts"
        class="toabout"
        to="/dealership"
      >
        Listele
      </router-link>
      <img class="fourth-bg" src="../assets/fourth-bg.jpg" />
    </div>

    <div id="bg">
      <div :style="{ position: 'relative', width: '100%', height: '100%' }">
        <div class="filter"></div>
        <img id="img" src="../assets/home.jpg" />
      </div>
    </div>

    <transition name="fade">
      <detail-dialog :item="product" v-if="dialog" />
    </transition>
  </div>
</template>

<script>
import Images from "../components/carousel/Images";
import Announcement from "../components/Announcement";
import DetailDialog from "../components/DetailDialog";
import { mapGetters } from "vuex";
import { eventBus } from "../main";

export default {
  components: {
    Images,
    Announcement,
    DetailDialog,
  },

  data() {
    return {
      newProducts: [],
      product: [],
      dialog: false,
      scroll: null,
    };
  },

  mounted() {
    if (this.getNewProducts.length <= 0) {
      eventBus.$on("productsReady", () => {
        this.newProducts = this.getNewProducts;
      });
    } else {
      this.newProducts = this.getNewProducts;
    }
  },

  computed: {
    ...mapGetters(["getNewProducts"]),
  },

  methods: {
    show(id) {
      this.product = this.getNewProducts.find((product) => product.id == id);
      this.scroll = window.scrollY;
      window.scrollTo(0, this.scroll);
    },
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  margin-top: 4vmax;
  margin-inline: 0.5vmax;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#bg {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  z-index: -1;
  margin: 0;
  padding: 0;
}

#bg img {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  animation: move linear 40s alternate infinite;
  object-fit: cover;
}

.filter {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-color: rgb(121, 121, 121);
  opacity: 0.3;
}

#first {
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2vmax;
}

#anno {
  position: absolute;
  top: 40vmax;
  left: 1%;
}

#second {
  height: fit-content;
  width: 60%;
  align-self: flex-end;
  margin-top: 2vmax;
}

#third {
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  padding-top: 1vmax;
  padding-inline: 1vmax;
  display: flex;
  flex-direction: row;
  flex-direction: column;
  margin-block: 5vmax;
  background: rgb(240, 250, 240);
}

.head {
  align-self: flex-start;
  font-weight: 700;
  font-size: 2.5vmax;
  color: rgba(17, 54, 20, 0.8);
}

.info {
  font-weight: 700;
  font-size: 4vmax;
  color: bisque;
  align-self: flex-start;
  margin-top: 4vmax;
  margin-bottom: 3.5vmax;
  margin-left: 2vmax;
  text-shadow: 0vmax 0.2vmax rgb(50, 50, 50);
}

.info2 {
  font-weight: 700;
  font-size: 4vmax;
  color: rgba(17, 54, 20, 0.8);
  align-self: flex-start;
  margin-top: 4vmax;
  margin-left: 2vmax;
  text-shadow: 0 0.1vmax 0.3vmax rgb(208, 207, 207);
}

.info3 {
  font-weight: 700;
  font-size: 4vmax;
  color: rgba(17, 54, 20, 0.8);
  align-self: flex-start;
  margin-top: 1vmax;
  margin-left: 2vmax;
  text-shadow: 0 0.1vmax 0.3vmax rgb(208, 207, 207);
}

#toproducts {
  box-sizing: border-box;
  background-color: rgba(226, 134, 69, 1);
  height: fit-content;
  width: fit-content;
  padding-block: 1vmax;
  padding-inline: 2vmax;
  border: none;
  border-radius: 1vmax;
  font-size: 1.7vmax;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0.5vmax 1vmax -0.2vmax grey;
}

#toproducts:hover {
  box-shadow: 0 0;
}

.toabout {
  margin-top: 8vmax;
}

hr {
  width: 50%;
  margin: 0;
  color: black;
}

.list {
  width: 100%;
  height: 100%;
  margin-block: 2vmax;
  padding: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  flex-wrap: wrap;
}

.name {
  font-size: 1vmax;
}

.sub {
  font-weight: 400;
  font-size: 0.8vmax;
}

.product {
  box-sizing: border-box;
  margin-right: 3vmax;
  padding: 0;
  cursor: pointer;
  border-radius: 1vmax;
}

.pimg {
  box-sizing: border-box;
  height: 13vmax;
  width: 13vmax;
  object-fit: cover;
  border-radius: 1vmax;
  box-shadow: 0 -0.3vmax 0.4vmax white, 0vmax 0.3vmax 0.4vmax rgb(189, 188, 188);
}

#fourth {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60vh;
  margin-bottom: 11vh;
  overflow: hidden;
}
.fourth-bg {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: top;
  z-index: -1;
  filter: brightness(85%);
  animation: move2 linear 60s alternate infinite;
}

.fade-enter-active {
  animation: moe 0.5s linear;
}
.fade-leave-active {
  animation: moe 0.5s reverse;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

@keyframes moe {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@media screen and (max-width: 768px) {
  #home {
    flex-direction: column;
  }

  #bg {
    width: 100%;
    height: 100vmax;
    overflow: hidden;
  }

  #bg img {
    height: 100vmax;
    object-fit: cover;
  }

  #first {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 88vh;
  }

  #second {
    align-self: center;
    width: 100%;
    margin-bottom: 2vmax;
  }

  .info {
    font-size: 5vmax;
    margin-bottom: 18vmax;
  }

  .info2 {
    font-size: 5vmax;
  }

  .head {
    font-size: 3vmax;
  }

  #third {
    margin-top: 1vmax;
    margin-inline: 0;
    height: auto;
  }

  .list {
    height: auto;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .name {
    font-size: 1.7vmax;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 17vmax;
  }

  .sub {
    font-size: 1.5vmax;
    width: 17vmax;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .product {
    margin-bottom: 4vmax;
  }

  #anno {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    margin-block: 3vmax;
    padding-block: 0;
    padding-inline: 1.5vmax;
  }

  #toproducts {
    font-size: 2.5vmax;
  }

  .toabout {
    margin-top: 3vmax;
  }

  .pimg {
    height: 17vmax;
    width: 17vmax;
  }

  #fourth {
    height: 35vh;
    margin-bottom: 5vh;
  }
}

@keyframes move {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(2);
  }
}

@keyframes move2 {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.5);
  }
}
</style>
