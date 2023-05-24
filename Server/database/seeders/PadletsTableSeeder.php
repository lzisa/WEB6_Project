<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Entry;
use App\Models\Padlet;
use App\Models\Rating;
use App\Models\Userright;
use App\Models\User;
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
        $user = new User();
        $user->name = 'user';
        $user->email = 'user@gmail.com';
        $user->password = bcrypt('secret');
        $user->picture = 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684762839~exp=1684763439~hmac=bc9579fd4cecb0b5d94b6821b9d8ad8acc2f140333eb3df157746f333ea54732';
        $user->save();

        $user2 = new User();
        $user2->name = 'hanna';
        $user2->email = 'hanna@gmail.com';
        $user2->password = bcrypt('secret');
        $user2->picture = 'https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg?w=900&t=st=1684762881~exp=1684763481~hmac=f1850916b8ada89020803f297d09a40ead57804d63e8d38d89353314d6256882';
        $user2->save();

        $user4 = new \App\Models\User();
        $user4->name = 'patricia';
        $user4->email = 'patricia@gmail.com';
        $user4->password = bcrypt('secret');
        $user4->picture = 'https://img.freepik.com/free-photo/beautiful-young-girl-touching-her-face-youth-skin-care-concept_231208-13291.jpg?w=900&t=st=1684762923~exp=1684763523~hmac=a237fe3f535fc57fc6079c6e9812fa6de8d92593c43cfcb19c1656da0b7fcac1';
        $user4->save();

        /**
         * padlets usw
         */
        $padlet = new Padlet();
        $padlet->title = "Dies ist ein neues Padlet";
        $padlet->is_public = true;
        $padlet->picture = 'https://img.freepik.com/free-photo/beautiful-shot-sunrise-country-road-netherlands_181624-29198.jpg?w=900&t=st=1684763331~exp=1684763931~hmac=58a296924ae9a56d5f3c097cb430a998935a51d74d99c3a159bfeb38c1234215';

        //get the first user
        $user = \App\Models\User::all()->first();
        $padlet->user()->associate($user);
        $padlet->save();
/*
        $entry1 = new Entry();
        $entry1->title = "Senf";
        $entry1->text = "ich habe hier meinen Senf hinzuzufügen!";
        $entry1->user()->associate($user);


        $entry2 = new Entry();
        $entry2->title = "Eintrag 2";
        $entry2->text = "Dies ist die Beschreibung für Eintrag 2";
        $entry2->user()->associate($user);

        $padlet->entries()->saveMany([$entry1, $entry2]);
        $padlet->save();

        $comment1 = new Comment();
        $comment1->text = "Ich kommentiere";
        $comment1->user()->associate($user);


        $entry2->comment()->saveMany([$comment1]);
        $padlet->save();

        $entry3 = new Entry();
        $entry3->title = "Eintragg 3";
        $entry3->text = "Dies ist die Beschreibung für Eintrag 3";
        $entry3->user()->associate($user);

        $padlet->save();
*/
        // Create the second padlet (related to Angular)
        $padlet2 = new Padlet();
        $padlet2->title = "Angular Framework Discussion";
        $padlet2->is_public = true;
        $padlet2->picture = 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg';
        $padlet2->user()->associate($user);
        $padlet2->save();

        $entry3 = new Entry();
        $entry3->title = "latest features";
        $entry3->text = "Let's discuss the latest features in Angular 12.";
        $entry3->user()->associate($user);
        $padlet2->entries()->save($entry3);

        $entry4 = new Entry();
        $entry4->title = "Angular CLI tool";
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
        $rating3->rating = true;
        $rating3->user()->associate($user);
        $entry3->rating()->save($rating3);

        $rating4 = new Rating();
        $rating4->rating = true;
        $rating4->user()->associate($user);
        $entry4->rating()->save($rating4);


        // Create the third padlet (related to Laravel)
        $padlet3 = new Padlet();
        $padlet3->title = "Exploring Laravel Framework";
        $padlet3->is_public = true;
        $padlet3->user()->associate($user);
        $padlet3->picture = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/225px-Laravel.svg.png';
        $padlet3->save();

        $entry5 = new Entry();
        $entry5->title = "What is Laravel?";
        $entry5->text = "Laravel is a popular PHP framework known for its simplicity, scalability, and extensive ecosystem. It follows the MVC architecture, offers an intuitive ORM (Eloquent), has a powerful templating engine (Blade), and includes built-in authentication, testing, and caching features. Laravel promotes clean code and provides a vibrant community and ecosystem for additional functionality.";
        $entry5->user()->associate($user);
        $padlet3->entries()->save($entry5);

        $entry6 = new Entry();
        $entry6->title = "how it works";
        $entry6->text = "Laravel offers clean syntax, follows the MVC architecture, has a powerful command-line interface, provides an ORM for simplified database interactions, offers a flexible routing system, has an efficient templating engine, includes built-in authentication and authorization, incorporates robust security features, supports testing with PHPUnit, and benefits from a large and active community.";
        $entry6->user()->associate($user);
        $padlet3->entries()->save($entry6);

        $comment5 = new Comment();
        $comment5->text = "I love how Laravel simplifies database migrations and schema management.";
        $comment5->user()->associate($user4);
        $entry5->comment()->save($comment5);

        $comment6 = new Comment();
        $comment6->text = "Laravel's Eloquent ORM makes working with databases a breeze.";
        $comment6->user()->associate($user4);
        $entry6->comment()->save($comment6);


        $rating5 = new Rating();
        $rating5->rating = true;
        $rating5->user()->associate($user);
        $entry5->rating()->save($rating5);

        $rating6 = new Rating();
        $rating6->rating = true;
        $rating6->user()->associate($user);
        $entry6->rating()->save($rating6);

        $r1 = new Userright();
        $r1->user()->associate($user);
        $r1->padlet()->associate($padlet);
        $r1->edit = true;
        $r1->save();

        $user3 = new \App\Models\User();
        $user3->name = 'lisa';
        $user3->email = 'lisa@gmail.com';
        $user3->password = bcrypt('secret');
        $user3->picture = 'https://media.licdn.com/dms/image/D4D03AQGOi3appT5sKA/profile-displayphoto-shrink_800_800/0/1678305812597?e=2147483647&v=beta&t=wxfTOpf3Lgnpl4S2mNZRzUUqEvmuM1bS3KjftCU29X0';
        $user3->save();

        $rightUser3Padlet1 = new Userright();
        $rightUser3Padlet1->user()->associate($user3);
        $rightUser3Padlet1->padlet()->associate($padlet);
        $rightUser3Padlet1->edit = true;
        $rightUser3Padlet1->save();

        $rightUser3Padlet2 = new Userright();
        $rightUser3Padlet2->user()->associate($user3);
        $rightUser3Padlet2->padlet()->associate($padlet2);
        $rightUser3Padlet2->edit = true;
        $rightUser3Padlet2->save();

        $padlet4 = new Padlet();
        $padlet4->title = "My first private Padlet";
        $padlet4->is_public = false;
        $padlet4->picture = 'https://img.freepik.com/free-photo/hand-holding-cloud-system-with-data-protection_53876-124620.jpg?w=900&t=st=1684763712~exp=1684764312~hmac=0e482d2fd1dfcdaf316b1411ea1e6967e6cf36205501a50154ebebd14936a4cb';
        $padlet4->user()->associate($user3);
        $padlet4->save();


        //travel bucket list padlet
        $padlet5 = new Padlet();
        $padlet5->title = 'Travel Bucket List';
        $padlet5->is_public = false;
        $padlet5->picture ='https://img.freepik.com/fotos-kostenlos/schoener-tropischer-strand-und-meer-im-freien-in-der-paradiesinsel_74190-6839.jpg?w=900&t=st=1684944733~exp=1684945333~hmac=6c8804e1b88191a9f8eb4de26183789ae34d9da168572f19b889e6adfd3b110e';
        $padlet5->user()->associate($user3);
        $padlet5->save();

        // Create travel destinations as entries
        $entry7 = new Entry();
        $entry7->title = 'Bora Bora';
        $entry7->text = 'Bora Bora is a tropical paradise known for its crystal-clear waters and overwater bungalows.';
        $entry7->padlet_id = $padlet5->id;
        $entry7->user()->associate($user2);
        $entry7->save();

        $entry8 = new Entry();
        $entry8->title = 'Santorini';
        $entry8->text = 'Santorini is a picturesque Greek island famous for its stunning sunsets and white-washed buildings.';
        $entry8->padlet_id = $padlet5->id;
        $entry8->user()->associate($user2);
        $entry8->save();

        $entry9 = new Entry();
        $entry9->title = 'Machu Picchu';
        $entry9->text = 'Machu Picchu is an ancient Incan citadel located in the Andes Mountains of Peru.';
        $entry9->padlet_id = $padlet5->id;
        $entry9->user()->associate($user4);
        $entry9->save();

        // Create comments for entries
        $comment7 = new Comment();
        $comment7->text = 'Bora Bora looks like a dream destination!';
        $comment7->entry_id = $entry7->id;
        $comment7->user()->associate($user);
        $comment7->save();

        $comment8 = new Comment();
        $comment8->text = "I've always wanted to visit Santorini. It's on my travel bucket list!";
        $comment8->entry_id = $entry8->id;
        $comment8->user()->associate($user3);
        $comment8->save();

        $comment9 = new Comment();
        $comment9->text = 'Machu Picchu is an incredible archaeological site. Highly recommended!';
        $comment9->entry_id = $entry9->id;
        $comment9->user()->associate($user2);
        $comment9->save();

        // Create ratings for entries
        $rating7 = new Rating();
        $rating7->rating = true;
        $rating7->entry_id = $entry7->id;
        $rating7->user()->associate($user4);
        $rating7->save();

        $rating8 = new Rating();
        $rating8->rating = true;
        $rating8->entry_id = $entry9->id;
        $rating8->user()->associate($user3);
        $rating8->save();

        $rating9 = new Rating();
        $rating9->rating = false;
        $rating9->entry_id = $entry8->id;
        $rating9->user()->associate($user3);
        $rating9->save();


        //Recipe Padlet
        $padlet10 = new Padlet();
        $padlet10->title = 'Meal Inspirations';
        $padlet10->is_public = true;
        $padlet10->user()->associate($user3);
        $padlet10->picture = 'https://img.freepik.com/fotos-kostenlos/pizza-pizza-gefuellt-mit-tomaten-salami-und-oliven_140725-1200.jpg?w=740&t=st=1684943992~exp=1684944592~hmac=6508170298ad77aebea2013fe0576ec47785bfb7163d335538168cdda0f9ec7b';
        $padlet10->save();

        $entry10 = new Entry();
        $entry10->title = 'Spaghetti Carbonara';
        $entry10->text = 'Classic Italian pasta dish with creamy egg sauce, pancetta, and Parmesan cheese.';
        $entry10->padlet_id = $padlet10->id;
        $entry10->user()->associate($user3);
        $entry10->save();

        $entry11 = new Entry();
        $entry11->title = 'Chicken Curry';
        $entry11->text = 'Delicious Indian curry made with tender chicken, aromatic spices, and creamy tomato sauce.';
        $entry11->padlet_id = $padlet10->id;
        $entry11->user()->associate($user4);
        $entry11->save();

        $entry12 = new Entry();
        $entry12->title = 'Chocolate Chip Cookies';
        $entry12->text = 'Classic homemade cookies loaded with chocolate chips, soft and chewy on the inside.';
        $entry12->padlet_id = $padlet10->id;
        $entry12->user()->associate($user3);
        $entry12->save();

        $comment10 = new Comment();
        $comment10->text = 'I tried making the spaghetti carbonara last night, and it was absolutely delicious!';
        $comment10->entry_id = $entry10->id;
        $comment10->user()->associate($user2);
        $comment10->save();

        $comment11 = new Comment();
        $comment11->text = 'Does anyone have a vegetarian version of the chicken curry recipe?';
        $comment11->entry_id = $entry11->id;
        $comment11->user()->associate($user2);
        $comment11->save();

        $question10 = new Comment();
        $question10->text = 'Whats the best way to achieve a crispy texture for the chocolate chip cookies?';
        $question10->entry_id = $entry12->id;
        $question10->user()->associate($user2);
        $question10->save();

        $rating10 = new Rating();
        $rating10->rating = true;
        $rating10->entry_id = $entry10->id;
        $rating10->user()->associate($user2);
        $rating10->save();

        $rating11 = new Rating();
        $rating11->rating = true;
        $rating11->entry_id = $entry11->id;
        $rating11->user()->associate($user2);
        $rating11->save();
    }
}
