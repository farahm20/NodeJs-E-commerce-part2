import { getCartItems } from "./cart.js";


/***************Getting the products from database */

async function getAllProducts() {
    const url = 'http://localhost:8000/TechShop/getproducts';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

let Products;

async function getProducts() {
    Products = await getAllProducts();
    displayProducts(Products);
}

getProducts();

/**************Getting CArt itemsfrom database */
let cartItems;
async function getAllCart() {
    cartItems = await getCartItems();
    console.log(cartItems);
}

getAllCart();

/** Function called when we want to add item in cart */

async function addItemToCart(prodId) {
    console.log(prodId);
    let url = `http://localhost:8000/TechShop/add/?id=${prodId}`;
    let response = await fetch(url, { method: 'POST' });
    let data = await response.json();
    return data;
};

/**Displaying products in html */
function displayProducts(Products) {
    console.log(Products);
    const containerElem = document.querySelector('.allproducts');
    //    containerElem.innerHTML = '';
    let cartItemsCount = 0;
    let checkProductID = 0;

    for (let product of Products) {

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
    
        if (cartItems != 0) {
            console.log("cart not empty");

            for (let cartItem of cartItems) {
                checkProductID = parseInt(cartItem.id);
                console.log("comparing", checkProductID);
                console.log("with : ", product.id);
                let prodId = parseInt(product.id);

                if (checkProductID === prodId) {
                    console.log("item already in cart");
                    addToCartButton.innerHTML = "ITEM ALREADY IN CART";
                    addToCartButton.disabled = true;
                }
            }
        }



        article.appendChild(prodName);
        article.appendChild(prodPrice);
        article.appendChild(addToCartButton);

        productCard.appendChild(article);
        containerElem.appendChild(productCard);

        /**Since my if consition will not work if the cart is empty i have to place a check here. */
        
      /* 
        addToCartButton.addEventListener("click", () => {
            addItemToCart(product.id);
            addToCartButton.innerHTML = "ITEM IN CART";

        });*/
/*
                if (cartItems != 0) {
                    console.log("cart not empty");
        
                    for (let cartItem of cartItems) {
                        checkProductID = parseInt(cartItem.id);
                        console.log("comparing", checkProductID);
                        console.log("with : ", product.id);
                        let prodId = parseInt(product.id);
        
                        if (checkProductID === prodId) {
                            console.log("item already in cart");
                            addToCartButton.innerHTML = "ITEM ALREADY IN CART";
                            addToCartButton.disabled = true;
                        }
                    }
                }
                */
                addToCartButton.addEventListener("click", () => {
                    console.log("adding click to addtocartbutton");
                    addItemToCart(product.id);
                    addToCartButton.innerHTML = "ITEM IN CART";
                });

        //
    }
}

document.querySelector('.getProducts').addEventListener('click', async() => {
    location.reload(true);
});
