<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\Padlet;
use http\Client\Curl\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Psy\Util\Str;

class PadletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $padlet = new Padlet();
        $padlet->title = "Dies ist ein neues Padlet";
        $padlet->statusPrivate = true;

        //get the first user
        $user = \App\Models\User::all()->first();
        $padlet->user()->associate($user);
        $padlet->save();

        //add entries to padlet
        $entry1 = new Entry();
        $entry1->text="ich habe hier meinen Senf hinzuzufügen!";

        $entry2 = new Entry();
        $entry2->text="mimimi!";

        $padlet->entries()->saveMany([$entry1, $entry2]);
        $padlet->save();

        //comment for VCS
    }
}
