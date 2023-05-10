<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Padlet extends Model
{
    protected $fillable =['title', 'statusprivate', 'user_id'];


    public function isPrivate(){
        return $this->statusprivate;
    }

    public function entries(): HasMany{
        return $this->hasMany(Entry::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
