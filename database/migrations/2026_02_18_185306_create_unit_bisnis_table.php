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
        Schema::create('unit_bisnis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_unit_bisnis')->nullable();
            $table->text('alamat')->nullable();
            $table->string('direktur')->nullable();
            $table->date('tanggal_berdiri')->nullable();
            $table->boolean('is_active')->default(true)->nullable(); // Representing 'status aktif & tidak aktif'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_bisnis');
    }
};
