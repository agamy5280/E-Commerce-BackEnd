<?php

namespace App\Http\Controllers;

use App\Mail\orderConfirmation;
use App\Models\Cart;
use App\Models\OrderDetails;
use App\Models\Orders;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrdersController extends Controller
{
    //
    function addOrder (Request $request) {
        try {
            $userID = $request->id;
            if (Auth::check() && Auth::user()->id == $userID) {
                if(User::find($userID)){
                    $user = User::find($userID);
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
                        $orderDetails = OrderDetails::join('products', 'products.id', '=', 'order_details.product_id')
                            ->select('products.title as name', 'order_details.quantity')
                            ->where('order_details.order_id', $order->id)
                            ->get();
                        $userData = [
                            'first_name' => $user->firstName,
                            'last_name' => $user->lastName,
                            'email' => $user->email,
                            'mobile_num' => $user->mobileNum,
                            'address1' => $user->address1,
                            'address2' => $user->address2,
                            'country' => $user->country,
                            'state' => $user->state,
                            'city' => $user->city,
                            'zip_code' => $user->zipCode
                        ];
                        $orderData = [
                            'subtotal' => $order->subtotal,
                            'shippingPrice' => $order->shipping,
                            'totalPrice' => $order->total_price
                        ];
                        Mail::to($user->email)->send(new orderConfirmation($userData, $orderDetails, $orderData));
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
