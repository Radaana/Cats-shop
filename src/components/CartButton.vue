<template lang="pug">
  .button__box
    router-link.button__link(to="/cart") Корзина
    span.button__text(v-if="this.totalQuantity !== 0")  {{this.totalAmount}} р. за {{this.totalQuantity}} {{this.books}}.
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartButton',
  props: {
    item: Object
  },
  computed: {
    ...mapGetters([
      'getCart',
      'getTotalQuantity',
      'getTotalAmount'
    ]),
    totalAmount () {
      let totalAmount = 0
      if (this.getCart.length) {
        totalAmount = this.getTotalAmount
      }
      return totalAmount
    },
    totalQuantity () {
      let totalQuantity = 0
      if (this.getCart.length) {
        totalQuantity = this.getTotalQuantity
      }
      return totalQuantity
    },
    books () {
      switch (this.totalQuantity) {
        case 1:
          return 'книгу'
        case 2:
        case 3:
        case 4:
          return 'книги'
        default:
          return 'книг'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.button__box {
  position: absolute;
  top: 25px;
  right: 50px;
  color: #fff;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.button__text {
  margin-top: 10px;
  font-weight: bold;
}

.button__link {
  flex-grow: 0;
  padding: 10px;
  border-radius: 10px;
  border: 3px solid #fff;
  background-color: transparent;
  text-decoration: none;
  color: #fff;

  &:hover, &:focus {
    background-color: #fff;
    border:3px solid #ffffff;
    color: #73b2d5;
  }
}
</style>
