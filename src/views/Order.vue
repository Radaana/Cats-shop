<template lang="pug">
  .order
    .order__empty
      .order__text Спасибо за заказ, котик очень рад!
      img.order__happy-cat(src="../assets/happy-cat.jpg")
      router-link.order__button(to="/") Выбрать что-нибудь еще
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Order',
  computed: {
    // mixing mapGetters with computed properties
    ...mapActions([
      'performOrder'
    ])
  },
  mounted () {
    this.$store.dispatch('performOrder')
  }
}
</script>

<style scoped lang="scss">

.order__empty {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order__text {
  margin-bottom: 40px;
  margin-top: 40px;
}

.order__happy-cat {
  width: 500px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 3px rgba(#808080, 0.2);
}

.order__button {
  display: block;
  background-color: #fff;
  border:3px solid #73b2d5;
  color: #73b2d5;
  border-radius: 10px;
  font-size: 1em;
  text-decoration: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 40px;

  &:hover, &:focus {
    background-color: #73b2d5;
    border:3px solid #73b2d5;
    color: #fff;
  }
}

</style>
