# ECommerce: Simple Front-End application
This is a simple E-Commerce Front-End project using Angular, bootstrap. The application loads products, categories from external API and displays them. Users have the ability to click or search any product/category of products to get more information about the selected product details. Inaddition, Users can add, Delete to/from the cart and wishlist using Local Storage as this application is only front-end based and the external API does not have the feature of adding, deleting, updating the cart, users, products; also user can sign in or mock register request.
# Project Intent
The aim of this project is to test my ability to convert templetes of HTML, CSS codes using the correct created components and with the help of external API to produce a dynamic single application project using Angular; However, the main goal is learning how to write clean code, maintain website, design architecture, how to organize components and services and finally to be more knowledgeable about Angular.
# Features
| Feature | Implemented? | Description
| :--- | :---: | :---: |
| List Products | ✔ | User have the ability to browse all products.
| List Categories | ✔ | User have the ability to view all categories.
| Sign In | ✔ | User have the ability to sign in with existing username and password provided by external API.
| Logout | ✔ | User have the ability to Logout.
| Register Mock | ✔ | Register mock request.
| Search Products | ✔ | Searching for a specific product using Search Bar.
| Filter Products By Category | ✔ | Products can be filterd by selecting a specific category.
| Filter All Products By Stock | ✔ | Products can be sorted from low to high or high to low according to their stock quantity.
| Filter All Products By Price | ✔ | Products can be sorted from low to high or high to low according to their price.
| Filter All Products By Best Rating | ✔ | Products can be sorted from high to low according to their rating.
| Breadcrumbs | ✔ | Dynamic breadcrumbs that changes according to user intent.
| Add Product to Cart | ✔ | User can add any product to cart (Local Storage).
| Inc/Dec Quantity of Product from Cart | ✔ | User can increase or decrease quantity of a specific product in cart (Local Storage).
| Remove Product from Cart | ✔ | User can remove any product from cart (Local Storage).
| Cart Summary | ✔ | Ability to see updated subtotal price, shipping cost and total price of the cart.
| Add Product to WishList | ✔ | User can add any product to WishList (Local Storage).
| Remove Product from WishList | ✔ | User can remove any product from WishList (Local Storage).
| Mock Checkout | ✔ | Retreive user data from API and selected products from Cart (Local Storage).
| Auth Guard | ✔ | User must be logged in to add product to cart, wishlist and to access shopping cart, checkout and contact pages.

# Live Demonstration

Home Pages:

![homepage1](https://user-images.githubusercontent.com/79969562/217333070-88911b53-2887-4803-baca-8dde5047962c.JPG)

![homepage2](https://user-images.githubusercontent.com/79969562/217333130-960f84e6-85df-4f64-9235-37958310a381.JPG)

![homepage3](https://user-images.githubusercontent.com/79969562/217333129-3544df90-e5ee-42c5-87ec-5e0073ec70de.JPG)

![homepage4](https://user-images.githubusercontent.com/79969562/217333131-410d2926-ec80-4375-bb73-b0266bba2e35.JPG)

Shop Page:

![shoppage](https://user-images.githubusercontent.com/79969562/217333347-4d97b9e1-106b-4e4a-9745-005667e226b7.JPG)

![shoppage2](https://user-images.githubusercontent.com/79969562/217333352-bdab9c26-a08a-435a-9d05-7b83abacc653.JPG)

![shoppage3](https://user-images.githubusercontent.com/79969562/217333358-63a27b94-eac8-44c2-962e-3f66b4ea7b50.JPG)

![shoppage4](https://user-images.githubusercontent.com/79969562/217333366-de0b263d-b347-4202-8d02-61f59aa9b4ad.JPG)


Login Page:

![login](https://user-images.githubusercontent.com/79969562/217334088-da52b4b9-de23-4c03-818e-0d18f03bad3e.JPG)

Register Page:

![register](https://user-images.githubusercontent.com/79969562/217334318-1565daff-65f8-491a-9ccb-dc35bb6b05b3.JPG)

Shopping Cart:

![shoppingcart](https://user-images.githubusercontent.com/79969562/217333491-f32b00e0-404b-4dc0-a093-1d436de97f93.JPG)


WishList:

![wishlist](https://user-images.githubusercontent.com/79969562/217334266-51de0b4e-ca7e-4246-9504-e04c902aae2c.JPG)


Checkout Page:

![checkout](https://user-images.githubusercontent.com/79969562/217334386-fec045b7-c239-45b5-bcf6-cf032f6d3732.JPG)

Contact Page:

![contact](https://user-images.githubusercontent.com/79969562/217334451-c5fc0653-ecad-4149-9588-dd7a03747156.JPG)

Footer:

![footer](https://user-images.githubusercontent.com/79969562/217334488-2d91f616-b827-4f9b-aa3d-1ae40614bc55.JPG)

# Getting Started
To get started by simply clone this repo and install the dependencies

Clone E-Commerce repo using git:
```
git clone https://github.com/agamy5280/E-commerce-Website.git
```
Install the dependencies:
```
npm install
```
Run Application
```
ng serve
```
This project is uploaded on github pages, You can access this project via this link [E-Commerce](https://agamy5280.github.io/E-commerce-Website/)
# Sign in

To unlock this application maximum features please sign in using provided username and password which is created by [dummyjson.com](https://dummyjson.com/users) API
or simply use these
```
username: kminchelle
```
```
password: 0lelplR
```

# Tech Stack

* [Angular](https://angular.io/)
* [Bootstrap](https://getbootstrap.com/)

# Credit

1. [HTML codex](https://htmlcodex.com/)
2. [DummyJson](https://dummyjson.com/)

# Notes

Please feel free to comment your thoughts, modifications, issues as this will help me greatly achiving my main goal of improving my coding skills and my knowledge of Angular. 
