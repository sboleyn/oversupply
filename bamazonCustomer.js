// Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon'
});
 
connection.connect();

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
            message: 'Enter item ID of purchase: ',
            default: 1        
    }
],
        
        function( answers ) {
        // Use user feedback for... whatever!!
    });

  });

connection.end();