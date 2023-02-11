<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\User;
class WishlistController extends Controller
{
    //
    function addProductToWishlist(Request $request) {
        try {
            if (User::find($request->user_id) && Products::find($request->product_id)) {
                $wishlist = new Wishlist;
                $existingWishlistProduct = Wishlist::all()->where('user_id', $request->user_id)->where('product_id', $request->product_id)->first();
                if($existingWishlistProduct) {
                    return response()->json(['message' => 'Wishlist item duplicated'], 201);
                } else {
                    $wishlist->fill($request->post());
                    $wishlist->save();
                    return response()->json(['message' => 'Wishlist item added successfully'], 201);
                }
            } else {
                return response()->json(['message' => 'User or product not found'], 400);
            }
        } catch(\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the wishlist item'], 500);
        }
    }
    function displayWishlistItems(Request $request) {
        try {
            if(User::find($request->id)){
                $userID = $request->id;
                $wishlists = Wishlist::where('user_id', $userID)->get();
                foreach($wishlists as $wishlist) {
                    $product = Products::where('id', $wishlist->product_id)->first();
                    $products[] = $product;
                }
                return response()->json([
                    'products' => $products,
                    'message' => 'Wishlist has been displayed'
                ], 200);
            } else {
                return response()->json(['message' => 'User not found'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while displaying the wishlist item'], 500);
        }
    }
    function deleteWishlistItem(Request $request) {
        $productID = $request->query('productID');
        if(!Products::find($request->query('productID'))) {
            return response()->json(['message' => 'Product ID not found'], 400);
        }
        try {
            $wishlist = Wishlist::where('user_id', $request->id)->where('product_id', $productID)->first();
            if($wishlist) {
                $wishlist->delete();
                return response()->json(['message' => 'wishlist item has been deleted'], 200);
            } else {
                return response()->json(['message' => 'wishlist item not found'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the wishlist item'], 500);
        }
    }
}
