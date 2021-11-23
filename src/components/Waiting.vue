<template>
  <div id="waiting">
    <img id="wlogo" src="../assets/ezmlogo.png" />
    <br />
    <p>Bekleyin...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intrvl: null,
      sheight: null,
    };
  },
  mounted() {
    window.scrollTo(0, document.body.scrollHeight / 2);
    this.sheight = document.body.scrollHeight;
    document.getElementById("waiting").style.height = this.sheight + "px";

    let el = document.getElementById("wlogo");
    let opa = 1;
    let prev_opa = 1.1;
    let step = 0.01;
    let time = 35;

    this.intrvl = setInterval(() => {
      if (opa < prev_opa && opa > 0.5) {
        prev_opa = opa;
        el.style.opacity = opa;
        opa = opa - step;
      } else if (opa <= 0.5) {
        prev_opa = opa;
        el.style.opacity = opa;
        opa = opa + step;
      } else if (opa >= 1) {
        prev_opa = opa;
        el.style.opacity = opa;
        opa = opa - step;
      } else {
        prev_opa = opa;
        el.style.opacity = opa;
        opa = opa + step;
      }
    }, time);
  },
  destroyed() {
    clearInterval(this.intrvl);
  },
};
</script>

<style scoped>
#waiting {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#waiting::after {
  content: "";
  top: 0;
  position: absolute;
  height: inherit;
  width: 100%;
  backdrop-filter: blur(1.5px);
}

#waiting img {
  height: 20%;
  width: auto;
  z-index: 2;
}

#waiting p {
  z-index: 2;
  font-size: 1.2vmax;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: rgb(57, 164, 75);
}
</style>
