const db = require('./database-operations');

module.exports = (app) => {

    app.get('/TechShop/', (request, response) => {
        response.send('<h1> Enjoy Shopping </h1>');
    });

    //--------------------------------------------POST: add a specific product ------------------------------------------- */
    //http://localhost:8000/TechShop/add/?id=1
    app.post('/TechShop/add', (req, res) => {
        const searchTerm = req.query.id;
        //console.log(req.url);
        //console.log(searchTerm);
    //    res.send('In add item to cart endpoint....');
        let obj = db.addItemInCart(searchTerm);
  /*      let obj = {
            message: 'Adding item in cart....'        
         }*/
         res.send(JSON.stringify(obj));
         return obj;
    })

    //-------------------------------------------DELETE: remove a specific product ------------------------------------------- */
    //http://localhost:8000/TechShop/removeItem/?id=1
    app.delete('/TechShop/removeItem', (req, res) => {
        const itemToDelete = req.query.id;
        console.log(req.url);
        console.log(itemToDelete);
    //    res.send('At item to delete from cart endpoint....');
        db.deleteItemFromCart(itemToDelete);
        let obj = {
            message: 'Removing item from cart....'
         }
         res.send(JSON.stringify(obj));
         console.log(obj);
    })

    //-------------------------------------------DELETE: delete teh whole cart ------------------------------------------- */
    //http://localhost:8000/TechShop/deleteAllCart
    app.delete('/TechShop/deleteAllCart/', (req, res) => {
        let allCartItems = req.params.id;
        console.log('At Cart delete endpoint....');
        console.log(allCartItems);
        db.deleteCart(allCartItems);
        res.send(allCartItems);
    });


    //------------------------------------------- GET: get all of the products ------------------------------------------- */
    //http://localhost:8000/TechShop/getProducts
    app.get('/TechShop/getproducts', (req, res) => {
        let allProducts = db.getProducts();
        res.send(JSON.stringify(allProducts));
        
        console.log('At get Products end point....');
    });

    //-------------------------------------------GET: get all Cart items ------------------------------------------- */
    //http://localhost:5000/TechShop/getCartItems
    app.get('/TechShop/getCartItems', (req, res) => {
        let allCartItems = db.getCartItems();
        res.send(JSON.stringify(allCartItems));
        
        console.log('At get Cart Items endpoint....');
    });


    //all get or post functions will come here
}