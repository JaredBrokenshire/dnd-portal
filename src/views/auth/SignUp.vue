<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 relative">
    <img
      :src="backgroundImage"
      alt="Sign up background"
      class="absolute inset-0 object-cover w-full h-full z-0"
    >

    <div class="relative z-10 max-w-md w-full px-6">
      <card>
        <h2 class="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        <validation-observer
          ref="observer"
          v-slot="{ handleSubmit, invalid }"
        >
          <form @submit.prevent="handleSubmit(signUp)">
            <!-- Username -->
            <div class="mb-4">
              <label class="block mb-1 font-medium">Username</label>
              <validation-provider
                v-slot="validationContext"
                :rules="{ required: true }"
                name="Username"
              >
                <div>
                  <text-input
                    v-model="username"
                    :invalid="!!validationContext.errors[0]"
                    placeholder="Enter username..."
                  />
                  <small class="text-danger">{{ validationContext.errors[0] }}</small>
                </div>
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

            <!-- Confirm Password -->
            <div class="mb-4">
              <label class="block mb-1 font-medium">Confirm Password</label>
              <validation-provider
                v-slot="validationContext"
                :rules="{ required: true }"
                name="Confirm Password"
              >
                <div>
                  <text-input
                    v-model="confirmPassword"
                    :class="{ 'border-danger-light': validationContext.errors.length || (password !== confirmPassword) }"
                    :invalid="!!validationContext.errors[0]"
                    :type="passwordFieldType"
                    placeholder="●●●●●●●●"
                  />
                  <small class="text-danger">
                    {{ validationContext.errors[0] }}
                    {{ password !== confirmPassword && 'Passwords do not match' }}
                  </small>
                </div>
              </validation-provider>
            </div>

            <!-- Submit -->
            <div class="mt-6">
              <c-button
                :disabled="invalid || loading || password !== confirmPassword"
                type="submit"
                variant="primary"
              >
                Sign Up
              </c-button>
            </div>
          </form>
        </validation-observer>

        <div class="text-center mt-4 text-sm">
          Already have an account?
          <router-link
            :to="{ name: 'auth-login' }"
            class="link"
          >
            Login
          </router-link>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import auth from "@/auth/auth";
  import Card from "@/components/ui/Card.vue";
  import UserService from "@/services/UserService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import {togglePasswordVisibility} from "@core/mixins/ui/forms";

  export default {
    name: "SignUp",
    components: {CButton, Card, TextInput},
    mixins: [togglePasswordVisibility],
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        loading: false,
        backgroundImage: require('@/assets/images/pages/login.jpg'),
      };
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
      },
    },
    methods: {
      async signUp() {
        if (this.password !== this.confirmPassword) return;

        this.loading = true;
        try {
          const createUserDTO = {
            username: this.username,
            password: this.password,
            confirm_password: this.confirmPassword,
          };

          await UserService.create(createUserDTO);

          const loginDTO = {
            username: this.username,
            password: this.password,
          };

          const res = await auth.login(loginDTO);
          auth.setToken(res.data.access_token);
          await auth.refreshCurrentUser();

          HelperService.successToast(this.$toast, `Welcome ${auth.getCurrentUser().username}!`);
          await this.$router.push({name: 'home'});
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create user, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText);
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>
