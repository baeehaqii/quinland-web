<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'property_id',
        'nama',
        'phone',
        'email',
        'date',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
