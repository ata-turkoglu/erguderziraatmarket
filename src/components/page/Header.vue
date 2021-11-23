<template>
  <div id="top" class="top" ref="header">
    <div id="logo">
      <img src="../../assets/ezmlogo.png" @click="toHome" />
    </div>
    <div id="head">
      <div id="header">
        <div class="links">
          <div class="s_link menu" @click="menuChange()">
            <img src="../../assets/menu.png" />
          </div>
          <div :style="{ display: 'flex', margin: '2vmax' }">
            <div class="s_link" @click="link('facebook')">
              <img src="../../assets/facebook.png" />
              <p>Ergüder Ziraat Market</p>
            </div>
            <div class="s_link" @click="link('instagram')">
              <img src="../../assets/instagram.png" />
              <p>erguderziraatmarket</p>
            </div>
            <div class="s_link" @click="link('twitter')">
              <img src="../../assets/twitter.png" />
              <p>Twitter</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show="menu" id="navigation">
        <router-link
          tag="p"
          to="/"
          class="nav-item"
          @click.native="menuClose(), (isaActive = 0)"
          exact-active-class="nav_item_active"
        >
          Anasayfa
        </router-link>

        <router-link
          tag="p"
          :to="{ name: 'ProductList', params: { category: 'gubre' } }"
          class="nav-item"
          @click.native="menuClose(), (isActive = 1)"
          exact-active-class="nav_item_active"
        >
          Ürünler
        </router-link>

        <router-link
          tag="p"
          to="/about"
          class="nav-item"
          @click.native="menuClose(), (isActive = 2)"
          exact-active-class="nav_item_active"
        >
          Hakkımızda
        </router-link>

        <router-link
          tag="p"
          to="/dealership"
          class="nav-item"
          @click.native="menuClose(), (isActive = 3)"
          exact-active-class="nav_item_active"
        >
          Bayilikler
        </router-link>

        <router-link
          tag="p"
          to="/announcements"
          class="nav-item"
          @click.native="menuClose(), (isActive = 4)"
          exact-active-class="nav_item_active"
        >
          Duyurular
        </router-link>

        <router-link
          tag="p"
          to="/contact"
          class="nav-item"
          @click.native="menuClose(), (isActive = 5)"
          exact-active-class="nav_item_active"
        >
          İletişim
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: null,
      menu: true,
      blogo: false,
    };
  },

  watch: {
    $route() {
      if (window.innerWidth < 768 && this.$route.name == "Home") {
        document.getElementById("logo").style.width = "17vmax";
        document.getElementById("logo").style.animation = "scal linear .5s";
        this.blogo = true;
        setTimeout(() => {
          document.getElementById("logo").style.animation = null;
        }, 500);
      } else if (window.innerWidth < 768 && this.$route.name != "Home") {
        document.getElementById("logo").style.width = "12vmax";
        if (this.blogo) {
          document.getElementById("logo").style.animation =
            "scal linear .5s reverse";
          this.blogo = false;
        }
        setTimeout(() => {
          document.getElementById("logo").style.animation = null;
        }, 500);
      } else {
        if (window.innerWidth < 768) {
          document.getElementById("logo").style.width = "12vmax";
        } else {
          document.getElementById("logo").style.width = "7vmax";
        }
      }
    },
  },

  created() {
    if (window.innerWidth < 768) {
      this.menu = false;
    } else {
      this.menu = true;
    }
    window.addEventListener("resize", this.resize);
  },

  mounted() {
    if (window.innerWidth < 768 && this.$route.name == "Home") {
      document.getElementById("logo").style.width = "17vmax";
    }
  },

  /*mounted(){
    if(window.innerWidth<768 && this.$route.name=="Home"){
      document.getElementById("logo").style.width="16vmax"
    }else{
      document.getElementById("logo").style.width="12vmax"
    }
  },*/

  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },

  methods: {
    resize() {
      if (window.innerWidth < 768) {
        this.menu = false;
        document.getElementById("logo").style.width = "12vmax";
      } else {
        this.menu = true;
        document.getElementById("logo").style.width = "7vmax";
      }
    },

    link(url) {
      switch (url) {
        case (url = "facebook"):
          window.open(
            "https://www.facebook.com/groups/erguderziraatmarket",
            "_blank"
          );
          break;

        case (url = "instagram"):
          window.open(
            "https://www.instagram.com/erguderziraatmarket",
            "_blank"
          );
          break;
      }
    },

    toHome() {
      this.$router.push({ path: "/" });
    },

    menuClose() {
      if (window.innerWidth < 768) {
        let nav = document.getElementById("navigation");
        nav.style.animationName = "hide";
        nav.style.animationDuration = ".5s";
        setTimeout(() => {
          this.menu = false;
        }, 500);
      }
    },

    menuChange() {
      let nav = document.getElementById("navigation");
      if (this.menu) {
        nav.style.animationName = "hide";
        nav.style.animationDuration = ".5s";
        setTimeout(() => {
          this.menu = false;
        }, 500);
      } else {
        nav.style.animationName = "show";
        nav.style.animationDuration = ".5s";
        this.menu = true;
      }
    },
  },
};
</script>

<style>
.top {
  height: 8vmax;
  width: 100%;
  display: flex;
  flex-direction: row;
  /*background-image: linear-gradient(rgba(57, 164, 75, .8), rgba(226, 134, 69, .7));*/
  /*background-image: linear-gradient(rgba(57, 164, 75, .8), rgb(240, 250, 240));*/
  color: black;
  /*box-shadow: 0 1vmax 0.5vmax -0.7vmax rgb(120, 120, 120);*/
}

.bgi {
  background-image: linear-gradient(rgba(57, 164, 75, 0.8), rgb(240, 250, 240));
}

#head {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#header {
  position: relative;
  margin: 0;
  padding: 0;
  height: 60%;
  width: 100%;
  /*background: rgb(57, 164, 75);*/
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

#logo {
  box-sizing: border-box;
  height: 7vmax;
  width: 7vmax;
  margin-left: 0.5vmax;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  padding-top: 0.5vmax;
}

#logo img {
  object-fit: contain;
  height: 100%;
  width: 100%;
  box-shadow: 0.2vmax 0.5vmax 0.5vmax -0.3vmax rgb(0, 0, 0);
  border-radius: 50% 50%;
  background-color: rgba(0, 0, 0, 0);
}

#search {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50%;
  width: 40%;
  border-radius: 0.7vmax;
  box-shadow: 0vmax 0vmax 1vmax -0.3vmax;
}

#search-bar {
  width: 100%;
  border-radius: 0.7vmax 0 0 0.7vmax;
  border: none;
  height: 100%;
  box-sizing: border-box;
  padding-inline: 1vmax;
  font-size: 1vmax;
}

#search-bar:focus {
  outline: none;
}

#search button {
  box-sizing: border-box;
  padding-inline: 0.5vmax;
  background-color: rgb(199, 199, 199);
  height: 100%;
  width: fit-content;
  padding-inline: 1vmax;
  border-radius: 0 0.7vmax 0.7vmax 0;
  padding-block: auto;
  top: 0;
  bottom: 0;
  border: none;
  cursor: pointer;
  font-size: 1vmax;
}

.links {
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.s_link {
  height: 1.5vmax;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8vmax;
  cursor: pointer;
  margin-inline: 0.8vmax;
}

.s_link p {
  top: 0;
  bottom: 0;
  margin-block: auto;
}

.s_link img {
  height: 100%;
  width: auto;
  padding-right: 0.4vmax;
}

#navigation {
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: 1vmax;
}

.nav-item {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: ease 0.6s;
  margin-right: 1.5vmax;
  transform: skewX(-10deg);
  /*box-shadow: 0.2vmax 0.5vmax .5vmax -0.3vmax rgb(120, 120, 120);*/
  box-shadow: 0.2vmax 0.5vmax 0.5vmax -0.3vmax rgb(0, 0, 0);
  background-color: #ffa05215;
}

.nav-item:hover {
  transform: translateY(0.25vmax);
  background-color: rgb(57, 164, 75);
  border-radius: 0.2vmax;
  /*box-shadow: 0 1vmax 0.7vmax -0.7vmax rgb(120, 120, 120);*/
  box-shadow: 0 1vmax 0.7vmax -0.7vmax black;
  transform: skewX(-10deg);
}

.nav_item_active {
  transform: translateY(0.25vmax);
  background-color: rgba(57, 164, 75, 0.8);
  border-radius: 0.2vmax;
  /*box-shadow: 0.2vmax 0.5vmax .5vmax -0.3vmax rgb(120, 120, 120);*/
  box-shadow: 0.2vmax 0.5vmax 0.5vmax -0.3vmax black;
  transform: skewX(-10deg);
}

.menu {
  display: none;
  flex-direction: row;
  width: fit-content;
}

.fade-enter {
  opacity: 0;
  transform: translateY(5vmax);
}
.fade-enter-active {
  transition: all 1s;
}

@media screen and (max-width: 768px) {
  #top {
    height: 12vmax;
  }
  #header {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-evenly;
    height: 70%;
  }
  #logo {
    width: 12vmax;
    height: auto;
    position: absolute;
    left: 0;
    right: 0;
    margin-inline: auto;
    margin-top: 0.5vmax;
  }
  #search {
    height: 45%;
    width: 80%;
  }
  #search-bar {
    font-size: 1.55vmax;
  }
  #search button {
    font-size: 1.55vmax;
  }
  .links {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .s_link {
    height: 2.5vmax;
  }
  .s_link p {
    display: none;
  }

  #head {
    position: relative;
  }

  #navigation {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100vh;
    max-height: 100vh;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    z-index: 3;
    /*animation: hide ease .5s;*/
  }

  #navigation::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgb(240, 250, 240);
    opacity: 0.8;
    backdrop-filter: blur(5px);
  }

  .nav-item {
    width: 45%;
    height: 7%;
    background-color: rgb(180, 230, 180);
    font-size: 2vmax;
  }

  .menu {
    display: flex;
    margin: 2vmax;
    margin-left: 3vmax;
    z-index: 4;
  }
}

@keyframes hide {
  from {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 1;
  }
  to {
    top: 10%;
    left: 10%;
    height: 0;
    width: 0;
    opacity: 0;
  }
}
@keyframes show {
  from {
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    opacity: 0;
  }
  to {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 1;
  }
}

@keyframes scal {
  from {
    width: 12vmax;
  }
  to {
    width: 17vmax;
  }
}
</style>
