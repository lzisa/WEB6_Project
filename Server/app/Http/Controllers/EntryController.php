<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use App\Models\Userright;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class EntryController extends Controller
{
    public function index(): JsonResponse
    {
        $entries = Entry::with(['comment', 'rating'])->get();
        return response()->json($entries, 200);
    }

    public function getEntriesOfPadlet(string $padlet_id): JsonResponse
    {

        $entries = Entry::where('padlet_id', $padlet_id)->with(['comment', 'user', 'rating'])->get();
        return $entries != null ? response()->json($entries, 200) : response()->json(false, 200);
    }

    public function save(Request $request, string $padlet_id): JsonResponse
    {
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try {
            if (isset($request['user_id']) && isset($request['title']) && isset($request['text'])) ;
            {
                $entry = Entry::create(
                    [
                        'user_id' => $request['user_id'],
                        'title' => $request['title'],
                        'text' => $request['text'],
                        'padlet_id' => $padlet_id
                    ]
                );
            }
            DB::commit();
            return response()->json($entry, 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving entrie failed: " . $e->getMessage(), 420);
        }

    }

// Update Entry
    public function update(Request $request, string $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $entry = Entry::with(['comment', 'user', 'rating'])
                ->where('id', $id)->first();
            if ($entry != null) {
                $request = $this->parseRequest($request);
                $entry->update($request->all());

                //delete all old entries
                // $entry->entries()->delete();
                $entry->save();
            }
            DB::commit();
            $entry1 = Entry::with(['comment', 'user', 'rating'])
                ->where('id', $id)->first(); // return a vaild http response
            return response()->json($entry1, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Entry failed: " . $e->getMessage(), 420);
        }
    }


    private function parseRequest(Request $request): Request
    {
        $date = new \DateTime($request->created_at);
        $request['published'] = $date;
        return $request;
    }


}
