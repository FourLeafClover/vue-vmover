<template>
  <div class="loading">
    <span>{{loadingWord}}</span>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      loadingWord: {
        type: String
      }
    },
    data() {
      return {};
    }
  };
</script>

<style scoped>
  .loading {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    background-color: black;
    color: white;
    letter-spacing: 3px;
  }
</style>