<?php

namespace App\Http\Controllers;

use App\Mail\VerifyEmail;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;

class UsersController extends Controller
{
    //
    function register(Request $request) {
        $request->validate(User::$rules);
        $user = new User;
        $user->fill($request->post());
        $user['password'] = Hash::make($user['password']);
        $verificationToken = Str::random(100);
        $user->verification_email_token = $verificationToken;
        try{
            $user->save();
            // Send verification email
            $url = url('http://127.0.0.1:8000/api/user/verify/' . $verificationToken);
            Mail::to($user->email)->send(new VerifyEmail($url));
            return Response::json("User added to DB ", 201);
        }catch(QueryException $e){
            // Checking if user already registered
            $errorCode = $e->errorInfo[1];
            if($errorCode == 1062){
                return 'Email already signed';
            }
        } 
    }
    function verifyEmail(Request $request) {
        $user = User::where('verification_email_token', $request->verificationToken)->first();
        if (!$user) {
            return response()->json(['error' => 'Token not found'], 404);
        }
    
        $user->email_verified_at = Carbon::now();
        $user->verification_email_token = null;
        $user->save();
        if($request->wantsJson()) {
            return response()->json(['message' => 'Email verified'], 200);
        }
        return view('email.verification');
    }
    function login(Request $request){
        $email = $request->email;
        $password = $request->password;
        $user = User::where('email', $email)->first();
        if($user){
            if(Auth::attempt(['email'=>$email,'password'=>$password])){
                if($user->email_verified_at){
                    // Generate an access token, By default, Sanctum sets the expiration time for an access token to one hour (3600 seconds)
                    $accessToken = $user->createToken("API Access Token")->plainTextToken;
            
                    // Generate a refresh token
                    $refreshToken = Str::random(60);

                    // Set the refresh token expiration time
                    $refreshTokenExpiration = Carbon::now()->addDays(7);
                    // Save the refresh token and its expiration time to the database
                    $user->refresh_token = $refreshToken;
                    $user->refresh_token_expiration = $refreshTokenExpiration;
                    $user->save();
                    return response()->json([
                        'status' => true,
                        'message' => 'User Logged In Successfully',
                        'data' => $user,
                        'access_token' => $accessToken,
                        'refresh_token' => $refreshToken
                    ], 200);  
                } else {
                    return Response::json("Please Verify your account, Check junk/spam folder.", 404);
                }
            }else{
                return Response::json("password is incorrect!", 400);
            } 
        }else {
            return Response::json("email is not found!", 404);
        }
    }
    function edit(Request $request) {
        $userID = $request->id;
        $user = User::find($userID);
        // Sending fields in body
        $allowedFields = ['firstName', 'lastName', 'mobileNum', 'address1', 'address2', 'country', 'state', 'city', 'zipCode'];
        // check if user have permission to edit
        if (Auth::check() && Auth::user()->id == $userID) {
            if($user) {
                foreach ($allowedFields as $field) {
                    if ($request->has($field)) {
                        $user->$field = $request->$field;
                    }
                }
                if($request->password) {
                    $user->password = Hash::make($request->password);
                }
                $user->save();
                return response()->json(['message' => 'User has been edited'], 202);
            } else {
                return response()->json(['message' => 'User not found'], 404);
            }
        } else {
            return response()->json(['message' => 'You are not authorized to edit this profile'], 401);
        }
        
    }
    function refresh(Request $request){
        $refreshToken = $request->refresh_token;

        $user = User::where('refresh_token', $refreshToken)
                    ->where('refresh_token_expiration', '>', Carbon::now())
                    ->first();
    
        if (!$user) {
            return response()->json(['error' => 'Refresh token is invalid or has expired'], 400);
        }
    
        // Generate a new access token
        $accessToken = $user->createToken("API Access Token")->plainTextToken;
    
        // Update the refresh token and its expiration time
        $refreshToken = Str::random(60);
        $refreshTokenExpiration = Carbon::now()->addDays(7);
        $user->refresh_token = $refreshToken;
        $user->refresh_token_expiration = $refreshTokenExpiration;
        $user->save();
    
        return response()->json([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'refresh_token_expiration' => $refreshTokenExpiration
        ], 200);
    }
    function logout(Request $request) {
        //  Log out the user
         try {
            // Validate the user with sending userID
            if (Auth::check() && Auth::user()->id == $request->id) {
                // Logout the user
                
                return response()->json(['message' => 'User logged out successfully'], 200);
            } else {
                return response()->json(['message' => 'Invalid user'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while logging out the user'], 500);
        }
    }
}
