<template>
  <footer class="flex flex-col mt-5 border-t border-gray-300">
    <div class="flex flex-col md:flex-row flex-wrap justify-between gap-5 p-5 sm:px-16">
      <div class="flex flex-col gap-5">
        <router-link :to="{name: 'home'}">
          <img
            :src="websiteLogo"
            alt="D&D Dashboard"
            class="w-[100px] aspect-square object-contain"
          >
        </router-link>
        <p class="">
          D&D Dashboard 2025 <br>
          All Rights Reserved &copy;
        </p>
      </div>

      <div class="flex flex-1 md:justify-end w-100 flex-wrap gap-[5rem] mt-10">
        <div
          v-for="group in linkGroups"
          :key="group.title"
          class="flex flex-col gap-3 min-w-[170px]"
        >
          <div class="text-lg font-bold">{{ group.title }}</div>
          <div class="flex flex-col gap-4">
            <a
              v-for="link in group.links"
              :key="link.title"
              :href="link.url"
              class="nav-link"
            >
              {{ link.title }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-between flex-wrap mt-5 border-t border-gray-300 p-5 sm:px-16">
      <p>@2025 D&D Dashboard. All rights reserved</p>

      <div class="flex flex-1 justify-center sm:justify-end mt-4 gap-5">
        <router-link :to="{name: 'home'}">Privacy Policy</router-link>
        <router-link :to="{name: 'home'}">Terms & Conditions</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "PageFooter",
    data() {
      return {
        websiteLogo: require("@/assets/images/website-logo.png"),
        linkGroups: [
          {
            title: "About",
            links: [
              {title: "Vue Portal", url: "https://github.com/JBrokenshire/dnd-portal"},
              {title: "Go API", url: "https://github.com/JBrokenshire/dnd-api"},
            ]
          },
          {
            title: "Socials",
            links: [
              {title: "GitHub", url: "https://github.com/JBrokenshire"},
              {title: "Instagram", url: "https://www.instagram.com/jbrokenshire0/"},
              {title: "LinkedIn", url: "https://www.linkedin.com/in/jared-brokenshire-771448227/"},
            ],
          },
        ]
      }
    }
  }
</script>

<style scoped>
</style>