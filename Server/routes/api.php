<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\PadletController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\CommentController;

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

Route::get('padlets', [PadletController::class, 'index']);
Route::get('padlets/{padlet_id}', [PadletController::class, 'findByID']);
Route::get('padlets/checkByID/{padlet_id}', [PadletController::class, 'checkByID']);


Route::post('padlets', [PadletController::class, 'save']);
Route::put('padlets/{padlet_id}', [PadletController::class, 'update']);
Route::delete('padlets/{padlet_id}', [PadletController::class, 'delete']);

Route::get('entries', [EntryController::class, 'index']);
Route::get('padlets/{padlet_id}/entries', [EntryController::class, 'getEntriesOfPadlet']);
Route::post('padlets/{padlet_id}/entries', [EntryController::class, 'save']);
Route::put('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'update']);
Route::get('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'findById']);


Route::get('padlets/{padlet_id}/entries/{entry_id}/ratings', [RatingController::class, 'index']);
Route::post('padlets/{padlet_id}/entries/{entry_id}/ratings', [RatingController::class, 'save']);
Route::get('ratings', [RatingController::class, 'index']);


Route::get('padlets/{padlet_id}/entries/{entry_id}/comments', [CommentController::class, 'index']);
Route::post('padlets/{padlet_id}/entries/{entry_id}/comments', [CommentController::class, 'save']);
/*
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
*/
