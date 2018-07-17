<template>
<w-back-layout :title='title' right-text="清空" @click-right="clear">
  <van-list :loading="isNextpageLoading" loading-text="视频加载中" @load="loadItems">
    <div class="items">
      <v-video-item :item="item" v-for="(item,key) in items" :key="key"></v-video-item>
      <v-end v-show="isLoadComplete"></v-end>
      <v-empty v-show="isLoadComplete&&this.allItems.length==0"></v-empty>
    </div>
  </van-list>
</w-back-layout>
</template>

<script>
import { getViewHistory, clearViewHistory } from '@/api/storage'
export default {
  name: 'catedetail',
  activated () {
    this.allItems = getViewHistory()
    this.title = `历史记录[${this.allItems.length}]条`
  },
  data () {
    return {
      allItems: [],
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
        let res = this.loadItemPage(this.page)
        if (res) {
          this.items.push(...res)
        }
        this.isNextpageLoading = false
        this.page += 1
        if (this.items.length === this.allItems.length) {
          this.isLoadComplete = true
        }
      }
    },
    loadItemPage (page) {
      let result = []
      for (
        let index = (page - 1) * 10;
        index < page * 10 && index < this.allItems.length;
        index++
      ) {
        result.push(this.allItems[index])
      }
      return result
    },
    gotoTopic (id) {
      this.$router.push(`/detail/${id}`)
    },
    clear () {
      clearViewHistory()
      this.items = []
    }
  },
  watch: {
    '$route.params.cateid' (value) {
      if (value) {
        if (value !== this.cateId) {
          this.$destroy()
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
    margin-bottom: 2px;
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
