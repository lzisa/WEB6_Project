<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Userright extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $fillable = ['padlet_id', 'user_id', 'edit'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function padlet(): BelongsTo
    {
        return $this->belongsTo(Padlet::class);
    }
}
