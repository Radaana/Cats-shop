<template lang="pug">
  div#app
    header.header
      .header__pic
      h1.header__text The Cat's Book Shop
      cart-button.cart Корзина
    router-view
</template>

<script>
// @ is an alias to /src
import cartButton from '@/components/CartButton.vue'
// import goodsList from '@/components/GoodsList.vue'

export default {
  name: 'app',
  components: {
    cartButton
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 16px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  color: #523232;
}

.header {
  position: relative;
}

.header__pic {
  height: 300px;
  width: 100%;
  background-image: url("./assets/header.jpg");
  background-size: cover;
  background-position: center;
}

.header__text {
  font-size: 5rem;
  color: #523232;
  text-align: center;
  position: absolute;
  font-family: 'Monotype Corsiva', serif;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-weight: normal;
}

</style>
