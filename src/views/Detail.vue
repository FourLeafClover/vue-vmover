<template>
<div class="detail" v-if="detail!=null">
  <van-icon name='arrow-left' class="leftFixed"  v-if="$store.state.app.detailShowHome==false" @click="goBack()" ></van-icon>
  <img src="@/assets/header/home.png" class="leftFixed" v-if="$store.state.app.detailShowHome==true" @click="goHome" alt="">
  <v-video :src="video" :poster="detail.image" class="myVideo"></v-video>
  <v-downloadapp></v-downloadapp>
  <div class="title">
    {{detail.title}}
  </div>
  <div class="cate">
    {{detail.cate[0]}}&nbsp;/&nbsp;{{detail.duration|duration}}
  </div>
  <div class="intro">
    {{detail.intro}}
  </div>
  <!--通过分析进来的隐藏返回按钮-->
  <div class="home" v-if="$store.state.app.detailShowHome" @click="goHome">
    前往首页观看更多视频
  </div>
</div>
<div class="loading" v-else>
    <van-loading  />
</div>
</template>

<script>
import { loadVideo } from '@/api/api'
import { setViewHistory } from '@/api/storage'
export default {
  name: 'detail',
  created () {
    let id = this.$route.params.id
    loadVideo(id, res => {
      this.detail = res
      setViewHistory(this.detail)
      document.title = this.detail.title
    })
  },
  data () {
    return {
      detail: null
    }
  },
  computed: {
    video () {
      return this.detail.content.video[0].qiniu_url
    }
  },
  methods: {
    goBack () {
      this.$router.history.go(-1)
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-bottom: 20px;
  box-sizing: border-box;
  padding-top: 56.25vw;
  .myVideo{
    position: fixed;
    width: 100%;
    left: 0px;
    top: 0px;
  }
  .leftFixed {
    position: fixed;
    left: 10px;
    top: 10px;
    color: white;
    font-weight: bold;
    width: 30px;
    height: 30px;
    z-index: 999;
    color: white;
  }
  .home{
    margin: 0 auto;
    width: 80%;
    background-color: dodgerblue;
    padding: 15px 0px;
    border-radius: 5px;
    color: white;
    text-align: center;
    letter-spacing: 0.1em;
    margin-top: 20px;
  }
  video {
    width: 100%;
    background-color: black;
  }
  .title {
    line-height: 30px;
    font-size: 20px;
    color: gray;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
  .cate {
    text-align: center;
    color: #aaa;
    font-size: 18px;
    letter-spacing: 0.05em;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .intro {
    padding: 0 10px;
    color: gray;
    line-height: 30px;
    letter-spacing: 0.05em;
  }
}

.loading{
    /deep/ .van-loading--black{
    width: 100% !important;
    padding-top: 20px;
    circle{
      stroke: dodgerblue !important;
      display: inline-block !important;
      margin: 0 auto !important;
    }
  }
}
</style>
