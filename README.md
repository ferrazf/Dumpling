# SOSFood

## About the Project
SOSFood is a food-ordering application web application built with Node.js, Express, AJAX, Twilio API, jQuery, HTML5, CSS3 and PosgreSQL.

### Problem Statement

An application built to simplify online food ordering for pickup.

### Expected Usage

Expected users are restaurant owners and customers:

- Restaurant owners will recieve a SMS when an order is placed.
  - The owners can send a SMS with estimated preparation time to notify customers.
  - The owners can check the informtation and status of each order.

- Customers can order from the restaurant menu online.
  - They will be notified when the order has been accepted and how long it will take.
  - They will be notified when the order is ready for pickup.


## Getting Started
Install all dependencies using the `npm install` command.

Setup the database:
  - Run `knex migrate:latest` in your terminal.
  - Optional: Set up dummy-data by running `knex seed:run` in your terminal.

Run the development web server using the 'npm start' command.

Setup twilio and ngrok
  - Sign up in twilio and ngrok to require authorization tokens and account sid. 
  - Use twilio to send and receive message. 
  - Use ngrok to open the localhost port for twilio webhook to receive message. 


### Dependencies
- dovenv 4.0.0 or above
- express 4.15.3 or above
- morgan 1.8.2 or above
- node 5.10.x or above
- pg 7.0.2 or above
- twilio 3.5.0 or above

## Screenshots 

!["Screenshot of index page"](https://github.com/ferrazf/Dumpling/blob/master/screenshots/index.jpg)

!["Screenshot of menu page"](https://github.com/ferrazf/Dumpling/blob/master/screenshots/menu.jpg)

!["Screenshot of contact us page"](https://github.com/ferrazf/Dumpling/blob/master/screenshots/contact_us.jpg)

!["Screenshot of log in page"](https://github.com/ferrazf/Dumpling/blob/master/screenshots/view_order_login.jpg)

!["Screenshot of view order page"](https://github.com/ferrazf/Dumpling/blob/master/screenshots/view_order.jpg)

## Known Issues 

- Login page is demonstrational 

## To be implemented 

- Add REACT front end
- Implement login and registration to owner page
- Manage orders directly from the orders page
- Allow clients to view the status of their order on the website
- Host the app on a public domain


