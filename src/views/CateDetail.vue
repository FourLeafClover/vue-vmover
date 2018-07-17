<template>
<w-back-layout :title='title' :right-text="rightText">
     <van-list :loading="isNextpageLoading" loading-text="视频加载中" @load="loadItems">
      <div class="items">
        <div class="item" v-for="(item,index) in items" :key="index" @click="gotoTopic(item.postid)">
          <v-cover></v-cover>
          <img :src="item.image">
          <div class="cate">
            <span class="time">{{item.duration | duration}} &nbsp; #{{item.catename}}#</span>
          </div>
          <div class="title">{{item.title}}</div>
        </div>
        <v-end v-show="isLoadComplete"></v-end>
      </div>
    </van-list>
</w-back-layout>
</template>

<script>
import { loadCateVideos } from '@/api/api'
export default {
  name: 'catedetail',
  created () {
    this.cateId = this.$route.params.cateid
  },
  data () {
    return {
      cateId: 0,
      items: [],
      isNextpageLoading: false,
      isLoadComplete: false,
      page: 1,
      title: ''
    }
  },
  methods: {
    loadItems () {
      if (!this.isLoadComplete) {
        this.isNextpageLoading = true
        loadCateVideos(this.cateId, this.page, res => {
          if (res) {
            this.items = [...this.items, ...res]
            this.title = res.catename
          }
          this.isNextpageLoading = false
          this.page += 1
          if (res.length < 10) {
            this.isLoadComplete = true
          }
        })
      }
    },
    gotoTopic (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  computed: {
    rightText () {
      if (this.items) {
        return `已加载${this.items.length}条`
      } else {
        return ''
      }
    }
  },
  watch: {
    '$route.params.cateid' (value) {
      if (value) {
        if (value !== this.cateId) {
          this.page = 1
          this.isNextpageLoading = false
          this.isLoadComplete = false
          this.cateId = value
          this.title = ''
          this.items = []
          this.loadItems()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
  background-color: black;
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
    }
    .title {
      position: absolute;
      left: 10px;
      bottom: 10px;
    }
    img {
      width: 100vw;
      height: 62.53vw;
    }
  }
}
</style>
