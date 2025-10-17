<template>
  <div class="hero">
    <div class="hero__text-container">
      <h1 class="hero__title">
        Create, View and Edit your next adventurer!
      </h1>

      <p class="hero__subtitle">
        Whether it's a horde of goblins, a nest of vampires or a mighty red dragon - Your party are ready for anything
      </p>

      <div class="w-fit">
        <c-button
          class="mt-4 text-lg"
          variant="primary"
          @click="viewCharacters"
        >
          View Characters
        </c-button>
      </div>
    </div>
    <div class="hero__image-container">
      <div class="hero__image">
        <img
          :src="heroImage"
          alt="hero"
          class="object-contain"
        >
        <div class="hero__image-overlay" />
      </div>

    </div>
  </div>
</template>

<script>
  import CButton from "@/components/ui/CustomButton.vue";

  export default {
    name: "Hero",
    components: {CButton},
    data() {
      return {
        heroImage: require("@/assets/images/pages/home/hero.png")
      }
    },
    methods: {
      viewCharacters() {
        this.$router.push({name: "characters"})
      }
    }
  }
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
}

.hero__text-container {
  width: 100%;
  flex: 1;
  padding-top: 2rem;
}

.hero__title {
  font-size: 36px;
  font-weight: 600;
}

.hero__subtitle {
  font-size: 28px;
  font-weight: 400;
  margin-top: 1.25rem;
}

.hero__image-container {
  width: 100%;
}

.hero__image {
  position: relative;
  height: 360px;
  z-index: 0;
  object-fit: cover;
}

.hero__image img {
  height: 100%;
  width: 100%;
  align-self: end;
  object-fit: contain;
}

.hero__image-overlay {
  position: absolute;
  margin-top: 8rem;
  left: 0;
  background-image: url("@/assets/images/pages/home/hero-bg.png");
  background-repeat: round;
  z-index: -10;
  height: 590px;
  overflow: hidden;
  max-height: 590px;
}

/* sm Breakpoint */
@media (min-width: 576px) {
  .hero__title {
    font-size: 48px;
  }
}

/* md Breakpoint */
@media (min-width: 768px) {
  .hero {
    flex-direction: row;
  }

  .hero__image-container {
    width: 50%;
    height: 100%;
  }

  .hero__image {
    height: 720px;
  }

  .hero__image-overlay {
    top: -6rem;
    right: -50%;
    height: 100vh;
  }
}

/* 2xl Breakpoint */
@media (min-width: 1400px) {
  .hero__title {
    font-size: 64px;
  }
}
</style>