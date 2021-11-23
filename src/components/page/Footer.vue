<template>
  <div id="footer" class="footer">
    <div class="links">
      <div class="part">
        <div>
          <p class="header">Hızlı Erişim</p>
          <hr />
        </div>
        <div class="container">
          <router-link tag="div" to="/" class="item">
            <p>Anasayfa</p>
          </router-link>

          <router-link tag="div" to="/productlist" class="item">
            <p>Ürünler</p>
          </router-link>

          <router-link tag="div" to="/about" class="item">
            <p>Hakkımızda</p>
          </router-link>

          <router-link tag="div" to="/dealership" class="item">
            <p>Bayilikler</p>
          </router-link>

          <router-link tag="div" to="/about" class="item">
            <p>Belgeler</p>
          </router-link>

          <router-link tag="div" to="/contact" class="item">
            <p>İletişim</p>
          </router-link>
        </div>
      </div>

      <div class="part">
        <div style="width: fit-content">
          <p class="header">Sosyal Medya</p>
          <hr />
        </div>

        <div class="container">
          <div class="item" @click="link('facebook')">
            <img class="sm" src="../../assets/facebook.png" />
            <p>Ergüder Ziraat Market</p>
          </div>
          <div class="item" @click="link('instagram')">
            <img class="sm" src="../../assets/instagram.png" />
            <p>erguderziraatmarket</p>
          </div>
          <div class="item" @click="link('twitter')">
            <img class="sm" src="../../assets/twitter.png" />
            <p>Twitter</p>
          </div>
        </div>
      </div>

      <div class="part">
        <div style="width: fit-content">
          <p class="header">İletişim</p>
          <hr />
        </div>
        <div class="item">
          <p>
            Namık Kemal Mah. Tıkır Sok. 5/B Köprübaşı, Manisa
            <br />
            Tel: 0236 571 30 03
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*mounted(){
        let footer = document.getElementById("footer")
        let size = window.getComputedStyle(footer).getPropertyValue("height")
        if(document.body.scrollHeight>window.outterHeight){
            footer.style.position = "absolute"
            footer.style.top = (document.body.scrollHeight - size) + "px"
        }else{
            footer.style.position="absolute"
            footer.style.top = (window.innerHeight-size) + "px"
        }

        window.addEventListener("")
    }*/

  methods: {
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
  },
};
</script>

<style scoped>
.footer {
  top: 100vh;
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  background-color: rgba(17, 54, 20, 0.8);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding-inline: 1vmax;
}

.links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  flex-wrap: wrap;
  width: 100%;
}

.header {
  color: white;
  font-size: 1vmax;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: row;
}

.part {
  margin: 1vmax;
  margin-bottom: 2.5vmax;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.logo {
  height: 15vmax;
  width: auto;
  align-self: center;
  justify-self: center;
}

.sm {
  height: 1vmax;
  width: auto;
  margin-block: 0.5vmax;
  margin-right: 0.5vmax;
}

.item {
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 2vmax;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin: 0;
  padding: 0;
  margin-right: 1.2vmax;
  border-right: 1px solid white;
  padding-right: 1.2vmax;
}

.item:last-of-type {
  border-right: none;
}

.item p {
  font-size: 0.8vmax;
  color: white;
  margin: 0;
}

hr {
  width: 100%;
  margin: 0;
  padding: 0;
  margin-top: 0.5vmax;
  margin-bottom: 1vmax;
}

@media screen and (max-width: 768px) {
  .header {
    font-size: 1.5vmax;
  }

  .item p {
    font-size: 1.2vmax;
  }

  .sm {
    height: 2vmax;
  }

  .footer {
    height: 30vh;
  }

  .links {
    flex-direction: column;
  }
}
</style>
