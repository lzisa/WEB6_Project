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
        $entry1->title="Senf";
        $entry1->text="ich habe hier meinen Senf hinzuzufügen!";
        $entry1->user()->associate($user);


        $entry2 = new Entry();
        $entry2->title="Eintrag 2";
        $entry2->text="Dies ist die Beschreibung für Eintrag 2";
        $entry2->user()->associate($user);

        $padlet->entries()->saveMany([$entry1, $entry2]);
        $padlet->save();

        $comment1 = new Comment();
        $comment1->text="Ich kommentiere";
        $comment1->user()->associate($user);


        $entry2->comment()->saveMany([$comment1]);
        $padlet->save();

        $entry3 = new Entry();
        $entry3->title= "Eintragg 3";
        $entry3->text="Dies ist die Beschreibung für Eintrag 3";
        $entry3->user()->associate($user);


        $rating = new Rating();
        $rating->rating=4;
        $rating->user()->associate($user);


        $rating2 = new Rating();
        $rating2->rating=2;
        $rating2->user()->associate($user);

        $entry2->rating()->saveMany([$rating, $rating2]);
        $padlet->save();

        // Create the second padlet (related to Angular)
        $padlet2 = new Padlet();
        $padlet2->title = "Angular Framework Discussion";
        $padlet2->is_public = true;
        $padlet2->user()->associate($user);
        $padlet2->save();

        $entry3 = new Entry();
        $entry3->title="latest features";
        $entry3->text = "Let's discuss the latest features in Angular 12.";
        $entry3->user()->associate($user);
        $padlet2->entries()->save($entry3);

        $entry4 = new Entry();
        $entry4->title= "Angular CLI tool";
        $entry4->text = "Angular's CLI tool simplifies project setup and development.";
        $entry4->user()->associate($user);
        $padlet2->entries()->save($entry4);

        $comment3 = new Comment();
        $comment3->text = "I'm excited about Angular's new Ivy rendering engine!";
        $comment3->user()->associate($user);
        $entry3->comment()->save($comment3);

        $comment4 = new Comment();
        $comment4->text = "The Angular Material library provides beautiful UI components.";
        $comment4->user()->associate($user);
        $entry4->comment()->save($comment4);

        $rating3 = new Rating();
        $rating3->rating = 4;
        $rating3->user()->associate($user);
        $entry3->rating()->save($rating3);

        $rating4 = new Rating();
        $rating4->rating = 5;
        $rating4->user()->associate($user);
        $entry4->rating()->save($rating4);


        // Create the third padlet (related to Laravel)
        $padlet3 = new Padlet();
        $padlet3->title = "Exploring Laravel Framework";
        $padlet3->is_public = true;
        $padlet3->user()->associate($user);
        $padlet3->save();

        $entry5 = new Entry();
        $entry5->title= "Beschreibung";
        $entry5->text = "Laravel is a popular PHP framework known for its elegant syntax and powerful features.";
        $entry5->user()->associate($user);
        $padlet3->entries()->save($entry5);

        $entry6 = new Entry();
        $entry6->title = "how it works";
        $entry6->text = "It follows the MVC (Model-View-Controller) architectural pattern, making development efficient.";
        $entry6->user()->associate($user);
        $padlet3->entries()->save($entry6);

        $comment5 = new Comment();
        $comment5->text = "I love how Laravel simplifies database migrations and schema management.";
        $comment5->user()->associate($user);
        $entry5->comment()->save($comment5);

        $comment6 = new Comment();
        $comment6->text = "Laravel's Eloquent ORM makes working with databases a breeze.";
        $comment6->user()->associate($user);
        $entry6->comment()->save($comment6);

        $rating5 = new Rating();
        $rating5->rating = 5;
        $rating5->user()->associate($user);
        $entry5->rating()->save($rating5);

        $rating6 = new Rating();
        $rating6->rating = 4;
        $rating6->user()->associate($user);
        $entry6->rating()->save($rating6);
    }
}
