<template lang="pug">
  .item
    img.item__pic(src="../assets/book1.jpg"  :alt="item.name")
    h3.item__name {{item.name}}
    .item__author Автор: {{item.author}}
    .item__stock(v-if="item.stock") {{item.stock}} шт. на складе
    .item__stock.item__stock--off(v-if="!item.stock") Нет на складе
    .item__price {{item.price}} р.
    button.cart__add(v-if="!isInCart(item.id) && item.stock" @click="addToCart(item)") Добавить в корзину
        svg(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 510 510")
            g
              path(d="M153,408c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S181.05,408,153,408z M0,0v51h51l91.8,193.8L107.1,306c-2.55,7.65-5.1,17.85-5.1,25.5c0,28.05,22.95,51,51,51h306v-51H163.2c-2.55,0-5.1-2.55-5.1-5.1v-2.551l22.95-43.35h188.7c20.4,0,35.7-10.2,43.35-25.5L504.9,89.25c5.1-5.1,5.1-7.65,5.1-12.75c0-15.3-10.2-25.5-25.5-25.5H107.1L84.15,0H0z M408,408c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S436.05,408,408,408z")
    //- button.cart__add.cart__add--added(v-if="isInCart(item.id)")
    //-     svg(version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 512 512")
    //-         g
    //-           path(d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7C514.5,101.703,514.499,85.494,504.502,75.496z")
    .quantity.quantity--in-item(v-if="isInCart(item.id) && this.getQuantity(item.id) !== 0")
      button.quantity__button(
        v-if="this.getQuantity(item.id) !== 0"
        @click="changeQuantity(item.id, -1)"
        ) -
      .quantity__empty-button(
        v-if="this.getQuantity(item.id) == 0")
      span.quantity__number {{this.getQuantity(item.id)}}
      button.quantity__button(
        v-if="this.getQuantity(item.id) !== item.stock"
        @click="changeQuantity(item.id, 1)") +
      .quantity__empty-button(
        v-if="this.getQuantity(item.id) == item.stock")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'GoodsItem',
  props: {
    item: Object
  },
  computed: {
    // mixing mapGetters with computed properties
    ...mapGetters([
      'getCart',
      'getQuantityInCart'
    ]),
    ...mapActions([
      'addItemToCart',
      'changeQuantityInCart'
    ])
  },
  methods: {
    addToCart (item) {
      this.$store.dispatch('addItemToCart', item)
    },
    isInCart (itemID) {
      let cart = this.getCart
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === itemID) return true
      }
      return false
    },
    changeQuantity (itemID, number) {
      let payload = {
        itemID: itemID,
        number: number
      }
      this.$store.dispatch('changeQuantityInCart', payload)
    },
    getQuantity (itemID) {
      let quantity = this.$store.getters.getQuantityInCart(itemID)
      return quantity
    }
  }
}
</script>

<style scoped lang="scss">

.item {
    width: 250px;
    height: 350px;
    margin: 15px;
    padding: 5px 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;

    &:hover {
        box-shadow: 2px 2px 5px 3px rgba(#808080, 0.2);
    }
}

.item__pic {
  width: 150px;
  margin: 0 auto;
  display: block;
}

.item__name, .item__author {
  text-align: center;
}

.item__stock {
  text-align: right;
  margin-top: auto;

  &--off {
    color: rgba(#73b2d5, 1.0);
  }
}

.item__price {
  text-align: right;
  font-weight: bold;
  font-size: 1.5rem;
}

.cart__add {
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 5px;
  left: 10px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  fill: rgba(#73b2d5, 1.0);
  font-size: 0;

  &:hover, &:focus {
      border: 1px solid #73b2d5;
      border-radius: 10px;
  }

  &--added {
    &:hover, &:focus {
      border: 1px solid transparent;
      cursor: auto;
    }
  }
}

.quantity {
  display: flex;
  align-items: center;

  &--in-item {
    position: absolute;
    bottom: 5px;
    left: 10px;
  }
}

.quantity__number {
  flex-grow: 1;
  text-align: center;
  margin: 0 5px;
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

</style>
