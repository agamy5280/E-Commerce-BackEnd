# ECommerce: Simple Back-End application

This is a simple E-Commerce Back-End project using Laravel. Users have the ability to register new account and activation mail is sent to user's email for verification (Please register with a valid email). Users have the ability to login, edit their profile and view their previous orders. Inaddition, Users can add, Delete to/from the cart and wishlist. The application loads products, categories from DB and displays them. When placing new order, a confirmation mail is sent to the user's email. The application is continuation of [Front-End](https://github.com/agamy5280/E-commerce-Website), but due to hosting limitation, Application will only run locally.

# Project Intent
The aim of this project is to test my ability to build backend laravel applications using correct approaches. My goals are learning how to write clean code, design architecture, authentication, giving permissions and to be more knowledgeable about Laravel.

# Features
| Feature | Implemented? | Description
| :--- | :---: | :---: |
| List Products | ✔ | User have the ability to browse all products.
| List Categories | ✔ | User have the ability to view all categories.
| Search Products | ✔ | Searching for a specific product.
| Filter Products By Category | ✔ | Products can be filterd by selecting a specific category.
| Filter Products By Stock | ✔ | Products can be sorted from low to high or high to low according to their stock quantity.
| Filter Products By Price | ✔ | Products can be sorted from low to high or high to low according to their price.
| Filter Products By Best Rating | ✔ | Products can be sorted from high to low according to their rating.
| Filter Products By Brand | ✔ | Products can be filterd by selecting a specific Brand.
| Register | ✔ | User have the ability to register.
| Account Verification | ✔ | A verification email is sent to user's email upon registration using SMTP.
| Sign In | ✔ | User have the ability to sign in with existing username and password.
| Access Token | ✔ | Access Token is generated when user log in.
| Refresh Token | ✔ | Refresh Token is generated and updated when user log in.
| Access Token Refresh | ✔ | Access Token is refreshed when expired.
| Logout | ✔ | User have the ability to Logout.
| Edit Profile | ✔ | Users can edit their profile informations.
| Display Previous Orders | ✔ | Displaying previous user's orders.
| Add Product to Cart | ✔ | User can add any product to cart.
| Inc/Dec Quantity of Product from Cart | ✔ | User can increase or decrease quantity of a specific product in cart.
| Remove Product from Cart | ✔ | User can remove any product from cart.
| Add Product to Wishlist | ✔ | User can add any product to wishlist.
| Remove Product from Wishlist | ✔ | User can remove any product from wishlist.
| Place Order | ✔ | Users can place orders.
| Confirmation Order Email | ✔ | Confirmation email is sent to user's email when placing new order using SMTP.
| Authentication and Permissions | ✔ | Only authenticated user can view their order, cart, wishlist giving he has the permission to make do so.

# Live Demonstration

Verification Mail:

![Verification mail](https://user-images.githubusercontent.com/79969562/219662672-f0531f19-b977-45fc-8262-2b8fa5e7a2ae.JPG)

Confirmation Order Email:

![order confirmation](https://user-images.githubusercontent.com/79969562/219662819-ec9a6cf0-f8c9-425a-878c-47ff2a916198.JPG)

For more live Demonstration please Check this [Front-End](https://github.com/agamy5280/E-commerce-Website).

# Tech Stack

* [Laravel](https://laravel.com/)

# Front-End

The modified [Front-End](https://github.com/agamy5280/E-commerce-Website) is added to this repo. Disclaimer: Work in progress.

# Future Modification

1. Hosting project files.
2. Complete the integration between Front and Back ends.

# Notes

Please feel free to comment your thoughts, modifications, issues as this will help me greatly achiving my main goal of improving my coding skills and my knowledge of Laravel.
