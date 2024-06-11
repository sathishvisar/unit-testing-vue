<template>
  <div class="login-form">
    <input
      v-model="username"
      type="text"
      placeholder="Username"
      name="username"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      name="password"
    />
    <button name="cancel" @click="cancel">Cancel</button>&nbsp;
    <button name="login" @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");

const cancel = () => {
  // Clear username and password fields
  username.value = "";
  password.value = "";
};

const login = () => {
  // Simulate login logic
  console.log("Logging in with:", username.value, password.value);
  // You can replace the above console.log with your actual login logic
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  display: inline-block;
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
}

button:hover {
  background-color: #0056b3;
}
</style>
