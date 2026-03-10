<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unit_bisnis_id')->nullable()->constrained('unit_bisnis')->onDelete('cascade');

            // ── Identitas ──────────────────────────────────────────────────────
            $table->string('nama_property')->nullable();
            $table->string('slug')->nullable()->unique();                    // URL-friendly name
            $table->string('kategori')->nullable();                         // Residential, Apartment, Komersial, dll
            $table->string('nama_penanggung_jawab_property')->nullable();
            $table->string('whatsapp_number')->nullable();                  // Nomor WA untuk booking sidebar

            // ── Harga ──────────────────────────────────────────────────────────
            $table->bigInteger('harga_mulai')->nullable();                  // Harga "Starts From" (dalam rupiah)

            // ── Konten ─────────────────────────────────────────────────────────
            $table->text('alamat')->nullable();
            $table->text('deskripsi_property')->nullable();
            $table->text('promo_unit_rumah')->nullable();

            // ── Media ──────────────────────────────────────────────────────────
            // JSON array path file: ["settings/img1.jpg", "settings/img2.jpg"]
            $table->json('gambar_utama')->nullable();                       // Gallery foto utama (ImageGallery)

            // ── Fasilitas ──────────────────────────────────────────────────────
            // JSON array: [{"label": "Security 24/7"}, {"label": "Swimming Pool"}]
            $table->json('fasilitas_property')->nullable();

            // ── Tipe Rumah ─────────────────────────────────────────────────────
            // JSON array: [{"name":"Type 88","bedrooms":3,"bathrooms":2,"sqft":88,
            //               "description":"...","gambar_denah":"path.jpg"}]
            $table->json('tipe_rumah')->nullable();

            // ── Lokasi ──────────────────────────────────────────────────────────
            $table->text('lokasi_maps_embed')->nullable();                  // Google Maps embed URL/src

            // ── Property Progress ───────────────────────────────────────────────
            // JSON array: [{"month":"Okt 2025","image":"path.jpg","label":"...","percentage":15}]
            $table->json('property_progress')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};

