<template>
<v-layout :active="2" :search='true'>
  <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh">
    <van-list :loading="isNextpageLoading" loading-text="视频加载中" @load="loadItems">
      <van-swipe :autoplay="3000" class="banner">
        <van-swipe-item v-for="(banner, index) in banners" :key="index" @click.native="gotoTopic(banner.postId)">
          <img :src="banner.image" />
        </van-swipe-item>
      </van-swipe>
      <div class="items">
        <v-video-item :item="item" v-for="(item,key) in items" :key="key"></v-video-item>
        <v-end v-show="isLoadComplete"></v-end>
      </div>
    </van-list>
  </van-pull-refresh>
</v-layout>
</template>

<script>
import {
  loadBanner,
  loadHomePage
} from '@/api/api'
export default {
  name: 'home',
  data () {
    return {
      banners: [],
      isRefreshLoading: false,
      isNextpageLoading: false,
      isLoadComplete: false,
      items: [],
      page: 1
    }
  },
  created () {
    loadBanner((res) => {
      this.banners = res
    })
    this.$store.state.app.detailShowHome = false
  },
  computed: {
    searchStyles () {
      let scrollTop = this.$store.state.app.scrollTop
      let _opacity = scrollTop < 800 ? 1 - scrollTop / 800 : 0
      return {
        opacity: _opacity
      }
    }
  },
  mounted () {
    // this.loadItems()
  },
  methods: {
    gotoTopic (id) {
      this.$router.push(`/detail/${id}`)
    },
    onRefresh () {
      this.isRefreshLoading = true
      this.isLoadComplete = false
      this.items = []
      this.page = 1
      this.loadItems()
    },
    loadItems () {
      if (!this.isLoadComplete) {
        let _this = this
        _this.isNextpageLoading = true
        loadHomePage(this.page, (res) => {
          this.page += 1
          _this.items.push(...res)
          _this.isNextpageLoading = false
          if (res.length < 10) {
            _this.isLoadComplete = true
          }
          this.isRefreshLoading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  img {
    width: 100vw;
  }
}

.items {
  background-color: black;
}
</style>
