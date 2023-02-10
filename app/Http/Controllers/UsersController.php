<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;


class UsersController extends Controller
{
    //
    function register(Request $request) {
        // return $request;
        $request->validate(User::$rules);
        $user = new User;
        $user->fill($request->post());
        $user->save();
        return 200;
    }
}
