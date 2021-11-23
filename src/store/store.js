import Vue from "vue";
import Vuex from "vuex";
import { db } from "../../firebase.js";
import firebase from "firebase";
import { eventBus } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    products: [],
    dealers: [],
    filters: {
      categories: [],
      brands: [],
    },
    catFilter: null,
    subFilter: null,
    announcements: [],
  },

  getters: {
    getImages(state) {
      return state.images;
    },

    getProducts(state) {
      if (state.catFilter == null && state.subFilter == null) {
        return state.products;
      } else if (state.catFilter != null && state.subFilter == null) {
        return state.products.filter(
          (product) => product.category == state.catFilter
        );
      } else {
        return state.products.filter(
          (product) =>
            product.category == state.catFilter &&
            product.subCategory == state.subFilter
        );
      }
    },

    getNewProducts(state) {
      return state.products.slice(0, 6);
    },

    getDealers(state) {
      return state.dealers;
    },

    getFilters(state) {
      return state.filters;
    },

    getAnnouncements(state) {
      return state.announcements;
    },
  },

  mutations: {
    setImages(state, value) {
      state.images = value.reverse();
      eventBus.$emit("imagesReady");
    },

    setProducts(state, value) {
      state.products = value;
      eventBus.$emit("productsReady");
    },

    setDealers(state, value) {
      state.dealers = value.reverse();
    },

    addtoProduct(state, value) {
      state.products.unshift(value);
    },

    deleteProduct(state, value) {
      let index = state.products.findIndex((product) => product.id == value);
      state.products.splice(index, 1);
      eventBus.$emit("productDeleted");
    },

    addtoImages(state, value) {
      state.images.unshift(value);
    },

    deleteImage(state, value) {
      let index = state.images.findIndex((img) => img.id == value);
      state.images.splice(index, 1);
    },

    deleteDealer(state, value) {
      let index = state.dealers.findIndex((img) => img.id == value);
      state.dealers.splice(index, 1);
    },

    addtoDealers(state, value) {
      state.dealers.unshift(value);
    },

    setFilters(state, { categories, brands }) {
      state.filters.categories = categories;
      state.filters.brands = brands;
    },

    addCategory(state, value) {
      state.filters.categories.push(value);
    },

    deleteCategory(state, value) {
      let index = state.filters.categories.findIndex(
        (cat) => cat.title == value
      );
      state.filters.categories.splice(index, 1);
    },

    deleteSubCategory(state, [v1, v2]) {
      let index = state.filters.categories
        .find((c) => c.title == v1)
        .sub.findIndex((f) => f == v2);
      state.filters.categories.find((f) => f.title == v1).sub.splice(index, 1);
    },

    addSubCategory(state, { key, value }) {
      let category = state.filters.categories.find((cat) => cat.title == key);
      category.sub.push(value);
    },

    setCatFilter(state, value) {
      state.catFilter = value;
    },

    setSubFilter(state, value) {
      state.subFilter = value;
    },

    addAnno(state, value) {
      let date = new Date(value.addedDate);

      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      var d = day + "." + month + "." + year;
      value.addedDate = d;

      state.announcements.unshift(value);
    },

    setAnnos(state, value) {
      value.forEach((v) => {
        let date = new Date(v.addedDate);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var d = day + "." + month + "." + year;
        v.addedDate = d;
      });
      state.announcements = value;
    },

    deleteAnno(state, value) {
      let index = state.announcements.findIndex((a) => a.id == value);
      state.announcements.splice(index, 1);
    },

    deleteBrand(state, value) {
      let index = state.filters.brands.findIndex((brand) => brand == value);
      state.filters.brands.splice(index, 1);
    },
  },

  actions: {
    async getProducts({ commit, state }) {
      let list = [];
      await db
        .collection("products")
        .orderBy("addedDate", "desc")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            let obj = new Object({
              id: doc.id,
              ...doc.data(),
            });
            list.push(obj);
          });
        })
        .then(() => {
          commit("setProducts", list);
        });
    },

    async getImages({ commit, state }) {
      /*firebase.storage().ref().child("images/").listAll()
      .then(res=>{
        res.items.forEach(item=>{
          item.getDownloadURL()
          .then(url=>{
            state.images.push(url)
          })
        })
      })
      .then(()=>{
        //commit("setImages",this.list)
        console.log("list",state.images)
      })*/

      let item = [];

      await db
        .collection("images")
        .orderBy("addedDate")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            let obj = new Object({
              id: doc.id,
              ...doc.data(),
            });
            item.push(obj);
          });
        });

      commit("setImages", item);
    },

    async getDealers({ commit, state }) {
      let item = [];

      await db
        .collection("dealers")
        .orderBy("addedDate")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            let obj = new Object({
              id: doc.id,
              ...doc.data(),
            });
            item.push(obj);
          });
        });

      commit("setDealers", item);
    },

    async saveProduct({ commit, state }, product) {
      var key;
      var imageUrl;

      await db
        .collection("products")
        .add({
          name: product.name,
          category: product.category,
          subCategory: product.subCategory,
          brand: product.brand,
          description: product.description,
          addedDate: firebase.firestore.Timestamp.now().seconds,
        })
        .then((result) => {
          key = result.id;
          return key;
        })
        .then(async (key) => {
          const filename = product.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          await firebase
            .storage()
            .ref("productimages/" + key + ext)
            .put(product.image)
            .then((data) => {
              return data.ref.getDownloadURL();
            })
            .then((url) => {
              imageUrl = url;
            });
        });

      await db
        .collection("products")
        .doc(key)
        .update({
          imageURL: imageUrl,
        })
        .then(() => {
          var obj = new Object({
            id: key,
            name: product.name,
            category: product.category,
            subCategory: product.subCategory,
            brand: product.brand,
            description: product.description,
            addedDate: firebase.firestore.Timestamp.now().seconds,
            imageURL: imageUrl,
          });
          commit("addtoProduct", obj);
        })
        .then(() => {
          eventBus.$emit("SaveProductFinished");
          alert("Kaydetme Başarılı");
        })
        .catch((err) => {
          console.log(err);
          alert("Bir sorun oluştu");
        });
    },

    async updateProduct({ commit, state }, [product, id, img]) {
      var imageUrl;
      await db
        .collection("products")
        .doc(id)
        .update({
          name: product.name,
          category: product.category,
          subCategory: product.subCategory,
          brand: product.brand,
          description: product.description,
        })
        .then(() => {
          if (img) {
            const filename = product.image.name;
            const ext = filename.slice(filename.lastIndexOf("."));
            firebase
              .storage()
              .ref("productimages/" + id + ext)
              .put(product.image)
              .then((data) => {
                return data.ref.getDownloadURL();
              })
              .then((url) => {
                imageUrl = url;
              })
              .then(() => {
                db.collection("products").doc(id).update({
                  imageURL: imageUrl,
                });
              });
          }
        })
        .then(() => {
          eventBus.$emit("UpdateProductFinished");
          alert("Güncelleme Başarılı");
        })
        .catch((err) => {
          console.log(err);
          alert("Bir sorun oluştu");
        });
    },

    deleteProduct({ commit, state }, { id, ext }) {
      firebase
        .storage()
        .ref("productimages/" + id + ext)
        .delete()
        .then(() => {
          db.collection("products").doc(id).delete();
        })
        .then(() => {
          commit("deleteProduct", id);
          alert("Ürün Silindi");
        })
        .catch(() => {
          alert("Bir sorun oluştu");
        });
    },

    async saveimage({ commit, state }, item) {
      /*firebase.storage().ref("images/"+image.name).put(image)
      .then(data=>{
        data.ref.getDownloadURL()
        .then(url=>{
          console.log(url)
        })
        alert("Yükleme Başarılı")
      })*/

      var key;
      var imageUrl;
      var added_date = firebase.firestore.Timestamp.now().seconds;

      await db
        .collection("images")
        .add({
          description: item.description,
          addedDate: added_date,
        })
        .then((result) => {
          key = result.id;
          return key;
        })
        .then(async (key) => {
          const filename = item.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          await firebase
            .storage()
            .ref("images/" + key + ext)
            .put(item.image)
            .then((data) => {
              return data.ref.getDownloadURL();
            })
            .then((url) => {
              imageUrl = url;
            });
        });

      await db
        .collection("images")
        .doc(key)
        .update({
          imageURL: imageUrl,
        })
        .then(() => {
          var obj = new Object({
            id: key,
            description: item.description,
            addedDate: added_date,
            imageURL: imageUrl,
          });
          commit("addtoImages", obj);
          eventBus.$emit("SaveImageFinished");
          alert("Kaydetme Başarılı");
        })
        .catch((err) => {
          console.log(err);
          alert("Bir sorun oluştu");
        });
    },

    deleteImage({ commit, state }, { id, ext }) {
      firebase
        .storage()
        .ref("images/" + id + ext)
        .delete()
        .then(() => {
          db.collection("images")
            .doc(id)
            .delete()
            .then(() => {
              commit("deleteImage", id);
              //eventBus.$emit("deleted",id,index)
            })
            .catch((err) => {
              alert(err);
              console.log(err);
            });
        });
    },

    async saveDealer({ commit, state }, item) {
      var key;
      var imageUrl;
      var added_date = firebase.firestore.Timestamp.now().seconds;

      await db
        .collection("dealers")
        .add({
          addedDate: added_date,
        })
        .then((result) => {
          key = result.id;
          return key;
        })
        .then(async (key) => {
          const filename = item.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          await firebase
            .storage()
            .ref("dealers/" + key + ext)
            .put(item.image)
            .then((data) => {
              return data.ref.getDownloadURL();
            })
            .then((url) => {
              imageUrl = url;
            });
        });

      await db
        .collection("dealers")
        .doc(key)
        .update({
          imageURL: imageUrl,
        })
        .then(() => {
          var obj = new Object({
            id: key,
            addedDate: added_date,
            imageURL: imageUrl,
          });
          commit("addtoDealers", obj);
          eventBus.$emit("SaveDealerFinished");
          alert("Kaydetme Başarılı");
        })
        .catch((err) => {
          console.log(err);
          alert("Bir sorun oluştu");
        });
    },

    deleteDealer({ commit, state }, { id, ext }) {
      firebase
        .storage()
        .ref("dealers/" + id + ext)
        .delete()
        .then(() => {
          db.collection("dealers")
            .doc(id)
            .delete()
            .then(() => {
              commit("deleteDealer", id);
            })
            .catch((err) => {
              alert(err);
              console.log(err);
            });
        });
    },

    async getFilters({ commit }) {
      let categories = [];
      let brands = [];

      await db
        .collection("filters")
        .doc("categories")
        .get()
        .then((snap) => {
          let data = snap.data();
          Object.keys(data).forEach((key) => {
            let obj = new Object({
              title: key,
              sub: data[key],
            });
            categories.push(obj);
          });
        });

      await db
        .collection("filters")
        .doc("brands")
        .get()
        .then((snap) => {
          let list = snap.data();
          brands = list.name;
        });

      commit("setFilters", { categories, brands });
    },

    deleteFilter({ commit }, [filter, item1, item2]) {
      if (filter == "brand") {
        db.collection("filters")
          .doc("brands")
          .update({
            ["name"]: firebase.firestore.FieldValue.arrayRemove(item1),
          })
          .then(() => {
            commit("deleteBrand", item1);
            alert("Marka Silindi");
          })
          .catch((err) => {
            console.log(err);
            alert("Bir Sorun Oluştu");
          });
      } else if (filter == "category") {
        db.collection("filters")
          .doc("categories")
          .update({
            [item1]: firebase.firestore.FieldValue.delete(),
          })
          .then(() => {
            commit("deleteCategory", item1);
            alert("Kategori Silindi");
          })
          .catch((err) => {
            console.log(err);
            alert("Bir Sorun Oluştu");
          });
      } else if (filter == "subCategory") {
        db.collection("filters")
          .doc("categories")
          .update(item1, firebase.firestore.FieldValue.arrayRemove(item2))
          .then(() => {
            commit("deleteSubCategory", [item1, item2]);
            alert("Kategori Silindi");
          })
          .catch((err) => {
            console.log(err);
            alert("Bir Sorun Oluştu");
          });
      }
    },

    addAnno({ commit, state }, item) {
      db.collection("announcements")
        .add({
          addedDate: item.adddate,
          text: item.addanno,
        })
        .then((result) => {
          let obj = new Object({
            id: result.key,
            addedDate: item.adddate,
            text: item.addanno,
          });
          commit("addAnno", obj);
          eventBus.$emit("SaveAnnoFinished");
          alert("Ekleme Başarılı");
        })
        .catch((err) => {
          console.log(err);
          alert("Bir sorun oluştu");
        });
    },

    getAnnos({ commit, state }) {
      let list = [];
      db.collection("announcements")
        .orderBy("addedDate", "desc")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            let obj = new Object({
              id: doc.id,
              ...doc.data(),
            });
            list.push(obj);
          });
        })
        .then(() => {
          commit("setAnnos", list);
        });
    },

    deleteAnno({ commit, state }, id) {
      db.collection("announcements")
        .doc(id)
        .delete()
        .then(() => {
          commit("deleteAnno", id);
          alert("Duyuru Silindi");
        })
        .catch(() => {
          alert("Bir sorun oluştu");
        });
    },

    updateAnno({ commit, state }, [item, id]) {
      db.collection("announcements")
        .doc(id)
        .update({
          addedDate: item.adddate,
          text: item.addanno,
        })
        .then(() => {
          eventBus.$emit("UpdateAnnoFinished");
          alert("Güncelleme Başarılı");
        })
        .catch((err) => {
          console.log(err);
          alert("Bir sorun oluştu");
        });
    },
  },
});
