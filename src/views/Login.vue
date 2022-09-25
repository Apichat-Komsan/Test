<template>
  <v-container fluid fill-height>
    <v-row align-center justify-center>
        <v-col xs12 sm8 md4>
          <v-card class="elevation-3 bg" light>
            <v-card-title class="justify-center">
              <span class="text-h3 font-weight-light">Login</span>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit="login"
              >
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  label="Username"
                  type="text"
                  v-model="form.username"
                  :rules="[v => !!v || 'Username is required']"
                  outlined
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="form.password"
                  :rules="[v => !!v || 'Password is required']"
                  outlined
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center pb-5">
              <v-btn large rounded @click="login" type="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      valid: true,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.axios.post(`${process.env.VUE_APP_DOMAIN}/users/auth`, this.form).then((response) => {
          if (response.status === 200) {
            this.$cookies.set('jwt_token', response.data.token)
            window.location.href = '/home'
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.bg {
  background: linear-gradient(to right top, #FFF59D, #FFECB3, #FFF3E0) !important;
}
</style>
