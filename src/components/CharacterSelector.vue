<template>
  <div class="scroll">
    <ul style="text-align: left;">
      <li v-for="chara in charaList" :key="chara.cid">
        <v-btn style="width: 90px; height: 90px" :name="chara.cid" block @click="selectChara" >
          <img :src="chara.img" :name="chara.cid"/>
        </v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['charaList'])
  },
  methods: {
    ...mapMutations(['addChara']),

    selectChara (event) {
      let cid = event.target.name
      if (cid) {
        this.addChara(cid)
      }
    }
  }
}
</script>

<style lang="scss">
.scroll {
  height: 100%;
  overflow: auto;
  img {
    width: 90px;
    box-shadow:2px 2px 5px #333333;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
  }
  .v-btn {
    padding: 0;
    margin: 4px;
  }
}
</style>
