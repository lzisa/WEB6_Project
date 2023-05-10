<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function (){
    $padlets = DB::table('padlets')->get();
    return $padlets;
});

Route::get('/padlets', function () {
    $padlets = Padlet::all();
    return $padlets;
    //return view('padlets.index', compact('padlets'));
    //return view('home');
});
Route::get('/padlets/{id}', function ($id) {
    //$padlet = \Illuminate\Support\Facades\DB::table('padlets')->find($id);
    $padlet=Padlet::find($id);
    return $padlet;
    //return view('padlets.show', compact('padlet'));
});
