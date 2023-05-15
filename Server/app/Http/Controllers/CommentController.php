<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    public function index(): jsonResponse
    {
        $comment = Comment::with(['user', 'entry'])->get();
        return response()->json($comment, 200);
    }
    public function save(Request $request, string $padlet_id, string $entry_id): JsonResponse
    {
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try {
            if (isset($request['user_id']) && isset($request['comment'])) ;
            {
                $comment = Comment::create(
                    [
                        'user_id' => $request['user_id'],
                        'text' => $request['text'],
                        'entry_id' => $entry_id
                    ]
                );
            }
            DB::commit();
            // return a vaild http response
            return response()->json($comment, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving comment failed: " . $e->getMessage(), 420);
        }
    }
    public function update(Request $request, string $padlet_id, string $entry_id, string $comment_id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $comment = Comment::with(['user'])
                ->where('id', $comment_id)->first();
            if ($comment != null) {
                $request = $this->parseRequest($request);
                $comment->update($request->all());

                //delete all old entries
                // $entry->entries()->delete();
                $comment->save();
            }
            DB::commit();
            $comment1 = Comment::with(['user'])
                ->where('id', $comment_id)->first(); // return a vaild http response
            return response()->json($comment1, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Comment failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $comment_id): JsonResponse
    {
        $comment = Comment::where('id', $comment_id)->first();
        if ($comment != null) {
            $comment->delete();
            return response()->json('comment (' . $comment_id . ') successfully deleted', 200);
        } else
            return response()->json('comment could not be deleted - it does not exist', 422);
    }

    public function findById(string $padlet_id, string $entry_id, string $comment_id)
    {
        $comment = Comment::where('id', $comment_id)->get();
        return $comment != null ? response()->json($comment, 200) : response()->json(false, 200);
    }

    private function parseRequest(Request $request): Request
    {
        //convert date
        $date = new \DateTime($request->created_at);
        $request['published'] = $date;
        return $request;
    }
}
