<template>
  <div id="dialog">
    <div
      id="view"
      @mouseleave="inside = false"
      @mouseout="inside = false"
      @mouseenter="inside = true"
    >
      <img :src="product.imageURL" alt="" />
      <div id="details">
        <div class="name">{{ product.name }}</div>
        <br />
        <div class="category">{{ product.category }}</div>
        <br />
        <div class="subCategory">{{ product.subCategory }}</div>
        <br />
        <div class="description">
          <p v-for="(item, index) in product.description" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
      <p id="remove" @click="exit">X</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],

  /*props:{
        product:{
                name:null,
                category:null,
                subCategory:null,
                brand:null,
                description:null
            }
    },*/

  data() {
    return {
      inside: false,
      product: this.item,
      scroll: null,
    };
  },

  created() {
    window.addEventListener("scroll", this.noscroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.noscroll);
  },

  methods: {
    exit() {
      this.$parent.dialog = false;
    },

    close() {
      if (this.inside == false) {
        this.$parent.dialog = false;
      }
    },

    noscroll() {
      window.scrollTo(0, this.scroll);
    },
  },

  mounted() {
    this.inside = false;
    document.addEventListener("mousedown", this.close);
    this.scroll = window.scrollY;
    //let elem = document.getElementById("details").clientHeight
  },

  destroyed() {
    document.removeEventListener("mousedown", this.close);
  },
};
</script>

<style scoped>
#dialog {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  min-height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: fixed;
}

#dialog::after {
  content: "";
  top: 0;
  left: 0;
  position: absolute;
  height: inherit;
  width: 100%;
  backdrop-filter: blur(1.5px);
  background-color: rgba(80, 80, 80, 0.5);
}

#view {
  position: relative;
  display: flex;
  flex-direction: row;
  z-index: 4;
  max-height: 90%;
  height: fit-content;
  width: 70%;
  background-color: white;
  border-radius: 0.5vmax;
  box-shadow: 0vmax 1vmax 1vmax -0.1vmax rgba(80, 80, 80, 1);
}

img {
  left: 0;
  height: auto;
  width: auto;
  border-radius: 0.5vmax 0vmax 0vmax 0.5vmax;
}

#remove {
  position: absolute;
  z-index: 3;
  transform: rotateY(180deg);
  top: 0;
  right: 0;
  margin-top: 0.2vmax;
  height: 5%;
  width: auto;
  padding-inline: 0.5vmax;
  font-size: 1.8vmax;
  color: rgb(211, 0, 0);
  cursor: pointer;
  font-weight: 700;
}

#details {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  top: 0;
  padding: 2vmax;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
}

.name {
  font-size: 3vmax;
}
.category {
  font-size: 1.3vmax;
}
.subCategory {
  font-size: 1.3vmax;
}
.description {
  text-align: left;
  font-size: 1vmax;
  font-weight: 400;
}

@media screen and (max-width: 768px) {
  #dialog {
    min-height: max-content;
  }

  #view {
    height: fit-content;
    flex-direction: column;
    align-self: center;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 0.5vmax 0.5vmax 0 0;
  }

  .name {
    font-size: 3vmax;
  }
  .category {
    font-size: 2vmax;
  }
  .subCategory {
    font-size: 2vmax;
  }
  .description {
    font-size: 2vmax;
    text-align: left;
  }
}
</style>
