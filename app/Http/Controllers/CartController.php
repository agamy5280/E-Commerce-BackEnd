<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CartController extends Controller
{
    //
    function addProductToCart(Request $request) {
        try {
            if (User::find($request->user_id) && Products::find($request->product_id)) {
                $cartItem = new Cart;
                $existingCartProduct = Cart::all()->where('user_id', $request->user_id)->where('product_id', $request->product_id)->first();
                if($existingCartProduct) {
                    $existingCartProduct->quantity++;
                    $existingCartProduct->save();
                    return response()->json(['message' => 'Cart item duplicated, Quantity++'], 201);
                } else {
                    $cartItem->fill($request->post());
                    $cartItem->save();
                    return response()->json(['message' => 'Cart item added successfully'], 201);
                }
            } else {
                return response()->json(['message' => 'User or product not found'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the cart item'], 500);
        }      
    }
    function displayCartItems(Request $request) {
        try{
            if(User::find($request->id)){
                $userID = $request->id;
                $cartItems = Cart::where('user_id', $userID)->get();
                foreach($cartItems as $cartItem) {
                    $product = Products::where('id', $cartItem->product_id)->first();
                    $product['quantity'] = $cartItem->quantity;
                    $products[] = $product;
                }
                return response()->json([
                    'products' => $products,
                    'message' => 'Cart has been displayed'
                ], 200);
            } else {
                return response()->json(['message' => 'User not found'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while displaying the cart items'], 500);
        }
    }
    function editCartItems(Request $request) {
        $actionQuantity = $request->query('actionQuantity');
        try {
            if(User::find($request->id) && Products::find($request->query('productID')) && $actionQuantity != null) {
                $userID = $request->id;
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
            if(!User::find($request->id)) return response()->json(['message' => 'User not found'], 400);
            if(!Products::find($request->query('productID'))) return response()->json(['message' => 'Product ID not found'], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while editing the cart items'], 500);
        }
    }
    function deleteCartItem(Request $request) {
        $productID = $request->query('productID');
        if(!Products::find($request->query('productID'))) {
            return response()->json(['message' => 'Product ID not found'], 400);
        }
        try {
            $cartItem = Cart::where('user_id', $request->id)->where('product_id', $productID)->first();
            if($cartItem) {
                $cartItem->delete();
                return response()->json(['message' => 'Cart item has been deleted'], 200);
            } else {
                return response()->json(['message' => 'Cart item not found'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the cart item'], 500);
        }
    }
}
