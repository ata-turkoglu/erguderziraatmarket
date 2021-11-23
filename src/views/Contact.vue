<template>
  <div id="contact">
    <div id="top"></div>
    <div class="container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.658933722436!2d28.402256915204486!3d38.74858817959391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b810b775fa689f%3A0xb1370609681e2f1c!2sErg%C3%BCder%20Ziraat%20Market!5e0!3m2!1str!2str!4v1622979254776!5m2!1str!2str"
        id="map"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
      <div id="info">
        <div id="phone">
          <div class="icons">
            <img src="../assets/phone.png" />
            <img src="../assets/whatsapp.png" />
            <img src="../assets/comment.png" />
          </div>
          <a class="tel" href="tel:+902365713003">0236 571 30 03</a>
          <a class="tel" href="tel:+905397762002">0539 776 20 20</a>
        </div>
        <div id="adress">
          <img src="../assets/location.png" />
          <p>Namık Kemal Mah. Cumhuriyet Cad. 25/B Köprübaşı, Manisa</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#contact {
  width: 100%;
  min-height: 70vh;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgb(240, 250, 240);
  padding-bottom: 4vmax;
}
#top {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 8vmax;
  background-image: linear-gradient(rgba(57, 164, 75, 0.8), rgb(240, 250, 240));
  z-index: -1;
}

.container {
  box-sizing: border-box;
  width: 100%;
  height: 75vh;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  grid-gap: 1vmax 1vmax;
  padding: 1vmax;
  margin-top: 1vmax;
}

#map {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border-radius: 1vmax;
  box-shadow: -0.3vmax -0.3vmax 0.3vmax white,
    0.3vmax 0.3vmax 0.4vmax rgb(188, 188, 188);
}

#info {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 2fr 1fr;
  width: 100%;
  height: 100%;
  padding: 1vmax;
  border-radius: 1vmax;
  box-shadow: -0.3vmax -0.3vmax 0.3vmax white,
    0.3vmax 0.3vmax 0.4vmax rgb(188, 188, 188);
}

#phone {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  margin: 1vmax;
}

.tel {
  font-size: 4vmax;
  margin: 0;
  text-decoration: none;
  margin-block: 1.5vmax;
  color: #2c3e50;
}

.icons {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.icons img {
  height: 5vmax;
  width: 5vmax;
}

#adress {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1vmax;
}

#adress img {
  height: 7vmax;
  width: 7vmax;
}

#adress p {
  font-size: 2vmax;
}

@media screen and (max-width: 768px) {
  #top {
    height: 12vmax;
  }

  .container {
    margin-top: 3vmax;
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;
    grid-gap: 3vmax;
  }

  #info {
    padding: 2vmax;
  }
}
</style>
