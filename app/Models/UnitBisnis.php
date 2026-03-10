<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitBisnis extends Model
{
    protected $table = 'unit_bisnis';

    protected $fillable = [
        'nama_unit_bisnis',
        'alamat',
        'direktur',
        'tanggal_berdiri',
        'is_active',
    ];

    protected $casts = [
        'tanggal_berdiri' => 'date',
        'is_active' => 'boolean',
    ];

    public function proyeks()
    {
        return $this->hasMany(Proyek::class, 'unit_bisnis_id');
    }
}
