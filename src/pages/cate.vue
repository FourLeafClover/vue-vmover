<template>
  <div class="main">
     <div class="item" v-for="cate in cates" :key="cate.orderid" v-if="cate.catename">
         <img :src="cate.icon"/>
         <div class="cover"></div>
         <div class="name">
             #{{cate.catename}}#
         </div>
         <div class="cover2" @click="gotoPage(cate.cateid)"></div>
         <router-link :to="{ path:'/cate/videos',query:{id:cate.cateid} }">       
         </router-link>
     </div>
     <div style="height:50px;width:100%;float:left;background-color:black"></div>
     <bottombar activeId="2" />
  </div>
</template>
<script>
import vmover from "../service/vmover";
import bottombar from "../component/bottombar";
export default {
  data() {
    return {
      cates: []
    };
  },
  components: {
    bottombar: bottombar
  },
  created() {
    document.title = "频道|V电影";
    vmover.loadCates(result => {
      this.$set(this.$data, "cates", result);
    });
  },
  methods: {
    gotoPage(cateid) {
      this.$router.push({ path: "/cate/videos", query: { id: cateid } });
    }
  },
  activated() {
    document.title = "频道|V电影";
  }
};
</script>
<style scoped>
.main {
  background-color: black;
}

.item {
  width: 50%;
  float: left;
  position: relative;
}

.item img {
  width: 100%;
}

.item .name {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  font-weight: bold;
  z-index: 2;
  display: inline-block;
  line-height: 20px;
  height: 20px;
  width: 100%;
  text-align: center;
}

.item .cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.5;
}

.item .cover2 {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  opacity: 0;
  z-index: 2;
}
</style>