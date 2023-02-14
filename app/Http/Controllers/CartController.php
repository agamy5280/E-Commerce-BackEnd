<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class CartController extends Controller
{
    //
    function addProductToCart(Request $request) {
        try {
            $userID = $request->id;
            $productID = $request->productID;
            if (Auth::check() && Auth::user()->id == $userID) {
                // Query params productID for selecting specific product to add
                if (User::find($userID) && Products::find($productID)) {
                    $cartItem = new Cart;
                    $existingCartProduct = Cart::all()->where('user_id', $userID)->where('product_id', $productID)->first();

                    // Checking if product already in cart
                    if($existingCartProduct) {
                        $existingCartProduct->quantity++;
                        $existingCartProduct->save();
                        return response()->json(['message' => 'Cart item duplicated, Quantity++'], 201);
                    } else {
                        $cartItem->user_id = $userID;
                        $cartItem->product_id = $productID;
                        $cartItem->quantity = 1;
                        $cartItem->save();
                        return response()->json(['message' => 'Cart item added successfully'], 201);
                    }
                } else {
                    return response()->json(['message' => 'User or product not found'], 404);
                }
            } else {
                 return response()->json(['message' => 'You are not authorized to add product to this cart'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }        
    }
    function displayCartItems(Request $request) {
        try{
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                if(User::find($userID)){
                    $cartItems = Cart::where('user_id', $userID)->get();
                    // getting each product details by productID and adding them in array of products to be displayed
                    foreach($cartItems as $cartItem) {
                        $product = Products::where('id', $cartItem->product_id)->first();
                        $product['quantity'] = $cartItem->quantity;
                        $products[] = $product;
                    }
                    return response()->json([
                        'products' => $products,
                        'count' => count($products),
                        'message' => 'Cart has been displayed'
                    ], 200);
                } else {
                    return response()->json(['message' => 'User not found'], 404);
                }
            } else {
                return response()->json(['message' => 'You are not authorized to display this cart'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while displaying the cart items'], 500);
        }
    }
    function editCartItems(Request $request) {
        try {
            // Query params actionQuantity for inc or dec quantity of a selected product
            $actionQuantity = $request->query('actionQuantity');
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                // Query params productID for selecting specific product to edit
                if(User::find($userID) && Products::find($request->query('productID')) && $actionQuantity != null) {
                    $productID = $request->query('productID');
                    $selectedProduct = Cart::all()->where('user_id', $userID)->where('product_id', $productID);
                    $selectedProduct = $selectedProduct->first();
                    if($actionQuantity == 'inc'){
                        $selectedProduct->quantity++;
                        $selectedProduct->save();
                        return response()->json(['message' => 'Quantity of product has been modified'], 202);
                    } elseif($actionQuantity == 'dec') {
                        if($selectedProduct->quantity > 1){
                            $selectedProduct->quantity--;
                            $selectedProduct->save();
                        } else {
                            return response()->json(['message' => 'Quantity is minimum'], 400);
                        }
                        return response()->json(['message' => 'Quantity of product has been modified'], 202);
                    } else {
                        return response()->json(['message' => 'Action is wrong or not determined!'], 500);
                    }
                } 
                if(!User::find($userID)) return response()->json(['message' => 'User not found'], 404);
                if(!Products::find($request->query('productID'))) return response()->json(['message' => 'Product ID not found'], 404);
            } else {
                return response()->json(['message' => 'You are not authorized to edit this cart'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while editing the cart items'], 500);
        }
    }
    function deleteCartItem(Request $request) {
        // Query params productID for selecting specific product to delete
        $productID = $request->query('productID');
        if(!Products::find($request->query('productID'))) {
            return response()->json(['message' => 'Product ID not found'], 404);
        }
        try {
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                $cartItem = Cart::where('user_id', $userID)->where('product_id', $productID)->first();
                if($cartItem) {
                    $cartItem->delete();
                    return response()->json(['message' => 'Cart item has been deleted'], 200);
                } else {
                    return response()->json(['message' => 'Cart item not found'], 404);
                }
            } else {
                return response()->json(['message' => 'You are not authorized to delete this cart item'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the cart item'], 500);
        }
    }
}
