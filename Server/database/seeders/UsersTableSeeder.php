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
        $user->name = 'user';
        $user->email = 'user@gmail.com';
        $user->password = bcrypt('secret');
        $user->save();

        $user2 = new User();
        $user2->name = 'hanna';
        $user2->email = 'hanna@gmail.com';
        $user2->password = bcrypt('secret');
        $user2->save();

        $user4 = new \App\Models\User();
        $user4->name = 'patricia';
        $user4->email = 'patricia@gmail.com';
        $user4->password = bcrypt('secret');
        $user4->save();

    }
}
