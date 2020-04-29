
export async function getCartItems() {

    const url = 'http://localhost:8000/TechShop/getCartItems';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

let cartItems;

async function getAllCart () {
    cartItems = await getCartItems();
    console.log(cartItems);
    displayCartItems(cartItems);
}

getAllCart();

function displayCartItems(cartItems) {
    console.log(cartItems);
    const containerElem = document.querySelector('.allCartItems');
    containerElem.innerHTML = '';

    for(let cartItem of cartItems){
        
        let itemCard = document.createElement("div");//card
        itemCard.classList.add("itemCard");
        itemCard.setAttribute('id', cartItem.id);
        let itemCardId = cartItem.id;
        
        let itemImage = document.createElement("img");//img
        itemImage.classList.add("itemImage");
        itemImage.src = cartItem.image;
        
        itemCard.appendChild(itemImage);
        
        let article = document.createElement('article');
        article.classList.add("itemText");
        let itemName = document.createElement("h1");//p
        itemName.classList.add("itemName");
        itemName.innerText = cartItem.name;
        
        let itemPrice = document.createElement("p");//itemPrice
        itemPrice.classList.add("itemPrice");
        itemPrice.innerText = cartItem.price + " Kr";

        let removeFromCartButton = document.createElement("button");//addbutton
        removeFromCartButton.classList.add("productButton");
        removeFromCartButton.innerHTML = "REMOVE FROM CART";

        article.appendChild(itemName);
        article.appendChild(itemPrice);
        article.appendChild(removeFromCartButton);

        itemCard.appendChild(article);
        containerElem.appendChild(itemCard);
        
        removeFromCartButton.addEventListener('click', async() => {
        //    console.log("in the remove from cart button")
        //    console.log("Item id: ", itemCardId);
        //    let id = parseInt(itemCardId);
           let value = removeCartItem(itemCardId);
        //   console.log("retruned from removeCartItem ",value);
           itemCard.remove(); 
            //can i call the function here 
        });
  }
}


async function removeCartItem (itemCardId) {
 //   console.log( "In the remove cart item " ,itemCardId);
 try{
    let url = `http://localhost:8000/TechShop/removeItem/?id=${itemCardId}`;
    let response = await fetch(url, { method: 'DELETE' });
    let data = await response.json();
    return data;
 }catch (error){
     console.log("Error");
 }

};
