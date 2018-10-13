// Then create a Node application called `oversupplyCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'oversupply'
});

connection.connect();

var startPurchase = function () {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;

        results.forEach(element => {
            // console.log("\n");
            console.log("--------------------------------------------------------------------------");
            console.log("Item ID: " + element.item_id);
            console.log("Name: " + element.product_name);
            console.log("Price: $" + element.price);
            console.log("--------------------------------------------------------------------------");
        });
        // 2. Prompt the user with 2 messages 
        // ---the ID of the product of purchase
        // ---how many units of product of purchase

        inquirer.prompt([
            {
                type: 'input',
                name: 'purchaseID',
                message: 'Enter item ID of purchase: '
            },
            {
                type: 'input',
                name: 'units',
                message: 'How many units?: ',
                default: 1
            }
        ]).then(answers => {
            // console.log(answers);

            // 3. Check if store has enough product
            // ---No? say "Insufficient quantity!" and prevent order
            // ---Yes? update db and then show customer cost
            var chosen = answers.purchaseID;
            var numUnits = answers.units;

            connection.query('SELECT stock_quantity FROM products WHERE item_id = ' + chosen, function (error, results, fields) {
                // console.log(results[0] == undefined);
                if (error) throw error;

                if (!(results[0] == undefined)) {
                    var inStock = results[0].stock_quantity;
                    // console.log(inStock);

                    if (numUnits > inStock) {
                        console.log("Insufficient quantity!");

                        setTimeout(function () {
                            startPurchase();
                        }, 3000);

                    }

                    else if (numUnits <= inStock) {
                        connection.query('SELECT price, product_name FROM products WHERE item_id= ' + chosen, function (error, results, fields) {
                            var unitPrice = results[0].price;
                            var prodName = results[0].product_name;
                            var totalPrice = unitPrice * numUnits;
                            console.log("The total price for " + numUnits + ' units of ' + prodName + ' will cost $' + totalPrice);
                            connection.query('UPDATE products SET stock_quantity = ' + (inStock - numUnits) + ' WHERE item_id = ' + chosen, function (error, results, fields) {
                                console.log("Thank you for your purchase!");

                                setTimeout(function () {
                                    connection.end();
                                }, 3000);
                                
                            });
                        });
                    }

                    // connection.end();
                }
                else {
                    console.log("There doesn't seem to be an item with this item_id in our inventory.");
                    setTimeout(function () {
                        startPurchase();
                    }, 3000);
                }

            });
        });

    });
};
startPurchase();
// connection.end();