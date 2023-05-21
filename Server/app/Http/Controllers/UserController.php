<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(): JsonResponse{
        $users = User::with(['userright', 'padlets'])->get();
        return response()->json($users, 200);
    }

    public function getUsernameByID(string $id)
    {
        $user = User::where('id', $id)->first();
        $data =json_decode($user, true);
        $userName=$data['name'];
        return $user != null ? response()->json($userName, 200) : response()->json(false, 200);
    }
    public function getUserByID(string $id)
    {
        $user = User::where('id', $id)->first();
        return $user != null ? response()->json($user, 200) : response()->json(false, 200);
    }
}
