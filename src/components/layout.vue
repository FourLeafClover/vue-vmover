<template>
<div class="layout">
  <div class="header">
    <van-tabbar :fixed='false'>
      <van-tabbar-item class="middle" :class="{ 'active':active === 1 }" @click="goto('/cates')">
        <span class="text">频道</span>
        <template slot="icon">
          <img src="@/assets/header/category.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="middle" @click="goto('/')" :class="{ 'active':active === 2 }">
        <span class="text">发现</span>
        <template slot="icon">
          <img src="@/assets/header/home.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="middle" :class="{ 'active':active === 3 }" @click="goto('/my')">
        <span class="text">我的</span>
        <template slot="icon">
          <img src="@/assets/header/user.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <van-icon name="search" v-if="false" @click="goto('/search')" />
  </div>
  <div class="layout-content">
    <slot></slot>
    <div class="bottom"></div>
  </div>
  <div @click="gotoSearch" v-if="search" >
      <van-search class="search" disabled  :style="styles"  placeholder="请输入搜索关键字" />
  </div>
</div>
</template>

<script>
export default {
  name: 'vLayout',
  props: {
    active: {
      type: Number,
      default: 1
    },
    search: false
  },
  created () {},
  methods: {
    goto (url) {
      this.$router.push(url)
    },
    gotoSearch () {
      this.$router.push('/search')
    }
  },
  computed: {
    styles () {
      let scrollTop = this.$store.state.app.scrollTop
      let _opacity = scrollTop < 600 ? 1 - scrollTop / 600 : 0
      return {
        opacity: _opacity
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  top: 10px;
  width: 100%;
  z-index: 9;
  background-color: rgba(0, 0, 0, .05) !important;
}

.layout {
  .header {
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: 10;
    background-color: white;
    box-shadow: 0px 2px 2px #c9c9c9;
    background-size: cover;
    .middle {
      img {
        height: 25px;
      }
      .text {
        display: block;
        padding-bottom: 5px;
        color: red;
      }
      &.active {
        img {
          height: 45px;
        }
        .text {
          display: none;
        }
      }
    }
    .big {
      img {
        height: 55px;
        margin-bottom: 5px;
      }
    }
    .van-icon-search {
      position: absolute;
      right: 20px;
      top: 10px;
      line-height: 50px;
      font-size: 20px;
    }
    .van-tabbar {
      background: none;
    }
    .van-tabbar {
      top: 0px;
      padding: 0 20px;
      box-sizing: border-box;
      margin: 0 auto;
    }
  }
  .layout-content {
    width: 100%;
    height: 100%;
    overflow: scroll;
    box-sizing: border-box;
    left: 0;
    top: 0;
    padding-bottom: 46px;
  }
}
</style>
