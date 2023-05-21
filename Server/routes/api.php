<?php

use App\Http\Controllers\AuthController;
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
//padlets
Route::get('padlets', [PadletController::class, 'index']);
Route::get('padlets/{padlet_id}', [PadletController::class, 'findByID']);
Route::get('padlets/checkByID/{padlet_id}', [PadletController::class, 'checkByID']);


//entries
Route::get('entries', [EntryController::class, 'index']);
Route::get('padlets/{padlet_id}/entries', [EntryController::class, 'getEntriesOfPadlet']);
Route::post('padlets/{padlet_id}/entries', [EntryController::class, 'save']);
Route::put('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'update']);
Route::get('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'findById']);
Route::delete('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'remove']);

//ratings
Route::get('padlets/{padlet_id}/entries/{entry_id}/ratings', [RatingController::class, 'getRatingsOfEntry']);
Route::get('ratings', [RatingController::class, 'index']);
Route::post('padlets/{padlet_id}/entries/{entry_id}/ratings', [RatingController::class, 'save']);
Route::put('padlets/{padlet_id}/entries/{entry_id}/ratings/{rating_id}', [RatingController::class, 'update']);
Route::delete('padlets/{padlet_id}/entries/{entry_id}/ratings/{ra   ting_id}', [RatingController::class, 'delete']);

//comments
Route::get('padlets/comments', [CommentController::class, 'index']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/comments', [CommentController::class, 'getCommentsOfEntry']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}', [CommentController::class, 'findById']);
Route::post('padlets/{padlet_id}/entries/{entry_id}/comments', [CommentController::class, 'save']);
Route::delete('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}', [CommentController::class, 'delete']);
Route::put('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}', [CommentController::class, 'update']);

//find owner of padlet, entry, comment
Route::get('padlets/{padlet_id}/user_id', [PadletController::class, 'findOwnerId']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/user_id', [EntryController::class, 'findOwnerId']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}/user_id', [CommentController::class, 'findOwnerId']);

//userrights

//user
Route::get('users', [\App\Http\Controllers\UserController::class, 'getUsers']);
Route::get('users/{user_id}', [\App\Http\Controllers\UserController::class, 'getUserByID']);
Route::get('users/{user_id}/username', [\App\Http\Controllers\UserController::class, 'getUsernameByID']);

/* auth */
Route::post('auth/login', [AuthController::class,'login']);

// methods which need authentication - JWT Token
Route::group(['middleware' => ['api','auth.jwt']], function(){
    Route::post('padlets', [PadletController::class, 'save']);
    Route::post('auth/logout', [AuthController::class,'logout']);
    Route::put('padlets/{padlet_id}', [PadletController::class, 'update']);
    Route::delete('padlets/{padlet_id}', [PadletController::class, 'delete']);
});
