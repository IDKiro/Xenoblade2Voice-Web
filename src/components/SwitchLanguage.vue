<template>
  <div>
    <v-btn-toggle v-model="language" mandatory>
      <v-btn flat value="CN">
        CN 简体中文
      </v-btn>
      <v-btn flat value="JP">
        JP 日本語
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    language: {
      get () {
        return this.$store.state.language
      },
      set (value) {
        this.setLanguage(value)
      }
    }
  },
  methods: mapMutations(['setLanguage'])
}
</script>
