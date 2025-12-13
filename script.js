const BASE_URL = "https://my-json-server.typicode.com/RNB-CLUB/Store"
let main = document.querySelector("main")
let products = []

function getProducts() {
    fetch(BASE_URL + "/products")
        .then(async (res) => {
            let data = await res.json()
            console.log(data)
            products = data
            drawProducts()
            drawCart()
        })
}

getProducts()

function drawProducts() {
    main.innerHTML = ""
    products.forEach(p => {
        main.innerHTML += `
        <div class="product">
        <h3>${p.name}</h3>
        <a href="/seller.html?user_id=${p.seller_id}">SELLER PAGE</a>
        <p>${p.category}</p>
        <p>cost - ${p.price}</p>
        <p>${p.in_stock}</p> 
        <button onclick="addProductToCart(${p.product_id})">Buy</button>
        </div> `
    })
}

let cartButton = document.getElementById("cart")
let cart = document.querySelector(".cart")
let cartIsOpen = false
cartButton.addEventListener("click", function () {
    cartIsOpen = !cartIsOpen
    cart.style.display = cartIsOpen ? "flex" : "none"
})

let cartArray = []

function addProductToCart(product_id) {
    console.log(product_id)
    cartArray.push(product_id)
    localStorage.setItem("cart", JSON.stringify(cartArray))
    drawCart()
}

function drawCart() {
    if (cartArray.length == 0) {
        cart.innerHTML = ""
        return
    }
    let cartProducts = products.filter(p => cartArray.indexOf(p.product_id) > -1)
    cartProducts = cartProducts.map(p => ({
        ...p,
        count: cartArray.filter(prod => prod == p.id).length
    }))
    console.log(cartProducts)
    cart.innerHTML = cartProducts.map(p => `<li>${p.name} | $${p.price} | X${p.count}</li>`).join("")
    cart.innerHTML = `<p>Total: $${cartProducts.reduce((sum,p)=>sum +p.price * p.price, 0)}</p>`
    cart.innerHTML += "<button onclick='clearCart()'>Delete</button>"
}

function clearCart(){
    cartArray.length = 0
    localStorage.setItem("cart", "[]")
    drawCart();
}

cartArray = JSON.parse(localStorage.getItem("cart")) || []