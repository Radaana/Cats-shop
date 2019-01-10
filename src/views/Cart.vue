<template lang="pug">
  .cart
    .cart__header
      h2.cart__title Корзина
      router-link.cart__button(to="/") Назад к выбору книг
      button.cart__button(v-if="this.getCart.length" @click="removeZeroQuantity" ref="zeroButton") Удалить с количеством 0
    .cart__table(v-if="this.getCart.length")
      .table
        .table__row
          .table__cell Номер
          .table__cell Название
          .table__cell Автор
          .table__cell Количество
          .table__cell Цена за шт.
          .table__cell Цена
        .table__row(v-for="(item, index) in this.getCart"
          :key="index")
          .table__cell {{index+1}}
          .table__cell {{item.name}}
          .table__cell {{item.author}}
          .table__cell
            .quantity
              button.quantity__button(
                v-if="item.quantity !== 0"
                @click="changeQuantity(item.id, -1)"
                ) -
              .quantity__empty-button(
                v-if="item.quantity == 0")
              span.quantity__number {{item.quantity}}
              button.quantity__button(
                v-if="item.quantity !== item.stock"
                @click="changeQuantity(item.id, 1)") +
              .quantity__empty-button(
                v-if="item.quantity == item.stock")
          .table__cell.table__cell--number {{item.price}} р.
          .table__cell.table__cell--number {{item.price*item.quantity}} р.
      .table__total
        p.table__amount Итого {{this.totalAmount}} рублей за {{this.totalQuantity}} {{this.books}}.
        p.table__VAT В стоимость покупки включен 20% НДС в размере {{VAT}} рублей
        router-link.cart__button(v-if="this.totalQuantity" to="/order") Оформить заказ
    .cart__empty(v-if="!this.getCart.length")
      .cart__text Корзина пуста, котик грустит.
      img.cart__sad-cat(src="../assets/sad-cat.jpg")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Cart',
  computed: {
    // mixing mapGetters with computed properties
    ...mapGetters([
      'getCart',
      'getTotalQuantity',
      'getTotalAmount'
    ]),
    ...mapActions([
      'removeItemsFromCart',
      'changeQuantityInCart'
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
    VAT () {
      let VAT = 0
      VAT = this.totalAmount / 120 * 20
      let roundedVAT = Math.round(VAT * 100) / 100
      return roundedVAT
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
  },
  methods: {
    changeQuantity (itemID, number) {
      let payload = {
        itemID: itemID,
        number: number
      }
      this.$store.dispatch('changeQuantityInCart', payload)
    },
    removeZeroQuantity () {
      this.$store.dispatch('removeItemsFromCart')
      this.$refs.zeroButton.blur()
    }
  }
}
</script>

<style scoped lang="scss">

.cart {
  padding: 20px;
  max-width: 990px;
  margin: 0 auto;
}

.cart__header {
  display: flex;
  align-items: center;
}

.cart__title  {
  margin-right: auto;
  margin-left: 40px;
}

.cart__button {
  background-color: #fff;
  border:3px solid #73b2d5;
  color: #73b2d5;
  border-radius: 10px;
  font-size: 1em;
  text-decoration: none;
  padding: 10px;
  margin-left: 20px;
  cursor: pointer;

  &:hover, &:focus {
    background-color: #73b2d5;
    border:3px solid #73b2d5;
    color: #fff;
  }
}

.table {
  display: table;
  padding: 20px;
  width: 100%;
  border-collapse: collapse;
}

.table__row {
  display: table-row;
}

.table__cell {
  display: table-cell;
  padding: 20px;
  border: 1px solid #73b2d5;

  &--number {
    min-width: 100px;
    text-align: right;
  }
}

.quantity {
  display: flex;
  align-items: center;
}

.quantity__number {
  flex-grow: 1;
  text-align: center;
}

.quantity__button {
  background-color: #fff;
  border: 1px solid #73b2d5;
  color: #73b2d5;
  border-radius: 5px;
  font-size: 1.5em;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover, &:focus {
    background-color: #73b2d5;
    border:1px solid #73b2d5;
    color: #fff;
  }
}

.quantity__empty-button {
  width: 30px;
  height: 18px;
  margin: 0;
}

.table__total{
  text-align: right;
}

.cart__empty {
  text-align: center;
}

.cart__text {
  margin-bottom: 40px;
}

.cart__sad-cat {
  border-radius: 10px;
  box-shadow: 2px 2px 5px 3px rgba(#808080, 0.2);
}
</style>
