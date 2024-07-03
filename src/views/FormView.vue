<template>
  <div class="login-container">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col md="4">
          <b-card title="Login" class="mt-5">
            <b-form @submit.prevent="onSubmit">
              <b-form-group label="Email" label-for="email-input">
                <b-form-input
                  id="email-input"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </b-form-group>

              <b-form-group label="Password" label-for="password-input">
                <b-form-input
                  id="password-input"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Enter your password"
                />
              </b-form-group>

              <b-row class="text-center">
                <b-col>
                  <b-button type="submit" variant="primary">Login</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // Handle form submission
      console.log("Form submitted:", this.form);
      // Add your login logic here
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #24263a;
  background-image: url(https://app.campaygn.com/img/login_bg.44c3fe35.png);
  background-size: cover;
  min-height: 100vh;
}
</style>
