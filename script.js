const toto = [ 
    {
        "id": 1,
        "name": "Karite  Avocat",
        "price": 3000,
        "image": "KAV.PNG"
    },
    {
        "id": 2,
        "name": "Karite Simple",
        "price": 3000,
        "image": "karitesimplemodifier.PNG"
    },
    {
        "id": 3,
        "name": "Karite Carotte",
        "price": 1000,
        "image": "carottebest.png"
    },
    {
        "id": 4,
        "name": "Karite cheveux",
        "price": 1500,
        "image": "karitepoussecheuveux reel.PNG"
    },
    {
        "id": 5,
        "name": "4 COTE",
        "price": 1000,
        "image": "4cotemodifier.png"
    },
    {
        "id": 6,
        "name": "NEP NEP",
        "price": 1000,
        "image": "NEPNEP2modifier.png"
    },
    {
        "id": 7,
        "name": "Feuille Djeka",
        "price": 1000,
        "image": "djekamodifier.png"
    },
    {
        "id": 8,
        "name": "Anis vert",
        "price": 4000,
        "image": "Anis vert.png"
    }
  ]

  let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");

let listProducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.remove("showCart");
});

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <div class="item">
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <div class="price">${product.price}FCFA</div>
          <button class="addCart">
            Add To Cart
          </button>
        </div>
      `;
      listProductHTML.appendChild(newProduct);

      newProduct
        .querySelector(".addCart")
        .addEventListener("click", () => addToCart(product.id));
    });
  }
};

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};



const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;

  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity += cart.quantity;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProducts[positionProduct];
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      newCart.innerHTML = `
        <div class="item" data-id="${info.id}">
          <div class="image">
            <img src="${info.image}" alt="${info.name}">
          </div>
          <div class="name">
            ${info.name}
          </div>
          <div class="totalPrice">
            ${info.price * cart.quantity} FCFA
          </div>
          <div class="quantity">
            <span class="minus" onclick="decreaseQuantity(${info.id})">-</span>
            <span>${cart.quantity}</span>
            <span class="plus" onclick="increaseQuantity(${info.id})">+</span>
          </div>
        </div>
      `;
      listCartHTML.appendChild(newCart);
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

const decreaseQuantity = (productId) => {
  updateQuantity(productId, -1);
};

const increaseQuantity = (productId) => {
  updateQuantity(productId, 1);
};

const updateQuantity = (productId, change) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == productId
  );

  if (positionThisProductInCart >= 0) {
    let newQuantity = carts[positionThisProductInCart].quantity + change;

    if (newQuantity > 0) {
      carts[positionThisProductInCart].quantity = newQuantity;
      addCartToHTML();
    }
  }
};

/*const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
        totalQuantity = totalQuantity + cart.quantity;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProducts[positionProduct];
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      newCart.innerHTML = `
        <div class="item" data-id="${info.id}">
          <div class="image">
            <img src="${info.image}" alt="${info.name}">
          </div>
          <div class="name">
            ${info.name}
          </div>
          <div class="totalPrice">
            ${info.price * cart.quantity}FCFA
          </div>
          <div class="quantity">
            <span class="minus">-</span>
            <span>${cart.quantity}</span>
            <span class="plus">+</span>
          </div>
        </div>
      `;
      listCartHTML.appendChild(newCart);
    });
  }
  iconCartSpan.innerText = totalQuantity;
};*/

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
      let product_id = positionClick.parentElement.getAttribute('data-id'); 
      let type = 'minus';
      if (positionClick.classList.contains('plus')) {
        type = 'plus'; 
      }
      changeQuantity(product_id, type);
    }
  });
  

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id); 
    if (positionItemInCart >= 0) {
      switch (type) {
        case 'plus':
          carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
          break;
        default:
          let valueChange = carts[positionItemInCart].quantity - 1;
          if (valueChange > 0) {
            carts[positionItemInCart].quantity = valueChange;
          } else {
            carts.splice(positionItemInCart, 1);
          }
          break;
      }
    }
    addCartToMemory();
    addCartToHTML();
  }
  

const initApp = () => {
  listProducts = toto;
  addDataToHTML();

  if(localStorage.getItem('cart')){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    addCartToHTML();
  }
};

initApp();
