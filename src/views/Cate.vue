<template>
<v-layout :active="1">
  <div class="cates">
    <div class="cate" v-for="(cate,key) in cates" :key="key" @click="goto(cate.cateid)">
      <img :src="cate.icon" alt="">
      <div class="name">#{{cate.catename}}#</div>
      <v-cover :zIndex="2"></v-cover>
    </div>
  </div>
</v-layout>
</template>

<script>
import {
  loadCates
} from '@/api/api'
export default {
  name: 'cates',
  data () {
    return {
      cates: []
    }
  },
  created () {
    loadCates((res) => {
      this.cates = res.filter(x => x !== '')
    })
  },
  methods: {
    goto (id) {
      this.$router.push({
        path: `cate/${id}`,
        force: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cates {
  width: 100%;
  background-color: black;
  display: inline-table;
  .cate {
    width: 50vw;
    height: 50vw;
    float: left;
    position: relative;
    img {
      width: 100%
    }
    .name{
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      z-index:3;
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 20px;
      transform: translateY(-50%);
    }
  }
}
</style>
