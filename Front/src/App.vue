<template>
  <v-app>
    <v-content>
      <Login v-if="!logado"/>
      <principal-page v-else/>

    </v-content>
  </v-app>
</template>

<script>
import Login from './components/auth/login.vue'
// import Loader from './components/loader/loader'
import PrincipalPage from './views/principal_page'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    Login,
    // Loader,
    PrincipalPage
  },
  data: () => ({
    load: true
  }),

  computed: {
    ...mapState('auth', ['logado'])
  },

  methods: {
    ...mapActions('auth', ['ActionValidarSessao']),
    ...mapActions('loader', ['ActionLoader']),

    exibirLoader (mensagem = '', abrir = false) {
      const opt = {
        mensagem: mensagem,
        abrir: abrir
      }
      this.ActionLoader(opt)
    },

    async validarSessao () {
      try {
        await this.ActionValidarSessao()
        // this.exibirLoader('', false)
      } catch (error) {
        // this.exibirLoader('', false)
        console.log(error)
      }
    }

  },
  created () {
    // this.exibirLoader('Verificando sessões ativas ...', true)
    console.log('create')
    this.validarSessao()
  }

}
</script>
