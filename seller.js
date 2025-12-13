const urlParams = new URLSearchParams(window.location.search)
let user_id = urlParams.get("user_id")
console.log(user_id)

const BASE_URL = "https://my-json-server.typicode.com/RNB-CLUB/Store"
let main = document.querySelector("main")

function getUsers() {
    fetch(BASE_URL + "/users?user_id=" + user_id)
        .then(async (res) => {
            let data = await res.json()
            data = data[0]
            document.querySelector(".seller h1").innerHTML = data.username
            document.querySelector(".seller h3").innerHTML = "Пошта:" + data.email
            document.querySelector(".seller h4").innerHTML = "#" + data.role
            console.log(data)
        })
}
function getProducts() {
    fetch(BASE_URL + "/products?user_id" + user_id)
        .then(async (res) => {
            let data = await res.json()
            console.log(data)
            drawProducts(data)
        })
}
function drawProducts(products) {
    main.innerHTML = ""
    products.forEach(p => {
        main.innerHTML += `
        <div class="product">
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>cost - ${p.price}</p>
        <p>${p.in_stock}</p> 
        </div> `
    })
}
getProducts()
getUsers()