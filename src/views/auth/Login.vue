<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 relative">
    <img
      :src="backgroundImage"
      alt="Login background"
      class="absolute inset-0 object-cover w-full h-full z-0"
    >

    <div class="relative z-10 max-w-md w-full px-6">
      <card>
        <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>

        <validation-observer
          ref="observer"
          v-slot="{ handleSubmit, invalid }"
        >
          <form @submit.prevent="handleSubmit(login)">
            <!-- Username -->
            <div class="mb-4">
              <label class="">Username</label>
              <validation-provider
                v-slot="validationContext"
                :rules="{ required: true }"
                name="Username"
              >
                <text-input
                  v-model="username"
                  :invalid="!!validationContext.errors[0]"
                  placeholder="Enter username..."
                />
                <small class="text-danger">{{ validationContext.errors[0] }}</small>
              </validation-provider>
            </div>

            <!-- Password -->
            <div class="mb-4">
              <label class="block mb-1 font-medium">Password</label>
              <validation-provider
                v-slot="validationContext"
                :rules="{ required: true }"
                name="Password"
              >
                <div class="flex items-center">
                  <text-input
                    v-model="password"
                    :class="{ 'border-danger-light': validationContext.errors.length }"
                    :invalid="!!validationContext.errors[0]"
                    :type="passwordFieldType"
                    class="mr-2 flex-grow"
                    placeholder="●●●●●●●●"
                  />
                  <feather-icon
                    :icon="passwordToggleIcon"
                    class="cursor-pointer"
                    size="24"
                    @click="togglePasswordVisibility"
                  />
                </div>
                <small class="text-danger">{{ validationContext.errors[0] }}</small>
              </validation-provider>
            </div>

            <!-- Submit -->
            <div class="mt-6">
              <c-button
                :disabled="invalid || loading"
                type="submit"
                variant="primary"
              >
                Login
              </c-button>
            </div>
          </form>
        </validation-observer>

        <div class="text-center mt-4 text-sm">
          Don’t have an account?
          <router-link
            :to="{ name: 'auth-sign-up' }"
            class="link"
          >
            Sign Up
          </router-link>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import auth from "@/auth/auth"
  import Card from "@/components/ui/Card.vue";
  import HelperService from "@/services/HelperService"
  import CButton from "@/components/ui/CustomButton.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import {togglePasswordVisibility} from "@core/mixins/ui/forms"

  export default {
    name: "Login",
    components: {CButton, TextInput, Card},
    mixins: [togglePasswordVisibility],
    data() {
      return {
        username: "",
        password: "",
        loading: false,
        backgroundImage: require('@/assets/images/pages/login.jpg'),
      }
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
      },
    },
    methods: {
      async login() {
        this.loading = true
        try {
          const dto = {
            username: this.username,
            password: this.password,
          }

          const res = await auth.login(dto)
          auth.setToken(res.data.access_token)
          await auth.refreshCurrentUser()

          HelperService.successToast(this.$toast, `Welcome back ${auth.getCurrentUser().username}!`)
          await this.$router.push({name: 'home'})
        } catch (err) {
          console.error(err)
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>
