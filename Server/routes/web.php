<?php

use Illuminate\Support\Facades\Route;
use App\Models\Padlet;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('home');
});*/

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

