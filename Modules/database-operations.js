const lowdb = require ('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = lowdb(adapter);

exports.initiateDatabase = () => {
    const hasDatabase = database.has('Products').value();

    if(!hasDatabase){
        database.defaults({ products: [] }).write();
    }
};

exports.getProducts = () => {
    return database.get('Products').value();
}

exports.getCartItems = () => {
    return database.get('Cart').value();
}


//-------------------------------------------FIND ITEM IN CART------------------------------------------- */
//This function is only used in the functions.js. So no need to export it.
function findItemInCart(itemToFind){
    const findInCart = database.get('Cart').find({ id: itemToFind}).value();
    //console.log(findInCart);
    return findInCart;
}


//-------------------------------------------ADD ITEM TO CART------------------------------------------- */
exports.addItemInCart = (searchTerm) => {
    let count = 0;
    let itemtoAdd = parseInt(searchTerm);
    //console.log(itemtoAdd);

    /* DISPLAY: error message if you try to add a product that does not exist.*/
    const matchProduct = database.get('Products').find({ id: itemtoAdd }).value();
    //console.log(matchProduct);
    if(matchProduct === undefined){
        alertMessage = {
            status : 'ERROR', message : "Invalid product ID. Enter correct ID. " };
            console.log(alertMessage);
    }else{
        alertMessage = {
            status : 'SUCCESS', message : "Valid ID. Item found in Products. "
        }
        console.log(alertMessage);
        count += 1;

    /* NOT ADD THE SAME PRODUCT TO CART CHECK */     
    const checkInCartItem = findItemInCart(itemtoAdd);//find item in cart
    
    if(checkInCartItem !== undefined){
        alertMessage = { 
            status : 'ERROR', message : "Item already present in Cart" };
            console.log(alertMessage);
    }else{
        database.get('Cart').push(matchProduct).write();
        
        alertMessage = {
            status : 'SUCCESS', message : "Item added in the Cart"};
            console.log(alertMessage);
        }
    }   
    
    return alertMessage;
}
 
//-------------------------------------------DELETE ITEM FROM CART------------------------------------------- */
exports.deleteItemFromCart = (itemToDelete) => {
    let removeItem= parseInt(itemToDelete);
    //console.log(removeItem);

    const checkInCartItem = findItemInCart(removeItem);//find item in cart
    //console.log(checkInCartItem);

    if(checkInCartItem !== undefined){
        database.get('Cart').remove(checkInCartItem).write();
        alertMessage = {
            status : 'SUCCESS', message : "Item removed from Cart" };
            console.log(alertMessage);
    }else{
        alertMessage = {
            status : 'ERROR', message : "Invalid request- Item not found in cart" };
        console.log(alertMessage);
    }    
}

exports.deleteCart = (allCartItems) => {
    database.get('Cart').remove(allCartItems).write();
    console.log('Cart deleted succesfully');
}
