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
    loadManagerMenu();
})
function loadManagerMenu() {
    connection.query("Select * from products", function (err, res) {
        if (err) throw err

        loadManagerOptions(res);
    })
}
function loadManagerOptions(products) {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: " What would you like to do ?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
        .then(function (answers) {
            switch (answers.choice) {
                case "View Products for Sale": console.table(products);
                    loadManagerMenu();
                case "View Low Inventory": loweInventory(products);
                    break;
                case "Add to Inventory": addInventory(products);
                    break;
                case "Add New Product": addProdecut(products);
                    break;
                default: console.log("Good Byee")
                    process.exit(0);
                    break;

            }
        })
}

function loweInventory(products) {
    connection.query("Select * from products WHERE stock_quantity <=5 ", function (err, res) {
        if (err) throw err
        console.table(res);
        loadManagerMenu();
    })

}