<!-- <template>
  <v-card class="form">'
    <v-card-title primary-title>
      <div>
        <div class="headline">Login</div>
      </div>
    </v-card-title>
    <v-form v-model="valid">
      <v-text-field v-model="name" :rules="nameRules" :counter="10" label="User Name/Email" required></v-text-field>
      <br>
      <br>
      <v-text-field v-model="email" :rules="emailRules" label="Password" required></v-text-field>
      <v-btn color="success">Submit</v-btn>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    })
  }

</script>

<style>
  .form {
    position: absolute;

    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -150px;

    padding: 30px;

  }

</style>-->

<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="login"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      login: null,
      password: null,
    }),
    props: {
      source: String
    }
  }
</script>
