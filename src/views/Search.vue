<template>
<div class="search back">
  <div class="header">
    <form action="/">
      <van-search ref="search" v-model.trim="value" placeholder="请输入搜索关键字" show-action @search="onSearch" @cancel="onCancel" />
    </form>
  </div>
  <div class="content">
    <van-list :loading="isNextpageLoading" loading-text="视频加载中" @load="loadItems" v-if="isShowList">
      <div class="items">
        <v-video-item :item="item" v-for="(item,key) in items" :key="key"></v-video-item>
        <v-end v-show="isLoadComplete&&(this.items.length>0)"></v-end>
        <v-empty v-show="isLoadComplete&&(this.items.length==0)&&(this.value!='')"></v-empty>
      </div>
    </van-list>
    <div class="history" v-if="hot.length>0 && items.length==0">
      <div class="title">
        热门搜索
      </div>
      <div class="list">
        <div class="item" v-for="(item,key) in hot" :key="key" @click="search(item)">
          {{item}}
        </div>
      </div>
    </div>
    <div class="history" v-if="history.length>0 && items.length==0">
      <div class="title">
        搜索历史
        <span class="clear" @click="clear">清空记录</span>
      </div>
      <div class="list">
        <div class="item" v-for="(item,key) in history" :key="key" @click="search(item)">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { search } from '@/api/api'
import {
  setSearchHistory,
  getSearchHsitory,
  clearSearchHistory
} from '@/api/storage'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      page: 1,
      items: [],
      isShowList: false,
      isNextpageLoading: false,
      isLoadComplete: false,
      history: [],
      hot: [
        '夏天',
        '旅行',
        '爱情',
        '科普',
        '青春',
        '电影',
        '燃',
        '温情',
        '情怀',
        '五星推荐',
        '励志',
        '世界杯',
        'C罗'
      ]
    }
  },
  activated () {
    this.history = getSearchHsitory()
  },
  methods: {
    search (keyword) {
      this.value = keyword
      this.onSearch()
    },
    onSearch () {
      this.isShowList = true
      this.items = []
      this.isLoadComplete = false
      this.isNextpageLoading = false
      this.page = 1
      if (this.history.indexOf(this.value) < 0) {
        this.history = [this.value, ...this.history]
        setSearchHistory(this.value)
      }
      this.loadItems()
    },
    loadItems () {
      if (!this.isLoadComplete) {
        this.isNextpageLoading = true
        search(this.value, this.page, res => {
          if (res.length < 20) {
            this.isLoadComplete = true
          }
          this.page++
          if (res) {
            this.items.push(...res)
          }
          this.isNextpageLoading = false
        })
      }
    },
    onCancel () {
      this.isShowList = false
      this.items = []
      this.isLoadComplete = false
      this.isNextpageLoading = false
      this.$router.history.go(-1)
    },
    clear () {
      clearSearchHistory()
      this.history = []
    }
  },
  watch: {
    value () {
      if (this.value === '') {
        if (this.items.length > 0) {
          this.items = []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &.back {
    .van-search {
      background-color: black;
      .van-search__cancel {
        color: white;
      }
    }
  }
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .content {
    padding-top: 50px;
    .items {
      background-color: black;
    }
    .history {
      padding: 5px;
      box-sizing: border-box;
      .title {
        font-size: 12px;
        color: gray;
        margin-bottom: 10px;
        position: relative;
        .clear {
          position: absolute;
          right: 20px;
          top: 0px !important;
          height: 20px;
        }
      }
      .list {
        display: inline-table;
        .item {
          padding: 5px 10px;
          font-size: 12px;
          background-color: #333;
          color: white;
          border-radius: 5px;
          float: left;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
