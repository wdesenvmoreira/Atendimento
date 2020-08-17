<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                      <v-toolbar-title> Login </v-toolbar-title>
                   </v-toolbar>
                   <v-card-text>
                       <v-row>
                           <v-col cols=12>
                               <v-text-field
                                    v-model="email"
                                   label="Email"
                                   type="email"
                                   prepend-icon="mdi-account"
                                   :disabled="disable"
                                   >
                               </v-text-field>
                           </v-col>
                           <v-col cols=12>
                               <v-text-field
                                   label="Senha"
                                   v-model="senha"
                                   prepend-icon="mdi-lock"
                                   :type="show ? 'text' : 'password'"
                                   :append-icon=" show ? 'mdi-eye' : 'mdi-eye-off'"
                                   @click:append="show = !show"
                                   :disabled="disable"
                                   >
                               </v-text-field>
                           </v-col>
                       </v-row>
                   </v-card-text>
                   <v-card-actions>
                       <v-row>
                           <v-col cols="12" class="text-right">
                               <v-btn color="success" @click.prevent="logar">Entrar</v-btn>
                           </v-col>
                       </v-row>
                   </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      senha: '',
      show: false,
      disable: false
    }
  },

  computed: {
    ...mapState('auth', ['loadAuth'])
  },

  methods: {

    ...mapActions('auth', ['ActionLogin']),

    async logar () {
      try {
        await this.ActionLogin({ email: this.email, senha: this.senha })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
