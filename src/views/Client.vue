<template>
  <div id="client">
    <Header />
    <div class="container">
      <transition name="show">
        <router-view></router-view>
      </transition>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/page/Header";
import Footer from "../components/page/Footer";
export default {
  data() {
    return {
      route: null,
    };
  },

  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
#client {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.show-enter-active {
  transition: opacity 0.5s ease;
}

.show-leave-active {
  transition: opacity 0.5s ease;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
</style>
