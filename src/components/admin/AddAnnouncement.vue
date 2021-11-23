<template>
  <div id="addAnnouncemenet">
    <div class="nav">
      <h4 style="" @click="open"><strong>+</strong> Yeni Duyuru</h4>
    </div>

    <div id="list">
      <div
        class="listdiv"
        v-for="(item, index) in getAnnouncements"
        :key="index"
      >
        <div class="listitem">
          <p class="listitem1">{{ item.addedDate }}</p>
          <p class="listitem2">{{ item.text }}</p>
        </div>
        <div class="action">
          <div class="edit">
            <img
              src="../../assets/edit.png"
              @click="setItem(item.id)"
              title="Düzenle"
            />
          </div>
          <div class="delete">
            <img
              src="../../assets/delete.png"
              @click="deleteItem(item.id)"
              title="Sil"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-show="add" id="new">
      <div id="view">
        <div class="item">
          <p>Tarih:</p>
          <input id="datePicker" type="date" v-model="item.adddate" required />
        </div>
        <div class="item">
          <p style="align-self: flex-start">Duyuru:</p>
          <textarea id="anno" v-model="item.addanno"></textarea>
        </div>
        <div class="item btn-group">
          <button id="save" class="btn" @click="save">Ekle</button>
          <button class="btn" @click="add = false">İptal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      add: false,
      item: {
        adddate: null,
        addanno: null,
      },
      update: null,
    };
  },

  created() {
    this.$store.dispatch("getAnnos");
    eventBus.$on("SaveAnnoFinished", () => {
      this.add = false;
    });
    eventBus.$on("UpdateAnnoFinished", () => {
      this.add = false;
      this.update = null;
      this.$router.go();
    });
  },

  computed: {
    ...mapGetters(["getAnnouncements"]),
  },

  methods: {
    open() {
      this.getDate();
      this.item.addanno = null;
      this.add = true;
      document.getElementById("save").innerHTML = "Ekle";
    },

    getDate() {
      var date = new Date();

      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      var today = year + "-" + month + "-" + day;
      this.item.adddate = today;
    },

    save() {
      if (this.update != null) {
        let conf = confirm("Duyuru Güncellensin mi?");
        if (conf) {
          this.item.adddate = new Date(this.item.adddate).getTime();
          this.$store.dispatch("updateAnno", [this.item, this.update]);
        }
      } else {
        let conf = confirm("Duyuru Eklensin mi?");
        if (conf) {
          this.item.adddate = new Date(this.item.adddate).getTime();
          this.$store.dispatch("addAnno", this.item);
        }
      }
    },

    deleteItem(id) {
      let conf = confirm("Duyuruyu Silmek İstediğinize Emin Misiniz?");
      if (conf) {
        this.$store.dispatch("deleteAnno", id);
      }
    },

    setItem(id) {
      this.add = true;
      this.update = id;
      let anno = this.getAnnouncements.filter((anno) => anno.id == id);
      let items = anno[0].addedDate.split(".");
      let date = items[2] + "-" + items[1] + "-" + items[0];
      this.item.adddate = date;
      this.item.addanno = anno[0].text;
      document.getElementById("save").innerHTML = "Güncelle";
    },
  },
};
</script>

<style scoped>
#addAnnouncemenet {
  height: fit-content;
  width: 100%;
}
.nav {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

#new {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#new::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  height: 100%;
  width: 100%;
  background-color: rgba(80, 80, 80, 0.5);
  backdrop-filter: blur(1.5px);
}

#view {
  position: relative;
  height: 30vmax;
  width: 30vmax;
  background-color: white;
  /*background-color: rgb(150, 180, 184);*/
  border-radius: 1vmax;
  box-shadow: 0 0.5vmax 1vmax grey;
  z-index: 1;
  display: grid;
  grid-template-rows: 20% 70% 10%;
  padding: 1vmax;
}

.item {
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
}

.item p {
  height: fit-content;
  padding: 0;
  margin: 0 1vmax;
  width: 15%;
  display: flex;
  justify-content: flex-start;
}

input[type="date"] {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: inset 0 0 0.5vmax grey;
  border-radius: 0.5vmax;
  padding: 0.2vmax 1vmax;
  display: flex;
  justify-content: flex-start;
  margin: 0;
}

textarea {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-shadow: inset 0 0 0.5vmax grey;
  border-radius: 0.5vmax;
  padding: 1vmax;
}

.btn-group {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.btn {
  border-radius: 0.5vmax;
  border: none;
  background-color: rgba(0, 180, 200, 0.7);
  box-shadow: 0 0 0.5vmax grey;
  padding: 0.3vmax 2vmax;
  cursor: pointer;
}

#list {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0.5vmax 1vmax;
  width: fit-content;
  height: 100%;
  border-radius: 1vmax;
  padding: 0.5vmax 1vmax;
  border: 1px solid grey;
}

.listdiv {
  display: flex;
  flex-direction: row;
  min-height: 2vmax;
  height: fit-content;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1vmax;
}

.listitem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  height: fit-content;
  width: fit-content;
  font-size: 1vmax;
  font-weight: 600;
  margin-right: 1vmax;
}

.listitem1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  height: fit-content;
  width: fit-content;
  font-size: 1vmax;
  font-weight: 600;
  margin-right: 1vmax;
  color: indigo;
}

.listitem2 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  height: fit-content;
  font-size: 1vmax;
  font-weight: 400;
  text-align: left;
}

.action {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: fit-content;
}

.delete {
  box-sizing: border-box;
  height: 50%;
  cursor: pointer;
  margin-inline: 1vmax;
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete img {
  height: 1.3vmax;
  width: auto;
  border-radius: 0;
}
.edit {
  box-sizing: border-box;
  height: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit img {
  height: 1.3vmax;
  width: auto;
  border-radius: 0;
}

.nav h4 {
  margin: 2vmax;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  #view {
    width: 90%;
    height: 70%;
  }

  .item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item p {
    margin-left: 0;
    font-size: 2vmax;
  }
  .btn-group {
    flex-direction: row;
    align-items: center;
  }

  #list {
    width: 95%;
  }
  .listdiv {
    min-height: 3vmax;
    margin-bottom: 3vmax;
  }

  .listitem {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .listitem1 {
    font-size: 1.7vmax;
    align-items: flex-start;
    margin: 0.5vmax 0;
  }
  .listitem2 {
    font-size: 1.7vmax;
    align-items: flex-start;
    margin: 0;
  }
  .delete img,
  .edit img {
    height: 2vmax;
  }
}
</style>
