<template>
  <div id="addImage">
    <div id="storedimgs">
      <input
        type="file"
        accept="image/*"
        @change="chooseImage($event)"
        ref="input"
        :style="{ display: 'none' }"
      />
      <img
        class="img-container"
        src="../../assets/addImage.png"
        @click="$refs.input.click()"
      />
      <div
        :id="index"
        class="img-container"
        v-for="(item, index) in getImages"
        :key="index"
        @mouseover="show = index"
        @mouseleave="show = null"
      >
        <img class="add" :src="item.imageURL" />
        <transition-group name="fade">
          <p v-if="show == index" :key="0" class="description">
            {{ item.description }}
          </p>
          <img
            v-if="show == index"
            :key="1"
            class="delete"
            src="../../assets/remove.png"
            @click="deleteImage(item.id, item.imageURL)"
          />
        </transition-group>
      </div>
    </div>
    <div id="cropperview" ref="cv">
      <div v-if="this.imageSrc" class="view">
        <div class="top">
          <div class="buttons">
            <button @click="cropImage">Kırp</button>
            <button @click="save(), ($refs.cv.style.display = 'none')">
              Kaydet
            </button>
            <button @click="$refs.cv.style.display = 'none'">Çıkış</button>
          </div>
          <div class="info">
            <input
              type="text"
              class="form-control"
              placeholder="Resim açıklaması"
              v-model="item.description"
            />
          </div>
        </div>
        <div class="bottom">
          <vue-cropper
            class="cropper"
            ref="cropper"
            :guides="true"
            :src="imageSrc"
            :aspectRatio="16 / 9"
          ></vue-cropper>
          <img v-if="this.croppedImageSrc" :src="croppedImageSrc" />
        </div>
      </div>
    </div>
    <waiting v-if="wait" />
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { mapGetters } from "vuex";
import { eventBus } from "../../main";
import Waiting from "../Waiting";

export default {
  components: {
    VueCropper,
    Waiting,
  },
  data() {
    return {
      imageSrc: null,
      croppedImageSrc: null,
      file: null,
      item: {
        image: null,
        description: null,
      },
      show: null,
      wait: false,
    };
  },

  created() {
    eventBus.$on("SaveImageFinished", () => {
      this.wait = false;
    });
  },

  computed: {
    ...mapGetters(["getImages"]),
  },

  methods: {
    chooseImage(e) {
      window.scrollTo(0, 0);
      document.getElementById("cropperview").style.height =
        document.body.scrollHeight + "px";
      document.getElementById("cropperview").style.display = "flex";
      this.file = e.target.files[0];
      if (!this.file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageSrc = event.target.result;

          // Rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(this.file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },

    cropImage() {
      this.croppedImageSrc = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },

    save() {
      let conf = confirm("Kaydedilsin mi?");
      if (conf) {
        this.wait = true;
        this.resizeImg(this.croppedImageSrc, 800, 450)
          .then((result) => {
            return this.dataURLtoFile(result, this.file.name);
          })
          .then((img) => {
            this.item.image = img;
            this.$store.dispatch("saveimage", this.item);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    resizeImg(image, newWidth, newHeight) {
      return new Promise((resolve, reject) => {
        var canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        let context = canvas.getContext("2d");
        let img = document.createElement("img");
        img.src = image;
        img.onload = function () {
          context.scale(newWidth / img.width, newHeight / img.height);
          context.drawImage(img, 0, 0);
          resolve(canvas.toDataURL());
        };
      });
    },

    deleteImage(id, url) {
      let conf = confirm("Resmi Silinsin Mi?");
      if (conf) {
        let str = String(url);
        let findchar = str.indexOf("?");
        let raw = str.slice(findchar - 6, findchar);
        let ext = raw.slice(raw.indexOf("."));
        this.$store.dispatch("deleteImage", { id, ext });
      }
    },
  },
};
</script>

<style scoped>
.img-container {
  position: relative;
  width: 22vmax;
  height: 12.4vmax;
  object-fit: scale-down;
  float: left;
  margin: 0.5vmax;
  box-shadow: 0vmax 0vmax 1.2vmax -0.1vmax rgba(100, 100, 100, 0.7);
  cursor: pointer;
}
.add {
  height: 100%;
  width: 100%;
}
.description {
  position: absolute;
  top: 60%;
  width: 100%;
  height: 30%;
  background-color: rgba(100, 100, 100, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  font-size: 1.2vmax;
  font-weight: 700;
  color: bisque;
  border-radius: -1vmax 1vmax 0 0;
}
.delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 8%;
  height: auto;
  cursor: pointer;
}

#cropperview {
  box-sizing: border-box;
  display: none;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  min-height: 100%;
  height: fit-content;
  width: 100%;
  z-index: 1;
}

#cropperview::after {
  content: "";
  position: absolute;
  box-sizing: border-box;
  background-color: rgba(100, 100, 100, 0.9);
  width: 100%;
  min-height: 100%;
  height: fit-content;
  top: 0;
  left: 0;
}
.view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: top;
  height: 90%;
  width: 100%;
  box-sizing: border-box;
}
.top {
  box-sizing: border-box;
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin-top: 2vh;
}
.bottom {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  grid-gap: 1vmax;
  align-items: center;
  justify-items: center;
  padding: 0.5vmax;
}
.cropper {
  box-sizing: border;
  width: auto;
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
  box-shadow: 0 0 1vmax -0.2vmax rgb(70, 70, 70);
}
#cropperview img {
  box-sizing: border-box;
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 0 1vmax -0.2vmax rgb(70, 70, 70);
  align-self: center;
}
#cropperview .buttons {
  box-sizing: border-box;
  z-index: 3;
  display: flex;
  top: 0.5vmax;
  right: 0.5vmax;
  margin: 0.5vmax;
  height: 100%;
}
#cropperview .buttons button {
  cursor: pointer;
  height: 85%;
  width: 5vmax;
  border-radius: 0.5vmax;
  border: none;
  box-sizing: border-box;
  margin-inline: 0.25vmax;
  background-color: rgb(0, 180, 200);
  box-shadow: 0 0 0.5vmax 0.1vmax rgb(105, 105, 105);
  font-weight: 600;
  text-align: center;
}
#cropperview .buttons button:hover {
  box-shadow: 0 0 0.5vmax 0.1vmax rgb(105, 135, 125);
}

#cropperview .info {
  box-sizing: border-box;
  z-index: 3;
  display: flex;
  flex-direction: row;
  top: 0.5vmax;
  left: 0.5vmax;
  width: 50%;
  margin: 0.5vmax;
  height: 100%;
}
.form-control {
  box-sizing: border-box;
  outline: none;
  border-radius: 0.5vmax;
  border: 1px solid rgb(199, 199, 199);
  height: 85%;
  width: 100%;
  padding-inline: 1vmax;
}

#cropperview input {
  box-shadow: 0 0 0.5vmax 0.1vmax rgb(105, 105, 105);
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: ease-out 0.3s;
}

.list-leave-to,
.list-enter {
  opacity: 0;
}
.list-leave-active,
.list-enter-active {
  transition: ease-out 0.3s;
}

@media screen and (max-width: 768px) {
  .top {
    margin-top: 1vh;
    height: 10vh;
    flex-direction: column;
    padding-right: 2vmax;
  }
  .bottom {
    box-sizing: border-box;
    align-self: center;
    width: 100%;
    height: 89vh;
    grid-template-columns: 1fr;
    grid-template-rows: 50% 50%;
    padding-inline: 1vmax;
  }
  .cropper {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    justify-self: center;
  }
  #cropperview img {
    max-width: 100%;
    max-height: 95%;
  }
  #cropperview .info {
    width: 90%;
    align-self: center;
  }
  .form-control {
    height: 100%;
  }
  #cropperview .buttons {
    align-self: flex-end;
  }
  #cropperview .buttons button {
    width: 9vmax;
    height: 100%;
    margin-right: 1vmax;
    font-size: 1.7vmax;
  }
}
</style>
