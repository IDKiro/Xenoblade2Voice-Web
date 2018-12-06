<template>
  <div>
    <vue-scroll>
      <v-list subheader>
        <v-list-tile v-for="item in talkList" v-if="item.pattern.indexOf('70') == -1 & ifMainShow" :key="item.pattern" @click="select(item)">
          <v-list-tile-content>
            <v-list-tile-title style="font-size: 14px" v-html="item.text"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="item in talkList" v-if="item.pattern.indexOf('70') != -1 & ifDLCShow" :key="item.pattern" @click="select(item)">
          <v-list-tile-content>
            <v-list-tile-title style="font-size: 14px" v-html="item.text"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </vue-scroll>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters(['ifMainShow', 'ifDLCShow']),
    talkList () {
      return this.$store.getters.availablePatterns.map(
        pattern => {
          return {
            'pattern': pattern,
            'text': this.$store.state.dialogue[pattern].name[this.$store.state.language]
          }
        })
    }
  },
  methods: {
    ...mapMutations(['setPattern']),
    select (rowData) {
      this.setPattern(rowData.pattern)
    }
  }
}
</script>

<style>
</style>
