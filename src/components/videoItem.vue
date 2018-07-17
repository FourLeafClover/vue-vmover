<template>
<div class="item"  @click="gotoTopic(item.postid)" v-show="item.post_type=='1'">
  <v-cover :zIndex="2"></v-cover>
  <img :src="item.image" alt="">
  <div class="cate">
    <span class="time">{{item.duration | duration}} &nbsp; #{{item.catename}}#</span>
  </div>
  <div class="title">{{item.title}}</div>
</div>
</template>

<script>
export default {
  name: 'vVideoItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    gotoTopic (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  height: 62.53vw;
  position: relative;
  div,
  span {
    color: white;
  }
  .cate {
    position: absolute;
    left: 10px;
    bottom: 40px;
    z-index: 2;
  }
  .title {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 3;
  }
  img {
    width: 100vw;
    height: 62.53vw;
  }
}
</style>
