const inquirer = require("inquirer")
const mysql = require("mysql");

require("console.table")


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "zaid1981",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) {
        console.log("err connecting:" + err.stack);
    }
    console.log("connected to mysql");
    loadProducts();
})

function loadProducts() {
    connection.query("Select * from products", function (err, res) {
        if (err) throw err
        //console.log(res)
        console.table(res)
        promptCustomerForItem(res);
    })
}

function promptCustomerForItem(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: " What is the id of the item you would like to buy ?",
            validate: function (val) {
                return !isNaN(val) || val.toLoerCase() === "q";
            }
        }
    ])
        .then(function (answers) {
            
            const choiceId = parseInt(answers.choice);
            const product = checkInventory(choiceId, inventory);
            if (product) {
                promptCustomerForQuantity(product);
            }
            else {
                console.log("\n The item is not in the inventory")
                loadProducts();
            }
        })
}
function checkInventory(choiceId, inventory) {
    
    for (let i = 0; i < inventory.length; i++) {
        
        if (choiceId === inventory[i].item_id) {
            console.log("item id found: " +inventory[i])
            return inventory[i];
        }
    }
    return null;
    
}
function promptCustomerForQuantity(product) {

    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?",
            validate: function (val) {
                return val > 0 || val.toLoerCase() === "q";
            }
        }
    ])
        .then(function (answers) {
            const quantity = parseInt(answers.quantity);
            if (quantity > product.stock_quantity) {
                console.log("\n INsufficient Quantity")
                loadProducts();
            }
            else {
                makePurchase(product, quantity)
            }

        })

}

function makePurchase(product, quantity){
    connection.query(
        "UPDATE PRODUCTS SET stock_quantity = stock_quantity - ?  WHERE item_id =?", [quantity, product.item_id], function(err, res){
            console.log("\n successfully purchased " +quantity + " " +product.product_name );
            loadProducts();
        }
    )
}
