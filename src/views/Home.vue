<template lang="pug">
  .home
    .content
      aside
        filters-menu
      main.goods
        goods-list
    footer.footer
    //- <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
// @ is an alias to /src
import filtersMenu from '@/components/FiltersMenu.vue'
import goodsList from '@/components/GoodsList.vue'

export default {
  name: 'home',
  components: {
    filtersMenu, goodsList
  }
}
</script>

<style lang="scss">

*, *::before, *::after {
    box-sizing: border-box;
}

html, body, .home, {
  width: 100%;
  height: 100%;
  min-width: 880px;
}

.home {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  //; height: 100%;
  flex-grow: 1
}

aside {
  width: 250px;
  background-color: rgba(#73b2d5, 0.5);
  border-radius: 10px;
  margin: 15px;
  box-shadow: 0 0 5px 5px rgba(#808080, 0.2);
  flex-shrink: 0;
}

</style>
