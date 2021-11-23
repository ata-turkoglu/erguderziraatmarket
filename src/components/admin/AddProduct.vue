<template>
  <div id="addProduct">
    <div id="form-container">
      <form id="form" @submit.prevent>
        <div class="form-group">
          <label class="text-left" for="category">İsim</label>
          <input
            type="text"
            class="form-control"
            id="category"
            v-model="$v.product.name.$model"
          />
        </div>

        <div class="form-group">
          <div class="itemhead">
            <label class="text-left" for="category">Kategori</label>
            <div class="headbtns">
              <p class="headinfo">Seçilen Kategoriyi :</p>
              <button class="headbtn" @click="deleteFilter('category')">
                Sil
              </button>
            </div>
          </div>
          <select
            class="form-control"
            @change="onCatChange()"
            v-model="$v.product.category.$model"
          >
            <option value="" selected disabled>Kategori Seçin</option>
            <option
              v-for="(cat, index) in getFilters.categories"
              :key="index"
              :value="cat.title"
            >
              {{ cat.title }}
            </option>
          </select>
          <div class="input-group">
            <input
              type="text"
              class="form-input"
              id="category"
              v-model="addN.category"
              placeholder="Yeni Kategori Ekle"
            />
            <button class="input-button" @click="addNew(1)">Ekle</button>
          </div>
        </div>

        <div class="form-group">
          <div class="itemhead">
            <label class="text-left" for="category">Alt Kategori</label>
            <div class="headbtns">
              <p class="headinfo">Seçilen Alt Kategoriyi :</p>
              <button class="headbtn" @click="deleteFilter('subCategory')">
                Sil
              </button>
            </div>
          </div>
          <select class="form-control" v-model="$v.product.subCategory.$model">
            <option value="" selected disabled>Alt Kategori Seçin</option>
            <option
              v-for="(subCat, index) in subCategories"
              :key="index"
              :value="subCat"
            >
              {{ subCat }}
            </option>
          </select>
          <div class="input-group">
            <input
              type="text"
              class="form-input"
              id="category"
              v-model="addN.subCategory"
              placeholder="Yeni Alt Kategori Ekle"
            />
            <button class="input-button" @click="addNew(2)">Ekle</button>
          </div>
        </div>

        <div class="form-group">
          <div class="itemhead">
            <label class="text-left" for="category">Marka</label>
            <div class="headbtns">
              <p class="headinfo">Seçilen Markayı :</p>
              <button class="headbtn" @click="deleteFilter('brand')">
                Sil
              </button>
            </div>
          </div>
          <select class="form-control" v-model="$v.product.brand.$model">
            <option value="" selected disabled>Marka Seçin</option>
            <option v-for="(brand, index) in brands" :key="index">
              {{ brand }}
            </option>
          </select>
          <div class="input-group">
            <input
              type="text"
              class="form-input"
              id="category"
              v-model="addN.brand"
              placeholder="Yeni Marka Ekle"
            />
            <button class="input-button" @click="addNew(3)">Ekle</button>
          </div>
        </div>

        <div class="form-group">
          <label class="text-left" for="description">Açıklama</label>
          <textarea
            type="text"
            :onkeyup="autoGrow()"
            id="description"
            v-model="$v.des.$model"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="text-left" for="description">Resim</label>
          <input
            type="file"
            accept="image/*"
            ref="inputImage"
            class="form-control"
            @change="chooseImage($event)"
            :style="{ display: 'none' }"
          />
          <button id="inputButton" @click="$refs.inputImage.click()">
            Ekle
          </button>
        </div>

        <div>
          <img
            v-if="product.image"
            :src="croppedImageSrc"
            class="productImage"
          />
        </div>

        <div class="button-group">
          <button
            id="save"
            type="button"
            @click="save($event)"
            class="btn"
            :disabled="$v.$invalid"
          >
            Kaydet
            <p class="warn" v-if="$v.$invalid">Boş alanları doldurun</p>
          </button>
          <button id="reset" type="reset" @click="reset" class="btn">
            Temizle - Yeni Ürün
          </button>
        </div>

        <p v-if="update" id="productid">Ürün : {{ updateid }}</p>
      </form>
    </div>

    <div id="list">
      <h2 style="margin-bottom: 2vmax">Ürünler</h2>
      <ul>
        <li
          class="cat"
          v-for="(item, index) in getFilters.categories"
          :key="index"
        >
          <p @click.self="openlist(item, index)">> {{ item.title }}</p>
          <ul v-if="drop == index">
            <li
              class="listedbrands"
              v-for="(brand, ind) in dropbrands"
              :key="ind"
            >
              <p @click.self="openbrand(brand, ind)">- {{ brand }}</p>
              <ul v-if="drop2 == ind">
                <li
                  class="listedproduct"
                  v-for="(product, idx) in droplist2"
                  :key="idx"
                  style="text-decoration: none"
                >
                  <div class="set">
                    <div class="edit">
                      <img
                        src="../../assets/edit.png"
                        @click="setProduct(product.id)"
                        title="Düzenle"
                      />
                    </div>
                    <div class="delete">
                      <img
                        src="../../assets/delete.png"
                        @click="deleteProduct(product.id, product.imageURL)"
                        title="Sil"
                      />
                    </div>
                  </div>
                  <div class="info">
                    <p>
                      <strong>{{ product.name }}</strong>
                    </p>
                    <p style="align-self: center">{{ product.subCategory }}</p>
                  </div>
                  <img :src="product.imageURL" />
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div id="cropperview" ref="cv">
      <div v-if="this.imageSrc" class="view">
        <div class="top">
          <div class="buttons">
            <button @click="cropImage">Kırp</button>
            <button
              @click="SetProductImage(), ($refs.cv.style.display = 'none')"
            >
              Kaydet
            </button>
            <button @click="$refs.cv.style.display = 'none'">Çıkış</button>
          </div>
        </div>
        <div class="bottom">
          <vue-cropper
            class="cropper"
            ref="cropper"
            :guides="true"
            :src="imageSrc"
            :aspectRatio="1 / 1"
            :outputSize="1"
            :fixedBox="true"
            :maxImgSize="800"
          ></vue-cropper>
          <img v-if="croppedImageSrc" :src="croppedImageSrc" />
        </div>
      </div>
    </div>

    <waiting v-if="wait" />
  </div>
</template>

<script>
import { db } from "../../../firebase.js";
import firebase from "firebase";
import VueCropper from "vue-cropperjs";
//import 'cropperjs/dist/cropper.css';
import { eventBus } from "../../main";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import Waiting from "../Waiting";

export default {
  components: {
    VueCropper,
    Waiting,
  },

  validations: {
    product: {
      name: {
        required,
      },
      category: {
        required,
      },
      subCategory: {
        required,
      },
      brand: {
        required,
      },
      image: {
        required,
      },
    },
    des: {
      required,
    },
  },

  data() {
    return {
      imageSrc: null,
      croppedImageSrc: null,
      file: null,
      product: {
        name: null,
        category: null,
        subCategory: null,
        brand: null,
        description: [],
        image: null,
      },
      addN: {
        category: null,
        subCategory: null,
        brand: null,
      },
      des: null,
      categories: [],
      subCategories: [],
      brands: [],
      wait: false,
      drop: null,
      drop2: null,
      droplist: [],
      droplist2: [],
      dropbrands: null,
      update: false,
      updateid: null,
      updateimg: false,
    };
  },

  watch: {
    croppedImageSrc() {
      window.addEventListener("resize", () => {
        document.getElementById("cropperview").style.height =
          document.body.scrollHeight + "px";
      });
    },

    update(val) {
      if (val) {
        document.getElementById("save").innerHTML = "Güncelle";
      } else {
        document.getElementById("save").innerHTML = "Kaydet";
      }
    },
  },

  created() {
    eventBus.$on("SaveProductFinished", () => {
      document.getElementById("save").style.disabled = false;
      this.wait = false;
    });
    eventBus.$on("UpdateProductFinished", () => {
      document.getElementById("save").style.disabled = false;
      this.wait = false;
      this.reset();
      this.$router.go();
    });
    eventBus.$on("productDeleted", () => {
      this.drop2 = null;
    });
  },

  mounted() {
    this.$store.commit("setCatFilter", null);
    this.$store.commit("setSubFilter", null);

    this.droplist = this.getProducts;

    this.$store.dispatch("getProducts");
    setTimeout(() => {
      this.$store.dispatch("getFilters");
      this.categories = this.$store.getters.getFilters.categories;
      this.brands = this.$store.getters.getFilters.brands;
    }, 1500);
  },

  computed: {
    ...mapGetters(["getFilters", "getProducts"]),
  },

  methods: {
    chooseImage(e) {
      window.scrollTo(0, 0);
      document.getElementById("cropperview").style.display = "flex";
      document.getElementById("cropperview").style.height =
        document.body.scrollHeight + "px";
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
      document.getElementById("cropperview").style.height =
        document.body.scrollHeight + "px";
    },

    async SetProductImage() {
      this.resizeImg(this.croppedImageSrc, 500, 500)
        .then((result) => {
          return this.dataURLtoFile(result, this.file.name);
        })
        .then((img) => {
          this.product.image = img;
          document.getElementById("inputButton").innerHTML = "Değiştir";
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.update) {
        this.updateimg = true;
      } else {
        this.updateimg = false;
      }
      //this.product.image = this.dataURLtoFile(img,this.file.name)
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

    resizeImg(base64, newWidth, newHeight) {
      return new Promise((resolve, reject) => {
        var canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        let context = canvas.getContext("2d");
        let img = document.createElement("img");
        img.src = base64;
        img.onload = function () {
          context.scale(newWidth / img.width, newHeight / img.height);
          context.drawImage(img, 0, 0);
          resolve(canvas.toDataURL());
          reject((e) => {
            console.log(e);
          });
        };
      });
    },

    save() {
      let lines = this.des.split("\n");
      this.product.description = lines;
      if (this.update) {
        let conf = confirm("Ürün Güncellensin mi?");
        if (conf) {
          this.wait = true;
          this.$store.dispatch("updateProduct", [
            this.product,
            this.updateid,
            this.updateimg,
          ]);
        }
      } else {
        let conf = confirm("Kaydedilsin mi?");
        if (conf) {
          this.wait = true;
          this.$store.dispatch("saveProduct", this.product);
        }
      }
    },

    onCatChange() {
      let list = this.categories.filter((e) => {
        return e.title == this.product.category;
      });
      this.subCategories = list[0].sub;
    },

    reset() {
      this.product = {
        name: null,
        category: null,
        subCategory: null,
        brand: null,
        description: null,
        image: null,
      };
      this.update = false;
    },

    addNew(value) {
      switch (value) {
        case 1:
          if (this.addN.category != null) {
            let key = this.addN.category;
            db.collection("filters")
              .doc("categories")
              .update({ [key]: [] })
              .then(() => {
                let obj = new Object({
                  title: key,
                  sub: [],
                });
                this.$store.commit("addCategory", obj);
                this.categories.push(obj); //add to store filters
                alert("Eklendi");
              })
              .catch((error) => {
                alert("Bir hata oldu");
                console.log(error);
              });
          } else {
            alert("Boş alan var");
          }
          break;
        case 2:
          if (
            (this.addN.subCategory != null) &
            (this.product.category != null)
          ) {
            let key = this.product.category;
            let val = this.addN.subCategory;
            db.collection("filters")
              .doc("categories")
              .update({
                [key]: firebase.firestore.FieldValue.arrayUnion(val),
              })
              .then(() => {
                this.$store.commit("addSubCategory", { key, val });
                this.subCategories.push(val); //add to store filters
                alert("Eklendi");
              })
              .catch(() => {
                alert("Bir hata oldu");
              });
          } else {
            alert("Kategori Alanını Doldurun");
          }
          break;
        case 3:
          if (this.addN.brand != null) {
            let key = "name";
            let val = this.addN.brand;
            db.collection("filters")
              .doc("brands")
              .update({
                [key]: firebase.firestore.FieldValue.arrayUnion(val),
              })
              .then(() => {
                this.brands.push(val);
                alert("Eklendi");
              })
              .catch((error) => {
                alert(error);
              });
          } else {
            alert("Boş alan var");
          }
          break;
      }
    },

    openlist(item, index) {
      if (index == this.drop) {
        this.drop = null;
      } else {
        this.drop = index;
        this.drop2 = null;
      }
      let list = this.getProducts.filter(
        (product) => product.category == item.title
      );
      this.droplist = list;
      let brands = list.map((e) => e.brand);
      this.dropbrands = [...new Set(brands)];
    },

    openbrand(brand, index) {
      if (index == this.drop2) {
        this.drop2 = null;
      } else {
        this.drop2 = index;
      }
      let list = this.droplist.filter((product) => product.brand == brand);
      this.droplist2 = list;
    },

    async setProduct(id) {
      this.update = true;
      this.updateid = id;
      let p = this.$store.state.products.filter((product) => product.id == id);
      this.product.name = p[0].name;
      this.product.category = p[0].category;
      await this.onCatChange();
      this.product.subCategory = p[0].subCategory;
      this.product.brand = p[0].brand;
      this.des = p[0].description;
      this.product.name = p[0].name;

      this.croppedImageSrc = p[0].imageURL;
      this.product.image = p[0].imageURL;
    },

    deleteProduct(id, url) {
      let conf = confirm("Ürünü Silmek İstediğinize Emin Misiniz?");
      if (conf) {
        let str = String(url);
        let findchar = str.indexOf("?");
        let raw = str.slice(findchar - 6, findchar);
        let ext = raw.slice(raw.indexOf("."));
        this.$store.dispatch("deleteProduct", { id, ext });
      }
    },

    autoGrow() {
      setTimeout(() => {
        let des = document.getElementById("description");
        if (des.scrollHeight > des.clientHeight) {
          des.style.height = des.scrollHeight + "px";
        }
      }, 500);
    },

    deleteFilter(item) {
      if (item == "category") {
        let conf = confirm("Kategoriyi Silmek İstediğinize Emin Misiniz?");
        if (conf) {
          let cat = this.product.category;
          this.$store.dispatch("deleteFilter", ["category", cat]);
        }
      } else if (item == "subCategory") {
        let conf = confirm("Alt Kategoriyi Silmek İstediğinize Emin Misiniz?");
        if (conf) {
          let cat = this.product.category;
          let subCat = this.product.subCategory;
          let index = this.subCategories.findIndex((i) => i == subCat);
          this.subCategories.splice(index, 1);
          this.$store.dispatch("deleteFilter", ["subCategory", cat, subCat]);
        }
      } else if (item == "brand") {
        let conf = confirm("Kategoriyi Silmek İstediğinize Emin Misiniz?");
        if (conf) {
          let brand = this.product.brand;
          let index = this.brands.findIndex((b) => b == brand);
          this.brands.splice(index, 1);
          this.$store.dispatch("deleteFilter", ["brand", brand]);
        }
      }
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar-thumb {
  background: rgb(0, 180, 200);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgb(0, 180, 200);
}

#addProduct {
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

#form-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  width: 40%;
  height: fit-content;
  border: 1px solid rgb(180, 180, 180);
  margin: 1vmax;
  border-radius: 0.5vmax;
  box-shadow: 0 0 0.5vmax 0.1vmax rgb(180, 180, 180);
  background-color: rgb(245, 255, 255);
}

#form {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border-radius: 0.5vmax;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin: 0.5vmax;
  padding: 0.5vmax;
  border-radius: 0.5vmax;
  /*box-shadow: inset 0 0 0.3vmax 0.1vmax rgb(180, 180, 180);*/
  background-color: rgb(245, 255, 255);
}

.itemhead {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  box-sizing: border-box;
  margin-right: 0.3vmax;
}

.text-left {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0.5vmax;
  font-size: 1.2vmax;
}

.headinfo {
  font-size: 0.6vmax;
  margin-right: 0.5vmax;
  align-self: flex-end;
}

.headbtns {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.headbtn {
  border: none;
  background-color: rgba(180, 230, 240, 1);
  border-radius: 0.5vmax;
  border: 1px solid rgb(199, 199, 199);
  cursor: pointer;
}

.headbtn:first-of-type {
  margin-inline: 0.3vmax;
}

.form-control {
  box-sizing: border-box;
  outline: none;
  border-radius: 0.5vmax;
  border: 1px solid rgb(199, 199, 199);
  height: 2vmax;
  margin: 0.3vmax;
  padding-inline: 0.8vmax;
  line-height: 3vmax;
}

#description {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  outline: none;
  border-radius: 0.5vmax;
  border: 1px solid rgb(199, 199, 199);
  height: 5vh;
  margin: 0.3vmax;
  padding-inline: 0.8vmax;
  line-height: 3vmax;
}

.btn {
  position: relative;
  margin: 1vmax;
  margin-bottom: 3vmax;
  height: 2vmax;
  min-width: 5vmax;
  width: fit-content;
  padding-inline: 1vmax;
  border-radius: 0.5vmax;
  border: 1px solid rgb(199, 199, 199);
  background-color: rgba(180, 230, 240, 1);
  box-shadow: 0 0 0.5vmax 0.1vmax rgb(180, 180, 180);
  cursor: pointer;
  font-weight: 600;
  font-size: 1vmax;
}

.btn:hover {
  box-shadow: 0 0;
}

.input-group {
  position: relative;
  outline: none;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: 2vmax;
  margin: 0.3vmax;
  font-size: 0.88vmax;
}

.form-input {
  box-sizing: border-box;
  outline: none;
  border-radius: 0.5vmax 0 0 0.5vmax;
  border: 1px solid rgb(199, 199, 199);
  height: 100%;
  width: 85%;
  padding-inline: 1vmax;
  font-size: inherit;
}

.input-button {
  height: 100%;
  width: 15%;
  border: none;
  border-radius: 0vmax 0.5vmax 0.5vmax 0vmax;
  background-color: rgba(190, 230, 240, 1);
  border: 1px solid rgb(199, 199, 199);
  font-size: inherit;
  cursor: pointer;
}

#cropperview {
  box-sizing: border-box;
  display: none;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
}
#cropperview::after {
  content: "";
  position: absolute;
  box-sizing: border-box;
  background-color: rgba(100, 100, 100, 0.9);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.view {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: top;
  height: 90vh;
  width: 100%;
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
/*#cropperview .buttons{
        z-index : 3;
        display : flex;
        position: absolute;
        top: 0.5vmax;
        right: 0.5vmax;
    }
    #cropperview .buttons button{
        cursor : pointer;
        margin: 0.2vmax;
        border-radius:0.5vmax ;
        border: none;
        box-sizing: content-box;
        padding-inline: 0.7vmax;
        padding-block: 0.2vmax;
        background-color:rgb(0, 180, 200);
        box-shadow: 0 0 0.5vmax 0.1vmax rgb(105, 105, 105);
    }*/
#cropperview .buttons button:hover {
  box-shadow: 0 0 0.5vmax 0.1vmax rgb(105, 135, 125);
}

.productImage {
  float: left;
  margin-left: 1vmax;
  margin-bottom: 1.5vmax;
  width: 20vh;
  height: auto;
  border-radius: 0.5vmax;
}
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
  margin: 0.5vmax;
  font-size: 1vmax;
}

#inputButton {
  height: 2vmax;
  border: none;
  border-radius: 0.5vmax;
  background-color: rgba(190, 230, 240, 1);
  border: 1px solid rgb(199, 199, 199);
  box-shadow: 0 0 1vmax -0.5vmax rgb(120, 120, 120);
  font-size: 1vmax;
  cursor: pointer;
}

#inputButton:hover {
  box-shadow: 0 0 0 0;
}

.warn {
  position: absolute;
  width: 10vmax;
  color: red;
  top: 100%;
  left: 0%;
  text-align: left;
  font-size: 0.8vmax;
}

#list {
  box-sizing: border-box;
  min-height: 100vh;
  height: fit-content;
  width: 50%;
  border: 1px solid rgb(180, 180, 180);
  margin: 1vmax;
  border-radius: 0.5vmax;
  box-shadow: 0 0 0.5vmax 0.1vmax rgb(180, 180, 180);
  background-color: rgb(245, 255, 255);
  padding: 1vmax;
}

.cat {
  width: fit-content;
  height: fit-content;
  margin-block: 1.5vmax;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.2vmax;
}
.cat p {
  cursor: pointer;
  margin: 0;
  padding: 0;
}
.listedproduct {
  position: relative;
  width: 17vmax;
  height: 5vmax;
  margin: 1vmax;
  display: flex;
  justify-content: space-between;
  text-decoration-line: none;
  border-radius: 1vmax;
  box-shadow: -0.3vmax -0.3vmax 0.3vmax white,
    0.3vmax 0.3vmax 0.4vmax rgb(188, 188, 188);
  margin-left: 3vmax;
  cursor: default;
}
.listedproduct img {
  width: auto;
  height: 100%;
  border-radius: 0 1vmax 1vmax 0;
}
.set {
  box-sizing: border-box;
  position: absolute;
  left: 18vmax;
  height: 5vmax;
  width: 2.5vmax;
  display: flex;
  flex-direction: column;
}
.delete {
  box-sizing: border-box;
  padding: 0.6vmax;
  height: 2.5vmax;
  cursor: pointer;
}
.delete img {
  height: 100%;
  width: 100%;
  border-radius: 0;
}
.edit {
  box-sizing: border-box;
  padding: 0.6vmax;
  height: 2.5vmax;
  cursor: pointer;
}
.edit img {
  height: 100%;
  width: 100%;
  border-radius: 0;
}
.listedbrands {
  width: 100%;
  height: fit-content;
  margin: 1vmax;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 1vmax;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0.5vmax;
  flex-wrap: wrap;
  width: 12vmax;
}
.info p {
  font-size: 0.8vmax;
  font-weight: 400;
  margin: 0;
  cursor: default;
}

#productid {
  position: absolute;
  top: 0;
  left: 65%;
  color: red;
  font-size: 0.7vmax;
  width: fit-content;
}

@media screen and (max-width: 768px) {
  #addProduct {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .view {
    height: 100%;
    max-height: 100%;
  }

  .top {
    margin-top: 1vh;
    height: 5vh;
    flex-direction: column;
    padding-right: 2vmax;
  }
  .bottom {
    box-sizing: border-box;
    align-self: center;
    width: 100%;
    height: 94vh;
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
  #cropperview .buttons {
    align-self: flex-end;
  }
  #cropperview .buttons button {
    width: 9vmax;
    height: 100%;
    margin-right: 1vmax;
    font-size: 1.7vmax;
  }

  #form-container {
    width: 90%;
    margin-top: 2vmax;
  }

  .form-group {
    margin-block: 2vmax;
  }

  .text-left {
    font-size: 2vmax;
  }

  .headinfo {
    font-size: 1vmax;
  }

  .headbtn {
    font-size: 1.5vmax;
  }

  .form-control {
    height: 4vmax;
  }

  .input-group {
    height: 4vmax;
    font-size: 1.7vmax;
  }

  #inputButton {
    height: 4vmax;
    font-size: 1.7vmax;
  }

  .btn {
    height: 4vmax;
    font-size: 1.7vmax;
    width: fit-content;
  }

  .warn {
    width: 15vmax;
    font-size: 1.2vmax;
  }

  #list {
    width: 90%;
  }

  .cat p {
    font-size: 2vmax;
    width: 100%;
  }
  .cat {
    text-align: left;
    width: 100%;
  }
  .listedbrands {
    width: 100%;
  }

  ul {
    box-sizing: border-box;
    padding: 0;
    width: 100%;
  }

  .listedproduct {
    width: 80%;
    height: 8vh;
  }

  .set {
    left: 100%;
    height: 8vh;
  }

  .delete,
  .edit {
    height: 4vh;
    width: 4vh;
  }

  .delete img,
  .edit img {
    height: 80%;
    width: 80%;
  }

  .info p {
    font-size: 1.5vmax;
  }

  #description {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
