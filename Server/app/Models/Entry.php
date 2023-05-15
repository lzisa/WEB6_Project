<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Entry extends Model
{
    use HasFactory;
    protected $fillable = ['text', 'user_id', 'padlet_id', 'title'];


    public function padlet(): BelongsTo{
        return $this->belongsTo(Padlet::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function comment(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function rating(): HasMany
    {
        return $this->hasMany(Rating::class);
    }
}
