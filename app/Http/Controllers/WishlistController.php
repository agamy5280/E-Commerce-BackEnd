<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class WishlistController extends Controller
{
    //
    function addProductToWishlist(Request $request) {
        try {
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                // Query params productID for selecting specific product to add
                if (User::find($userID) && Products::find($request->productID)) {
                    $wishlist = new Wishlist;
                    $existingWishlistProduct = Wishlist::all()->where('user_id', $userID)->where('product_id', $request->productID)->first();
                    if($existingWishlistProduct) {
                        return response()->json(['message' => 'Wishlist item duplicated'], 201);
                    } else {
                        $wishlist->fill($request->post());
                        $wishlist->user_id = $userID;
                        $wishlist->save();
                        return response()->json(['message' => 'Wishlist item added successfully'], 201);
                    }
                } else {
                    return response()->json(['message' => 'User or product not found'], 404);
                }
            } else {
                return response()->json(['message' => 'You are not authorized to add Wishlist item'], 403);
            }
        } catch(\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the wishlist item'], 500);
        }
    }
    function displayWishlistItems(Request $request) {
        try {
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                if(User::find($userID)){
                    $wishlists = Wishlist::where('user_id', $userID)->get();
                    // getting each product details by productID and adding them in array of products to be displayed
                    foreach($wishlists as $wishlist) {
                        $product = Products::where('id', $wishlist->product_id)->first();
                        $products[] = $product;
                    }
                    return response()->json([
                        'products' => $products,
                        'message' => 'Wishlist has been displayed'
                    ], 200);
                } else {
                    return response()->json(['message' => 'User not found'], 404);
                }
            } else {
                return response()->json(['message' => 'You are not authorized to display this Wishlist'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while displaying the wishlist item'], 500);
        }
    }
    function deleteWishlistItem(Request $request) {
        $productID = $request->query('productID');
        if(!Products::find($request->query('productID'))) {
            return response()->json(['message' => 'Product ID not found'], 404);
        }
        try {
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                $wishlist = Wishlist::where('user_id', $userID)->where('product_id', $productID)->first();
                if($wishlist) {
                    $wishlist->delete();
                    return response()->json(['message' => 'wishlist item has been deleted'], 200);
                } else {
                    return response()->json(['message' => 'wishlist item not found'], 404);
                }
            } else {
                return response()->json(['message' => 'You are not authorized to delete this wishlist item'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the wishlist item'], 500);
        }
    }
}
