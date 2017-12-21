<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    function index(Request $request) {

        if($request->isJson()) {
            // Eloquent
            $user = User::all();

            return response()->json($user, 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function createUser(Request $request){
        if($request->isJson()) {
            $data = $request->json()->all();

            $user = User::create([
               'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'api_token' => str_random(60)
            ]);
            return response()->json($user, 201);
        }

        return response()->json(['error' => 'Unauthorized'], 401, []);
    }

    function getToken(Request $request) {
        if($request->isJson()) {
            try {
                $data = $request->json()->all();

                $user = User::where('email', $data['email'])->first();

                if($user && Hash::check($data['password'], $user->password)) {
                    return response()->json($user, 200);
                } else {
                    return response()->json(['error' => 'No content'], 406);
                }
            } catch (ModelNotFoundException $e) {
                return response()->json(['error' => 'No content'], 406);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401, []);
    }
}
