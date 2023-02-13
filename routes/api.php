<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WishlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('categories', [CategoriesController::class, 'getCategories']);

Route::group(['prefix' => 'products'], function () {
    Route::get('search', [ProductsController::class, 'getProductsBySearch'])->name('search')->where('q', '[A-Za-z]+');    
    Route::get('', [ProductsController::class, 'getAllProducts']);
    Route::get('{id}', [ProductsController::class, 'getProductByID']);
});
Route::group(['prefix'=>'user'], function() {
    Route::post('/register', [UsersController::class, 'register']);
    Route::post('/login', [UsersController::class, 'login']);
    Route::get('verify/{verificationToken}', [UsersController::class, 'verifyEmail']);
});
Route::middleware('auth:sanctum')->prefix('/cart')->group(function () {
    Route::post('add/{id}', [CartController::class, 'addProductToCart']);
    Route::get('display/{id}', [CartController::class, 'displayCartItems']);
    Route::put('edit/{id}/product', [CartController::class, 'editCartItems'])->name('product')->where('q', '[A-Za-z0-9]+');
    Route::delete('delete/{id}/product', [CartController::class, 'deleteCartItem'])->name('product')->where('q', '[0-9]+');
});
Route::middleware('auth:sanctum')->prefix('/wishlist')->group(function () {
    Route::post('add/{id}', [WishlistController::class, 'addProductToWishlist']);
    Route::get('display/{id}', [WishlistController::class, 'displayWishlistItems']);
    Route::delete('delete/{id}/product', [WishlistController::class, 'deleteWishlistItem'])->name('product')->where('q', '[0-9]+');
});
Route::middleware('auth:sanctum')->prefix('/orders')->group(function () {
    Route::post('add/{id}', [OrdersController::class, 'addOrder']);
    Route::get('display/{id}', [OrdersController::class, 'displayOrdersByID']);
});
Route::middleware('auth:sanctum')->prefix('/user')->group(function () {
    Route::patch('/edit/{id}', [UsersController::class, 'edit']);
    Route::post('/refresh', [UsersController::class, 'refresh']);
    Route::get('/logout/{id}', [UsersController::class, 'logout'])->name('logout');
});
Route::middleware(['auth:sanctum', 'can:isAdmin'])->prefix('/admin')->group(function () {
    Route::get('displayAll', [OrdersController::class, 'displayAllOrders']);
});



