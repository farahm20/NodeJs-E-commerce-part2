import { getCartItems } from "./cart.js";

const addProdButton = document.querySelector(".productButton");
let cartItems;
async function getAllProducts() {
    const url = 'http://localhost:8000/TechShop/getproducts';

    const response = await fetch(url);
    const data = await response.json();
   
    return data;
}
async function getAllCart () {
    cartItems = await getCartItems();
    console.log(cartItems);
}

getAllCart();


function displayProducts(Products) {
    console.log(Products);
    console.log(cartItems);

 //   const cartItems = await getCartItems();
//    console.log(cartItems);

//    const image = Products;
    const containerElem = document.querySelector('.allproducts');
    containerElem.innerHTML = '';

    for(let product of Products){
        
        let productCard = document.createElement("div");//card
        productCard.classList.add("productCard");
        productCard.setAttribute('id', product.id);
        
        let prodImage = document.createElement("img");//img
        prodImage.classList.add("prodImage");
        prodImage.src = product.image;
        
        productCard.appendChild(prodImage);
        
        let article = document.createElement('article');
        article.classList.add("prodText");
        let prodName = document.createElement("h1");//p
        prodName.classList.add("prodName");
        prodName.innerText = product.name;
        
        let prodPrice = document.createElement("p");//prodPrice
        prodPrice.classList.add("prodPrice");
        prodPrice.innerText = product.price + " Kr";

        let addToCartButton = document.createElement("button");//addbutton
        addToCartButton.classList.add("productButton");
        addToCartButton.innerHTML = "ADD TO CART";

        article.appendChild(prodName);
        article.appendChild(prodPrice);
        article.appendChild(addToCartButton);

        productCard.appendChild(article);
        containerElem.appendChild(productCard);

        /**
         * add an eventlistener on productButton 
         * add item in cart
         * compare product id with already items in cart carts is. 
         * remove event listener if product alredy in cart an eventlistener on button
         */
        let theId;
        addToCartButton.addEventListener("click", () => {
            theId = addItemToCart(product.id);
            console.log(theId);
        });
    }
}

document.querySelector('#getProducts').addEventListener('click', async() => {
    const Products = await getAllProducts();
    displayProducts(Products);
});

/*
async function addItemToCart(prodId){
    console.log(prodId);
    let obj = { id: prodId};
    let url = "http://localhost:8000/TechShop/add";
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(obj)
      });
    const data = await response.json();
    console.log(data);
    return data;
}
*/

/*
let cartItems;
async function getAllProducts() {
    const url = 'http://localhost:8000/TechShop/getproducts';

    const response = await fetch(url);
    const data = await response.json();
   
    return data;
}
async function getAllCart () {
    cartItems = await getCartItems();
    console.log(cartItems);
}

getAllCart();*/

/**
 * Get the button for add to cart
 * when button clicked link to URL
 * check if item is not already in cart
 */