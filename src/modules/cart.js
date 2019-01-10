let state = {
  cart: []
}

let getters = {
  getCart (state) {
    return state.cart
  },
  getQuantityInCart (state) {
    return itemID => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === itemID) {
          return state.cart[i].quantity
        }
      }
    }
  },
  getTotalQuantity (state) {
    return state.cart.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)
  },
  getTotalAmount (state) {
    return state.cart.reduce((accumulator, currentItem) => accumulator + currentItem.quantity * currentItem.price, 0)
  }
}

let mutations = {
  addItemToCart (state, item) {
    let itemWithQuantity = {
      ...item,
      quantity: 1
    }
    state.cart.push(itemWithQuantity)
  },
  removeItemsFromCart (state) {
    state.cart = state.cart.filter(item => item.quantity !== 0)
  },
  changeQuantityInCart (state, payload) {
    let { itemID, number } = payload
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].id === itemID) {
        state.cart[i].quantity += number
        if (state.cart[i].quantity === 0) state.cart = state.cart.filter(item => item.id !== state.cart[i].id)
      }
    }
  },
  performOrder (state, rootState) {
    let cart = state.cart
    cart.map(cartItem => {
      for (let i = 0; i < rootState.goods.goods.length; i++) {
        if (rootState.goods.goods[i].id === cartItem.id) {
          rootState.goods.goods[i].stock -= cartItem.quantity
        }
      }
    })
    state.cart = []
  }
}

let actions = {
  addItemToCart (context, item) {
    context.commit('addItemToCart', item)
  },
  removeItemsFromCart (context) {
    context.commit('removeItemsFromCart')
  },
  changeQuantityInCart (context, payload) {
    context.commit('changeQuantityInCart', payload)
  },
  performOrder ({ state, commit, rootState }) {
    commit('performOrder', rootState)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
