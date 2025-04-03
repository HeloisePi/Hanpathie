<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuntController extends Controller
{
    public function login(LoginRequest $request){
        $data = $request->validated();
        $credentials = $request->validated();
        if(Auth::attempt($credentials)){
            return response([
                'message' => 'provided email are password is incorrect',
            ]);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('auth_token')->accessToken;
        return response([compact('user','token')]);


    }
    public function signup(SignupRequest $request)
    {
        \Log::info('Données reçues:', $request->all()); // Debug
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }
    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user -> currentAccessToken()->delete();

        return response([]);
    }
}
