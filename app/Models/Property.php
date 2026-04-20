<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Property extends Model
{
    // ── Konstanta Kategori ────────────────────────────────────────────────
    public const KATEGORI_FLPP = 'FLPP';
    public const KATEGORI_KOMERSIAL = 'Komersial';

    public static function getKategoriOptions(): array
    {
        return [
            self::KATEGORI_FLPP => 'FLPP',
            self::KATEGORI_KOMERSIAL => 'Komersial',
        ];
    }

    protected $fillable = [
        'unit_bisnis_id',
        'nama_property',
        'slug',
        'kategori',
        'nama_penanggung_jawab_property',
        'whatsapp_number',
        'harga_mulai',
        'alamat',
        'deskripsi_property',
        'promo_unit_rumah',
        'gambar_utama',
        'fasilitas_property',
        'tipe_rumah',
        'lokasi_maps_embed',
        'property_progress',
    ];

    protected $casts = [
        'harga_mulai' => 'integer',
        'gambar_utama' => 'array',
        'fasilitas_property' => 'array',
        'tipe_rumah' => 'array',
        'property_progress' => 'array',
    ];

    // ── Auto-generate slug dari nama_property ──────────────────────────────
    protected static function booted(): void
    {
        static::creating(function (self $property) {
            if (empty($property->slug) && !empty($property->nama_property)) {
                $property->slug = Str::slug($property->nama_property);
            }
        });

        static::updating(function (self $property) {
            if ($property->isDirty('nama_property') && empty($property->slug)) {
                $property->slug = Str::slug($property->nama_property);
            }
        });
    }

    // ── Relations ──────────────────────────────────────────────────────────
    public function unitBisnis(): BelongsTo
    {
        return $this->belongsTo(UnitBisnis::class, 'unit_bisnis_id');
    }
}
