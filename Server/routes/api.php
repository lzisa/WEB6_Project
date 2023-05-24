<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\PadletController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserRightsController;
use App\Http\Controllers\UserController;

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
Route::get('padlets/public', [PadletController::class, 'getPublicPadlets']);
Route::get('padlets/{padlet_id}', [PadletController::class, 'findByID']);
Route::get('padlets/checkByID/{padlet_id}', [PadletController::class, 'checkByID']);
Route::get('{user_id}/padlets', [PadletController::class, 'getPadletsOfUser']);

//entries
Route::get('entries', [EntryController::class, 'index']);
Route::get('padlets/{padlet_id}/entries', [EntryController::class, 'getEntriesOfPadlet']);
Route::get('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'findById']);

//ratings
Route::get('padlets/{padlet_id}/entries/{entry_id}/ratings', [RatingController::class, 'getRatingsOfEntry']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/rating/{user_id}', [RatingController::class, 'getRatingEntryUser']);
Route::get('ratings', [RatingController::class, 'index']);

//comments
Route::get('padlets/comments', [CommentController::class, 'index']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/comments', [CommentController::class, 'getCommentsOfEntry']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}', [CommentController::class, 'findById']);

//find owner of padlet, entry, comment
Route::get('padlets/{padlet_id}/user_id', [PadletController::class, 'findOwnerId']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/user_id', [EntryController::class, 'findOwnerId']);
Route::get('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}/user_id', [CommentController::class, 'findOwnerId']);

//userrights
Route::get('userrights', [UserRightsController::class, 'index']);
Route::get('padlets/{padlet_id}/userrights', [UserRightsController::class, 'getUserrightsOfPadlet']);
Route::get('padlets/{user_id}/sharedPadlets', [UserRightsController::class, 'getSharedPadletRightsByUserID']);
Route::get('padlets/{padlet_id}/userrights/{user_id}', [UserRightsController::class, 'getIfUserRightsToPadlet']);


//user
Route::get('users', [UserController::class, 'getUsers']);
Route::get('users/{user_id}', [UserController::class, 'getUserByID']);
Route::get('users/{user_id}/username', [UserController::class, 'getUsernameByID']);

/* auth */
Route::post('auth/login', [AuthController::class,'login']);

// methods which need authentication - JWT Token
Route::group(['middleware' => ['api','auth.jwt']], function(){
    Route::post('padlets', [PadletController::class, 'save']);
    Route::post('auth/logout', [AuthController::class,'logout']);
    Route::put('padlets/{padlet_id}', [PadletController::class, 'update']);
    Route::delete('padlets/{padlet_id}', [PadletController::class, 'delete']);

    //userrights
    Route::delete('admin/{padlet_id}/userrights/{user_id}', [UserRightsController::class, 'delete']);
    Route::post('userrights', [UserRightsController::class, 'save']);
    Route::put('admin/{padlet_id}/userrights/{user_id}', [UserRightsController::class, 'update']);

    //comments
    Route::post('padlets/{padlet_id}/entries/{entry_id}/comments', [CommentController::class, 'save']);
    Route::delete('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}', [CommentController::class, 'delete']);
    Route::put('padlets/{padlet_id}/entries/{entry_id}/comments/{comment_id}', [CommentController::class, 'update']);

    //ratings
    Route::post('padlets/{padlet_id}/entries/{entry_id}/ratings/{user_id}', [RatingController::class, 'save']);
    Route::put('padlets/{padlet_id}/entries/{entry_id}/ratings/{user_id}', [RatingController::class, 'update']);
    Route::delete('padlets/{padlet_id}/entries/{entry_id}/rating/{user_id}', [RatingController::class, 'delete']);

    //entries
    Route::delete('padlets/{padlet_id}/entries/{entry_id}/{user_id}', [EntryController::class, 'remove']);
    Route::delete('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'remove']);
    Route::post('padlets/{padlet_id}/entries', [EntryController::class, 'save']);
    Route::put('padlets/{padlet_id}/entries/{entry_id}', [EntryController::class, 'update']);
});
