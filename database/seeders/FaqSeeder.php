<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faq;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Bagaimana Cara Membeli Rumah di Quinland?',
                'answer' => 'Anda dapat menghubungi nomer hotline Kami atau berinteraksi dengan marketing Kami langsung. Anda juga bisa mengunjungi kantor Marketing Kami.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Apa Saja Metode Pembayaran yang Tersedia?',
                'answer' => '<p><strong>KPR (Kredit Pemilikan Rumah)</strong> melalui Pembiayan Perbankan yang sudah bekerjasama dengan Kami</p><p><strong>Cash Keras</strong> : Metode pembayaran secara tunai ke developer dengan nominal 95% dibayar di awal dan 5% setelah Rumah jadi</p><p><strong>Cash Termin</strong> : Metode pembayaran secara tunai ke developer dengan nominal 50% dibayar di awal dan 50% Sisa dibayarkan bertahap selama 8 Bulan</p><p><strong>Cash Termin by Progress</strong> : Metode Pembayaran secara tunai ke developer dengan nominal 50% dibayar di awal, 45% setelah progrees Rumah selesai Atap, Dan 5% setelah Rumah jadi</p>',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah Ada Jaminan Pembangunan?',
                'answer' => 'Ya, kami berkomitmen menyelesaikan pembangunan sesuai perjanjian. Konsumen juga akan mendapatkan surat komitmen pembangunan dari developer.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana jika Pengajuan KPR Ditolak?',
                'answer' => '<p>Tim kami akan membantu :</p><ol><li>Evaluasi Penyebab Penolakan</li><li>Pengajuan ulang ke Bank Lain</li><li>Alternatif Skema Pembayaran Lain</li></ol><p>Jika, semua alternatif telah dicoba dan KPR masih belum bisa disetujui, Uang muka yang telah dibayarkan akan Kami kembalikan 100% sesuai dengan S&K yang berlaku</p>',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'question' => 'Apa saja dokumen legalitas yang akan didapatkan?',
                'answer' => '<p>Seluruh konsumen Kami mendapatkan jaminan kepastian legalitas dengan dokumen yang akan diterima meliputi :</p><ol><li>Sertifikat Hak Milik atas nama Konsumen</li><li>Persetujuan Bangunan Gedung (PBG)</li><li>SPPT</li></ol>',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['question' => $faq['question']],
                $faq
            );
        }
    }
}
