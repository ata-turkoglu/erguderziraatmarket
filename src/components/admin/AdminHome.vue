<template>
  <div id="home">
    <router-link id="product" tag="div" to="/admin/addProduct">
      <img src="../../assets/addproduct.png" />
      <p>Ürünleri Düzenle</p>
    </router-link>

    <router-link id="image" tag="div" to="/admin/addImage">
      <img src="../../assets/addimage1.png" />
      <p>Resimleri Düzenle</p>
    </router-link>

    <router-link id="dealer" tag="div" to="/admin/addDealer">
      <img src="../../assets/adddealer.png" />
      <p>Bayileri Düzenle</p>
    </router-link>

    <router-link id="doc" tag="div" to="/admin/addAnnouncement">
      <img src="../../assets/adddoc.png" />
      <p>Duyuruları Düzenle</p>
    </router-link>
  </div>
</template>

<style scoped>
#home {
  box-sizing: border-box;
  height: 90%;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  grid-gap: 2vmax;
  padding: 2vmax;
  padding-right: 4vmax;
}

img {
  height: 80%;
  width: auto;
  object-fit: contain;
}

p {
  height: 20%;
  font-size: 2vmax;
  color: black;
}

#product {
  background-color: rgba(100, 150, 100, 0.5);
  padding: 1vmax;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
#image {
  background-color: rgba(100, 100, 150, 0.5);
  padding: 1vmax;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
#dealer {
  background-color: rgba(150, 100, 100, 0.5);
  padding: 1vmax;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
#doc {
  background-color: rgba(100, 100, 100, 0.5);
  padding: 1vmax;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
</style>
