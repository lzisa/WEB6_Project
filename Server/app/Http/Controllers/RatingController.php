<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index():jsonResponse
    {
        $rating = Rating::with(['user', 'entry'])->get();
        return response()->json($rating, 200);
    }

    public function getRatingsOfEntry(string $entry_id):jsonResponse
    {
        $ratings = Rating::where('entry_id', $entry_id)->get();
        return $ratings != null ? response()->json($ratings, 200) : response()->json(false, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request, string $padlet_id, string $entry_id):JsonResponse
    {
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try {
            if(isset($request['user_id']) && isset($request['rating']));
            {
                $rating = Rating::create(
                    [
                        'user_id'=>$request['user_id'],
                        'rating'=>$request['rating'],
                        'entry_id'=> $entry_id
                    ]
                );
            }
            DB::commit();
            // return a vaild http response
            return response()->json($rating, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving rating failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $padlet_id, string $entry_id, string $rating_id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $rating = Rating::with(['user'])
                ->where('id', $rating_id)->first();
            if ($rating != null) {
                $request = $this->parseRequest($request);
                $rating->update($request->all());

                //delete all old entries
                // $entry->entries()->delete();
                $rating->save();
            }
            DB::commit();
            $comment1 = Rating::with(['user'])
                ->where('id', $rating_id)->first(); // return a vaild http response
            return response()->json($comment1, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Comment failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function delete(string $rating_id): JsonResponse
    {
        $comment = Rating::where('id', $rating_id)->first();
        if ($comment != null) {
            $comment->delete();
            return response()->json('comment (' . $rating_id . ') successfully deleted', 200);
        } else
            return response()->json('comment could not be deleted - it does not exist', 422);
    }


    private function parseRequest(Request $request): Request
    {
        //convert date
        $date = new \DateTime($request->created_at);
        $request['published'] = $date;
        return $request;
    }
}
