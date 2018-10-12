# Oversupply

## Overview
This is an Amazon-like store front CLI app. I titled the repo oversupply as it resonated better to me than Bamazon, but I kept with the Bamazon naming for the database. This app dispalys all items available for sale, asks the user to select the item and number of units they'd like to purchase, checks if the store has enough of the product, and then decides what to do next. If the purchase is successful, the customer is notified of the total price and the program closes. If the purchase is not successful because their isn't enough product to fill the order, the customer is notified and the shop reloads. If the purchase is not successful because the item selected by the customer does not exist in the shop, the customer is notified and the shop reloads.

### [Link to Screencastify](https://drive.google.com/file/d/1KcddaCs1S0VcMTcHJiC1PseTmLm1GbHh/view?usp=sharing)

#### Run the files as listed below to use Oversupply
* seeds.sql
  * run this file in MySQL workbench to create the bamazon database and produts table
  
* mockData.csv
  * import this into the products table in the bamazon database

* bamazonCustomer.js
  * run this from node in the command line