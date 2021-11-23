<template>
  <transition :name="dir" mode="in-out">
    <div class="slide" v-show="visible">
      <img :src="image.url" />
    </div>
  </transition>
</template>

<script>
export default {
  props: ["image"],

  data() {
    return {};
  },

  computed: {
    visible() {
      return this.image.index == this.$parent.index;
    },
    dir() {
      return this.$parent.slideDirection;
    },
  },
};
</script>

<style scoped>
.slide {
  height: 100%;
  width: 100%;
}
img {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  object-fit: contain;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active {
  animation: slide-left-in 2.5s ease-out;
}
.slide-left-leave-active {
  animation: slide-left-out 2.5s ease-out;
}

@keyframes slide-left-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-left-out {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
}

.slide-right-enter-active {
  animation: slide-right-in 2.5s ease-out;
}
.slide-right-leave-active {
  animation: slide-right-out 2.5s ease-out;
}
@keyframes slide-right-out {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes slide-right-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@media screen and (max-width: 768px) {
}
</style>
