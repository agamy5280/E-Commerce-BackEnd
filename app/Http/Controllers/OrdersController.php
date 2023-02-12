<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\OrderDetails;
use App\Models\Orders;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrdersController extends Controller
{
    //
    function addOrder (Request $request) {
        try {
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                if(User::find($userID)){
                    if(Cart::all()->where('user_id', $userID)){
                        $cartItems = Cart::all()->where('user_id', $userID);
                        // Creating new record of order
                        $order = new Orders;
                        // adding those values by body
                        $order->user_id = $userID;
                        $order->total_price = $request->total_price;
                        $order->subtotal = $request->subtotal;
                        $order->shipping = $request->shipping;
                        $order->save();
                        foreach($cartItems as $item) {
                            // Creating new record of orderDetails which depends on the count of order
                            $orderDetail = new OrderDetails;
                            $orderDetail->order_id = $order->id;
                            $orderDetail->product_id = $item->product_id;
                            $orderDetail->quantity = $item->quantity;
                            $orderDetail->save();
                        }
                        return response()->json(['message' => 'Order created successfully'], 201);
                    } else {
                        return response()->json(['message' => 'User cart is empty!'], 404);
                    }
                } else {
                    return response()->json(['message' => 'User not found'], 404);
                }
            } else {
                return response()->json(['message' => 'You are not authorized to add order'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        } 
    }
    function displayOrdersByID (Request $request) {
        try {
            if(User::find($request->id)) {
                $userID = $request->id;
                if (Auth::check() && Auth::user()->id == $userID) {
                    $userID = $request->id;
                    $orders = Orders::where('user_id', $userID)->with('orderDetails')->first();
                    if ($orders) {
                        return response()->json([$orders, 'message' => 'Displaying Orders successfully'], 200);
                    } else {
                    return response()->json(['message' => 'No orders found'], 404);
                    }
                } else {
                    return response()->json(['message' => 'You are not authorized to view this order'], 401);
                }
                
            } else {
                return response()->json(['message' => 'User not found'], 404);  
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while displaying the orders'], 500);
        }
    }
    function displayAllOrders (Request $request) {
        // get all orders
        $orders = Orders::with('orderDetails')->get();
        return response()->json([$orders, 'message' => 'Displaying Orders successfully'], 200);
    }
}
