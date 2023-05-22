<?php

namespace App\Http\Controllers;

use App\Models\Userright;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserRightsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $userrights = Userright::with(['user', 'padlet'])->get();
        return response()->json($userrights, 200);
    }

    public function save(Request $request): JsonResponse
    {
       // $request = $this->parseRequest($request);
        $padletId = $request->input('padlet_id');
        $userId = $request->input('user_id');
        $edit = $request->input('edit');

        if (!$padletId || !$userId) {
            return response()->json('padlet_id and user_id are required.', 422);
        }
        DB::beginTransaction();

        try {
            $userright = Userright::create([
                'padlet_id' => $padletId,
                'user_id' => $userId,
                'edit' => $edit,
            ]);

            DB::commit();
            return response()->json($userright, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Saving userright failed: " . $e->getMessage(), 420);
        }
    }

    public function getUserrightsOfPadlet(string $padlet_id):jsonResponse
    {
        $userrights = Userright::where('padlet_id', $padlet_id)->get();
        return $userrights != null ? response()->json($userrights, 200) : response()->json(false, 200);
    }

    public function getSharedPadletRightsByUserID(string $user_id):jsonResponse
    {
        $userrights = Userright::where('user_id', $user_id)->get();
        return $userrights != null ? response()->json($userrights, 200) : response()->json(false, 200);
    }

    public function getIfUserRightsToPadlet(string $padlet_id, string $user_id):jsonResponse
    {
        $userrights = Userright::where('padlet_id', $padlet_id)
            ->where('user_id', $user_id)->get();
        return $userrights != null ? response()->json($userrights, 200) : response()->json(false, 200);
    }

    public function update(Request $request, Userright $userrights)
    {
        //
    }
    public function delete(string $padlet_id, string $user_id): JsonResponse
    {
        $deleted = Userright::where('padlet_id', $padlet_id)
            ->where('user_id', $user_id)
            ->delete();

        if ($deleted) {
            return response()->json('userright with padlet_id (' . $padlet_id . ') and user_id (' . $user_id . ') successfully deleted', 200);
        } else {
            return response()->json('userright could not be deleted - it does not exist', 422);
        }
    }

    private function parseRequest(Request $request): Request
    {
        $date = new \DateTime($request->created_at);
        $request['published'] = $date->format('Y-m-d H:i:s');
        return $request;
    }
}
