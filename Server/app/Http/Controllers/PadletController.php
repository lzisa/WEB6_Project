<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use App\Models\Userright;
use http\Client\Curl\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PadletController extends Controller
{
    public function save(Request $request): JsonResponse
    {
        $request = $this->parseRequest($request);
        DB::beginTransaction();
        try {
            $padlet = Padlet::create($request->all());


            //save entries

            if (isset($request['entries']) && is_array($request['entries'])) {
                foreach ($request['entries'] as $e) {
                    $entry = Entry::firstOrNew(['id' => $e['id'], 'title' => $e['title']]);
                    $padlet->entry()->save($entry);
                }
            }

            /*     if (isset($request['user']) && is_array($request['user'])) {
                     foreach ($request['user'] as $u) {
                         $user = User::firstOrNew(['id' => $u['id'], 'name' => $u['name']]);
                         $padlet->user()->save($user);
                     }
                 }
     */
            DB::commit();
            return response()->json($padlet, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving padlet failed: " + $e->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $padlet = Padlet::with(['entries', 'user', 'userright'])
                ->where('id', $id)->first();
            if ($padlet != null) {
                $request = $this->parseRequest($request);
                $padlet->update($request->all());

                //delete all old images
                $padlet->entries()->delete();

                if (isset($request['entries']) && is_array($request['entries'])) {
                    foreach ($request['entries'] as $e) {
                        $entry = Entry::firstOrNew(['title' => $e['title'], 'text' => $e['text'], 'user_id' => $e['user_id'], 'padlet_id' => $id]);
                        $padlet->entries()->save($entry);
                    }
                }

                $padlet->userright()->delete();

                //Update Userrights
                if (isset($request['userright']) && is_array($request['userright'])) {
                    foreach ($request['userright'] as $ur) {
                        $userright = Userright::firstOrNew(
                            ['padlet_id' => $ur['padlet_id'],
                                'user_id' => $ur['user_id'],
                                'read' => $ur['read'],
                                'edit' => $ur['edit']]);
                        $padlet->userright()->save($userright);
                    }
                }
                $padlet->save();
            }

            DB::commit();
            $padlet1 = Padlet::with(['entries', 'user', 'userright'])
                ->where('id', $id)->first();
// return a vaild http response
            return response()->json($padlet1, 201);
        } catch (\Exception $e) {
// rollback all queries
            DB::rollBack();
            return response()->json("updating book failed: " . $e->getMessage(), 420);
        }
    }


    private function parseRequest(Request $request): Request
    {
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function index(): JsonResponse
    {
        $padlets = Padlet::with(['user', 'userright', 'entries.comment', 'entries.rating'])->get();
        return response()->json($padlets, 200);
    }

    public function findById(string $id)
    {
        $padlet = Padlet::where('id', $id)->first();
        return $padlet != null ? response()->json($padlet, 200) : response()->json(false, 200);
    }

    public function findOwner(string $id)
    {
        $padlet = Padlet::where('id', $id)->first();
        $data = json_decode($padlet, true);
        $userID =$data['user_id'];
        return response()->json(['user_id'=>$padlet->user_id], 200);
    }

    public function checkByID(string $id)
    {
        $padlet = Padlet::where('id', $id)->first();
        return $padlet != null ? response()->json(true, 200) : response()->json(false, 200);
    }


    public function delete(string $id): JsonResponse
    {
        $padlet = Padlet::where('id', $id)->first();
        if ($padlet != null) {
            $padlet->delete();
            return response()->json('padlet (' . $id . ') successfully deleted', 200);
        } else
            return response()->json('padlet could not be deleted - it does not exist', 422);
    }
}
