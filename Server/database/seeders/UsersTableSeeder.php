<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'testuser';
        $user->email = 'testuser@gmail.com';
        $user->password = bcrypt('secret');
        $user->save();

        $user2 = new User();
        $user2->name = 'user2';
        $user2->email = 'user2@gmail.com';
        $user2->password = bcrypt('secret');
        $user2->save();

        $user3 = new User();
        $user3->name = 'lzisa';
        $user3->email = 'lzisa@gmail.com';
        $user3->password = bcrypt('secret');
        $user3->save();
    }
}
