<template>
  <div class="main" :style="{ 'height':height+'px' }" style="background-color:black">
     <div class="search">
         <input type="search" name="keyword" v-model="keyword"  placeholder="请输入关键字查询" />
          <span class="btn" @click="gotosearch()">搜索</span>
     </div>
     <div class="hot">
         <h1>热门搜索</h1>
         <div class="keywords">
             <div v-for="key in hotkeywords" :key="key" @click="gotosearch(key)">
                 {{ key }}
             </div>
         </div>     
     </div>
  </div>
</template>
<script>
import vmover from "../service/vmover";
export default {
  data() {
    return {
      hotkeywords: ["NEW ERA", "秋天", "旅行", "科普", "青春", "电影", "温情"],
      historykeywords: [],
      height: document.documentElement.clientHeight,
      keyword: ""
    };
  },
  created() {
    document.title = "搜索|V电影";
    this.getPageData();
    this.initScroll();
  },
  methods: {
    initScroll() {
      window.onscroll = () => {
        let clientHeight = document.documentElement.clientHeight;
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        let offsetHeight = document.body.offsetHeight;
        if (this.$refs.loading) {
          if (scrollTop + clientHeight > offsetHeight - 30) {
            this.getPageData();
          }
        }
      };
    },
    getPageData(id) {
      if (this.isCanLoad) {
        this.isCanLoad = false;
        let id = id ? id : this.$route.query.id;
        this.$set(this.$data, "loadingword", "正在加载下一页");
        vmover.loadCateVideos(id, this.curPage, videos => {
          if (videos.length > 0) {
            videos.forEach(item => {
              this.videos.push(item);
            });
            this.$set(this.$data, "videos", this.videos);
            this.curPage += 1;
            setTimeout(() => {
              this.isCanLoad = true;
              this.$set(this.$data, "loadingword", "上拉加载下一页");
            }, 1000);
          } else {
            this.$set(this.$data, "loadingword", "亲,数据加载完毕了");
          }
        });
      }
    },
    gotosearch(key) {
      this.$router.push({
        name: "search",
        params: {
          keyword: key == undefined ? this.keyword : key
        }
      });
    }
  },
  watch: {
    $route(newvalue) {
      this.videos = [];
      this.curPage = 1;
      this.isCanLoad = true;
      this.getPageData(newvalue.query.id);
    }
  },
  activated() {
    document.title = "搜索|V电影";
    this.initScroll();
  }
};
</script>
<style scoped>
.search {
  padding: 20px;
}

.search .btn {
  width: 20%;
  border-radius: 10px;
  text-align: center;
  background-color: green;
  line-height: 30px;
  display: inline-block;
  padding: 5px;
  font-size: 18px;
}

input {
  width: 70%;
  margin: 0 auto;
  line-height: 30px;
  border-radius: 15px;
  padding: 5px;
  background: url("../assets/img/search.png") no-repeat left center;
  background-size: 20px 20px;
  background-position-x: 10px;
  background-color: white;
  padding-left: 40px;
  font-size: 18px;
}

input::-webkit-input-placeholder {
  color: gray;
}

input::-moz-placeholder {
  color: gray;
}

input:-ms-input-placeholder {
  color: gray;
}

.hot {
  padding: 0px 20px;
}

.hot h1 {
  font-weight: bold;
  font-size: 18px;
}

.hot .keywords {
  padding-top: 10px;
}

.keywords div {
  color: white;
  float: left;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: grey;
  word-spacing: 3px;
}
</style>