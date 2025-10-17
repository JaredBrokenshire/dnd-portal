<template>
  <div
    class="w-full px-16 py-2 flex-between"
    style="z-index: 10;"
  >
    <div class="flex items-center gap-4 text-lg">
      <router-link
        :to="{name: 'home'}"
        class="hidden sm:block sm:mr-4"
      >
        <img
          :src="websiteLogo"
          alt="Website Logo"
          class="w-[100px] aspect-square"
        >
      </router-link>
      <router-link
        :class="`nav-link md:mx-4 ${activeLink === 'home' && 'active'}`"
        :to="{name: 'home'}"
      >
        <h5>Home</h5>
      </router-link>
      <router-link
        :class="`nav-link md:mx-4 ${activeLink === 'characters' && 'active'}`"
        :to="{name: 'characters'}"
      >
        <h5>Characters</h5>
      </router-link>
      <router-link
        :class="`nav-link md:mx-4 ${activeLink === 'races' && 'active'}`"
        :to="{name: 'races'}"
      >
        <h5>Races</h5>
      </router-link>
      <router-link
        :class="`nav-link md:mx-4 ${activeLink === 'classes' && 'active'}`"
        :to="{name: 'classes'}"
      >
        <h5>Classes</h5>
      </router-link>
    </div>

    <div class="w-fit ml-2">
      <c-button
        class="d-flex align-items-center text-center shadow"
        variant="danger"
        @click="logout"
      >
        <span class="mr-2">Logout</span>
        <feather-icon icon="LogOutIcon" />
      </c-button>
    </div>
  </div>
</template>

<script>
  import auth from "@/auth/auth";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";

  export default {
    name: "PageHeader",
    components: {CButton},
    data() {
      return {
        websiteLogo: require('@/assets/images/website-logo.png'),
      }
    },
    computed: {
      currentUser() {
        return auth.getCurrentUser();
      },
      activeLink() {
        return this.$route.name
      }
    },
    methods: {
      logout() {
        const username = this.currentUser.username;
        auth.logout();
        HelperService.successToast(this.$toast, `Goodbye ${username}`);
        this.$router.push({name: "auth-login"});
      }
    }
  }
</script>

<style scoped>
</style>