<template lang="pug">
  nav.filters
    h2.filters__title Категории
    ul.filters__list
      li.filters__item(
        v-for="(item, index) in this.getCategories"
        :key="item"
        @click="changeCurrentCategory(+index)"
        :class="{ 'filters__item--active' : +index === getCurrentCategory}")
          .filters__name {{item}}
          .filters__amount {{getAmount[index]}}
    h2.filters__title Фильтры
    ul.filters__list
      li.filters__item(
        @click="changeStatusIsInStock()"
        :class="{ 'filters__item--active' : getIsInStock }"
      ) Только в наличии
      li.filters__item(
        @click="changeCurrentSortByPrice(1)"
        :class="{ 'filters__item--active' : getSortByPrice === 1 }"
      ) По возрастанию цены
      li.filters__item(
        @click="changeCurrentSortByPrice(-1)"
        :class="{ 'filters__item--active' : getSortByPrice === -1 }"
      ) По убыванию цены
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FiltersMenu',
  computed: {
    // mixing mapGetters with computed properties
    ...mapGetters([
      'getCategories',
      'getCurrentCategory',
      'getIsInStock',
      'getSortByPrice',
      'getAmount'
    ]),
    ...mapActions([
      'changeCategory',
      'changeIsInStock',
      'changeSortByPrice'
    ])
  },
  methods: {
    changeCurrentCategory (catNum) {
      this.$store.dispatch('changeCategory', catNum)
    },
    changeCurrentSortByPrice (sortType) {
      let dispatchSortType = sortType
      // let currentSortType = this.$store.getters.getSortByPrice
      let currentSortType = this.getSortByPrice
      if (sortType === currentSortType) {
        dispatchSortType = 0
      }
      this.$store.dispatch('changeSortByPrice', dispatchSortType)
    },
    changeStatusIsInStock () {
      this.$store.dispatch('changeIsInStock')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filters__title {
  text-align: center;
}

.filters__list {
  list-style: none;
  cursor: pointer;
  padding: 0px 10px;
}

.filters__item {
  padding: 10px 0px;
  display: flex;
  &:hover, &--active, &:focus {
    font-weight: bold;
    color: #fff;
  }
}

.filters__amount {
  margin-left: auto;
}
</style>
