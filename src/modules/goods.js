let state = {
  goods: [
    {
      id: 1,
      name: 'Совершенный Кот',
      author: 'С. Макконнелл',
      price: 900,
      category: 1,
      stock: 3,
      pic: '../assets/book1.jpg'
    },
    {
      id: 2,
      name: 'Кот Да Винчи',
      author: 'Д. Браун',
      price: 450,
      category: 0,
      stock: 4,
      pic: ''
    },
    {
      id: 3,
      name: 'Кот. Тайный язык информатики',
      author: 'Ч. Петцольд',
      price: 860,
      category: 1,
      stock: 5,
      pic: ''
    },
    {
      id: 4,
      name: 'Кот-детектив',
      author: 'Б. Шарикович',
      price: 400,
      category: 2,
      stock: 2,
      pic: ''
    },
    {
      id: 5,
      name: 'DevCats',
      author: 'Л. Лионелл',
      price: 880,
      category: 1,
      stock: 1,
      pic: ''
    },
    {
      id: 6,
      name: 'Вперед мой кот',
      author: 'П. Трачетт',
      price: 320,
      category: 3,
      stock: 3,
      pic: ''
    },
    {
      id: 7,
      name: 'Таинстренный разум кота',
      author: 'Д. Берсел',
      price: 510,
      category: 3,
      stock: 3,
      pic: ''
    },
    {
      id: 8,
      name: 'Убийтво в кошачьем домике',
      author: 'А. Кристи',
      price: 310,
      category: 2,
      stock: 3,
      pic: ''
    },
    {
      id: 9,
      name: 'Кот и нож',
      author: 'А. Кристи',
      price: 230,
      category: 2,
      stock: 7,
      pic: ''
    },
    {
      id: 10,
      name: 'Мои усы',
      author: 'Ж. Бор',
      price: 120,
      category: 3,
      stock: 2,
      pic: ''
    },
    {
      id: 11,
      name: 'Мои уши',
      author: 'Ж. Бор',
      price: 220,
      category: 3,
      stock: 2,
      pic: ''
    },
    {
      id: 12,
      name: 'Нос, барбос и великолепный кот',
      author: 'М. Котдивуар',
      price: 480,
      category: 2,
      stock: 0,
      pic: ''
    }
  ],
  categories: {
    0: 'Все книги',
    1: 'Программирование',
    2: 'Художественная',
    3: 'Саморазвитие',
    4: 'Кулинария'
  },
  currentCategory: 0,
  sortByPrice: 0,
  isInStock: false
}

let getters = {
  getGoods (state) {
    let goodsList = []
    if (state.currentCategory === 0) {
      goodsList = state.goods
    } else {
      goodsList = state.goods.filter(item => item.category === state.currentCategory)
    }
    if (state.isInStock) {
      goodsList = goodsList.filter(item => item.stock !== 0)
    }
    if (state.sortByPrice) {
      switch (state.sortByPrice) {
        case 1:
          goodsList.sort((a, b) => b.price - a.price)
          console.log(`sortes`)
          break
        case -1:
          goodsList.sort((a, b) => a.price - b.price)
          break
      }
    }
    return goodsList
  },
  getAmount (state) {
    let numbers = []
    let all = 0
    for (let i in state.categories) {
      numbers[i] = 0
    }
    state.goods.map(item => {
      numbers[item.category]++
      all++
    })
    numbers[0] = all
    return numbers
  },
  getCategories (state) {
    return state.categories
  },
  getCurrentCategory (state) {
    return state.currentCategory
  },
  getSortByPrice (state) {
    return state.sortByPrice
  },
  getIsInStock (state) {
    return state.isInStock
  }
}

let mutations = {
  changeCategory (state, category) {
    state.currentCategory = category
  },
  changeIsInStock (state) {
    state.isInStock = !state.isInStock
  },
  changeSortByPrice (state, sortType) {
    state.sortByPrice = sortType
  }
}

let actions = {
  changeCategory (context, category) {
    context.commit('changeCategory', category)
  },
  changeIsInStock (context) {
    context.commit('changeIsInStock')
  },
  changeSortByPrice (context, sortType) {
    context.commit('changeSortByPrice', sortType)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
