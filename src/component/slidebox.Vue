<template>
    <div class="slide_box">
        <div class="slide" ref="slider">
            <div class="slide-group" ref='slideGroup'>
                <slot>
                </slot>
            </div>
            <div class="dots">
                <span class="dot" :class="{dotActive: (currentPageIndex) === index }" v-for="(item, index) in dots" :key="index"></span>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    this.setSliderWidth();
    this.init();
    if (this.autoPlay) {
      this.play();
    }
  },
  methods: {
    setSliderWidth() {
      this.children = this.$refs.slideGroup.children;
      this.dots = new Array(this.children.length);
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        width += sliderWidth;
      }
      if (this.loop) {
        width += 2 * sliderWidth;
      }
      this.$refs.slideGroup.style.width = width + "px";
    },
    init() {
      var vm = this;
      // 实例化scroll
      this.scroll = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, //关闭或者打开惯性运动的执行
        snap: true, //隔断（翻页）
        snapLoop: this.loop, //无限滚动
        snapThreshold: 0,
        snapSpeed: 400, //滑动的时间
        click: true
      });
      this.scroll.on("scrollEnd", () => {
        let pageIndex = this.scroll.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        if (vm.autoPlay) {
          vm.play();
        }
      });
      this.scroll.on("beforeScrollStart", () => {
        if (vm.autoPlay) {
          clearTimeout(vm.timer);
        }
      });
    },
    play() {
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        pageIndex += 1;
      }
      var vm = this;
      this.timer = setTimeout(() => {
        vm.scroll.goToPage(pageIndex, 0, 400); //跳转到的页数 初始化页数 滑动总时间
      }, vm.interval);
    }
  }
};
</script>

<style>
.slide {
  width: 100%;
  overflow: hidden;
  height: 190px;
  position: relative;
}
.slide-group {
  height: 150px;
  background: red;
}
.slide-group .slider-item {
  width: 100vw;
  height: 150px;
  background: yellowgreen;
  float: left;
}
.slide-group .slider-item:nth-type-of(1) {
  background: red;
}
.dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  text-align: center;
}
.dots .dot {
  background: rgba(255, 255, 255, 0.5);
  display: inline-block;
  margin: 0 4px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
}
.dots .dot.dotActive {
  width: 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
}
</style>