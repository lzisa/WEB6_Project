<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Userright;

class Padlet extends Model
{
    protected $fillable =['title', 'is_public', 'user_id', 'picture'];



    public function isPublic(){
        return $this->isPublic();
    }

    public function entries(): HasMany{
        return $this->hasMany(Entry::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function userright(): HasMany{
        return $this->HasMany(Userright::class);
    }

    public function findOwner(){
        return $this->user();
    }
}
