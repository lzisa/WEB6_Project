<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Entry;
use App\Models\Padlet;
use App\Models\Rating;
use App\Models\Userright;
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
        $padlet->is_public = true;

        //get the first user
        $user = \App\Models\User::all()->first();
        $padlet->user()->associate($user);
        $padlet->save();

        $entry1 = new Entry();
        $entry1->text="ich habe hier meinen Senf hinzuzufügen!";
        $entry1->user()->associate($user);


        $entry2 = new Entry();
        $entry2->text="Dies ist die Beschreibung für Eintrag 2";
        $entry2->user()->associate($user);

        $padlet->entries()->saveMany([$entry1, $entry2]);
        $padlet->save();

        $comment1 = new Comment();
        $comment1->text="Ich kommentiere";
        $comment1->user()->associate($user);
        $entry2->comment()->saveMany([$comment1]);
        $padlet->save();

        $rating = new Rating();
        $rating->rating=4;
        $rating->user()->associate($user);
        $entry2->rating()->saveMany([$rating]);
        $padlet->save();

        $padlet2 = new Padlet();
        $padlet2->title = "Dies ist ein neues Padlet";

        $padlet2->user()->associate($user);
        $padlet2->is_public = false;

        $padlet2->save();
        //comment for VCS

        $right = new Userright();
        $right->user()->associate($user);
        $right->padlet()->associate($padlet);
        $right->edit=true;
        $right->save();

        $right2 = new Userright();
        $right2->user()->associate($user);
        $right2->padlet()->associate($padlet2);
        $right2->save();
    }
}
