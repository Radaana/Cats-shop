<template lang="pug">
  .goods
    goods-item(
      v-for="item in this.getGoods"
      :key="item.id"
      :item="item"
    )
</template>

<script>
import { mapGetters } from 'vuex'
import goodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'GoodsList',
  components: {
    goodsItem
  },
  props: {
  },
  computed: {
    // mixing mapGetters with computed properties
    ...mapGetters([
      'getGoods'
    ])
  },
  created () {
  }
}
</script>

<style scoped lang="scss">

.goods {
  display: flex;
  flex-wrap: wrap;
}

</style>
