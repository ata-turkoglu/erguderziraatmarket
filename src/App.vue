<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Ergüder Ziraat",
  },

  created() {
    this.$store.dispatch("getImages");
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getFilters");
    this.$store.dispatch("getDealers");
    this.$store.dispatch("getAnnos");
  },
};
</script>

<style>
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: 750;
  margin: 0;
  padding: 0;
  height: fit-content;
  min-height: 100vh;
  margin-inline: auto;
  width: 100%;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 0.8vmax;
  height: 0.5vmax;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0.5vmax rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 0.5vmax rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 6px;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 6px;
  border-radius: 6px;
  background: rgba(222, 225, 230, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(222, 225, 230, 0.5);
}

@media screen and (min-width: 768px) {
  ::-webkit-scrollbar {
    width: 0.8vmax;
    height: 0.5vmax;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0.5vmax rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 0.5vmax rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 6px;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 6px;
    border-radius: 6px;
    background: rgba(222, 225, 230, 0.5);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(222, 225, 230, 0.5);
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 5s;
}
</style>
