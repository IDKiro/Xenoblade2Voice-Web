<template>
  <div class="scroll">
    <v-card>
      <div class="headline">本篇</div>
      <ul style="text-align: left;">
        <li v-for="chara in charaList" :key="chara.cid" v-if="chara.cid < 700 | chara.cid == '15a' | chara.cid == '15b'">
          <v-btn style="width: 90px; height: 90px" :name="chara.cid" block @click="selectChara" >
            <img :src="chara.img" :name="chara.cid"/>
          </v-btn>
        </li>
      </ul>
    </v-card>
    <v-card style="margin-top: 5px;">
      <div class="headline">黄金国</div>
      <ul style="text-align: left;">
        <li v-for="chara in charaList" :key="chara.cid" v-if="!(chara.cid < 700 | chara.cid == '15a' | chara.cid == '15b')">
          <v-btn style="width: 90px; height: 90px" :name="chara.cid" block @click="selectChara" >
            <img :src="chara.img" :name="chara.cid"/>
          </v-btn>
        </li>
      </ul>
    </v-card>
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
