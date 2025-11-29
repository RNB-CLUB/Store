const BASE_URL = "https://my-json-server.typicode.com/RNB-CLUB/Store"
let main = document.querySelector("main")
let products = []


function getProducts(){
    fetch(BASE_URL + "/products")
    .then(async(res)=>{
        let data = await res.json()
        console.log(data)
        products = data
        drawProducts()
    })
}
function drawProducts(){
    main.innerHTML = ""
    products.forEach(p=>{
        main.innerHTML += `
        <div class="product">
        <h3>${p.name}</h3>
        <a href="/seller/${p.seller_id}">SELLER PAGE</a>
        <p>${p.category}</p>
        <p>cost - ${p.price}</p>
        <p>${p.in_stock}</p> 
        </div> `
    })
}

getProducts()

