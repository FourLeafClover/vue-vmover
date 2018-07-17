<template>
<div id="app">
  <transition :name="transitionName">
    <keep-alive :exclude="exclude">
      <router-view ref="view" class="router-view"></router-view>
    </keep-alive>
  </transition>
  <van-icon name="upgrade" :style="topBarStyles" class="gotoTop" @click="gotoTop"></van-icon>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      exclude: '',
      topBarBottom: 0
    }
  },
  methods: {
    gotoTop () {
      document.getElementsByClassName('layout-content')[0].scrollTo(0, 0)
    }
  },
  computed: {
    topBarStyles () {
      let scrollTop = this.$store.state.app.scrollTop
      let display = scrollTop > 600 ? 'block' : 'none'
      return {
        display: display,
        bottom: `${this.topBarBottom}px`
      }
    }
  },
  watch: {
    $route (to, from, savedPosition) {
      let _vue = this
      if (from.name == null) {
        setTimeout(() => {
          let view = document.getElementsByClassName('layout-content')[0]
          view.onscroll = () => {
            _vue.$store.dispatch('CHANGE_SCROLLTOP', view)
          }
        }, 1000)
      }
      if (to.name !== 'detail') {
        document.title = '小视频大世界'
      }
      let view = document.getElementsByClassName('layout-content')[0]
      if (from.meta.cache) {
        this.$store.dispatch('ADD_POSITION', {
          name: from.name,
          position: view.scrollTop
        })
      } else {
        this.$store.dispatch('ADD_POSITION', {
          name: from.name,
          position: 0
        })
      }
      if (!to.meta.cache) {
        this.exclude = to.name
      }
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-none'
      }
      this.$nextTick(function () {
        let scrollTop = _vue.$store.getters.getCurPosition(to.name)
        let views = document.getElementsByClassName('layout-content')
        let view = views[views.length - 1]
        view.scrollTo(0, scrollTop)
        _vue.$store.dispatch('CHANGE_SCROLLTOP', view)
        view.onscroll = () => {
          _vue.$store.dispatch('CHANGE_SCROLLTOP', view)
        }
      })
      this.topBarBottom = to.meta.topBarBottom
    }
  }
}
</script>

<style lang="scss">
.router-view {
  width: 100vw;
  overflow-y: scroll;
  height: 100vh;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}

.slide-none-leave-active .slide-none-enter-active {
  transform: all 0;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.gotoTop {
  position: fixed !important;
  right: 20px;
  bottom: 60px;
  z-index: 999;
  color: white;
  font-size: 30px !important;
  transition: all 0.5s;
  display: none;
}
</style><style>
html,
body,
div,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
dl,
dt,
dd,
ol,
form,
input,
textarea,
th,
td,
select {
  margin: 0;
  padding: 0;
}

div {
  -webkit-overflow-scrolling: touch;
}
div,
video,
img {
  outline-width: 0px;
  vertical-align: top;
}
#app {
  position: relative;
}
</style>
