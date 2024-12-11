# AppPerpustakaanOnline

## Deskripsi
Aplikasi **AppPerpustakaanOnline** adalah platform berbasis mobile yang dirancang untuk mempermudah pengelolaan inventaris buku di perpustakaan secara online. Dengan fitur pencarian, peminjaman, dan pengembalian buku, aplikasi ini membantu pengguna untuk mengakses layanan perpustakaan dengan lebih mudah.

## Fitur Utama
- **Manajemen Buku**: Menambah, mengedit, dan menghapus data buku.
- **Peminjaman Buku**: Pengguna dapat meminjam buku secara online.
- **Pengembalian Buku**: Melacak buku yang telah dipinjam dan mengembalikannya.
- **Pencarian Buku**: Fitur pencarian berdasarkan judul, penulis, atau kategori.
- **Laporan**: Menampilkan data statistik peminjaman buku.

## Teknologi yang Digunakan
- **Frontend**: React Native
- **Backend**: Express.js
- **Database**: SQLite

## Instalasi dan Penggunaan

### Prasyarat
- Node.js (>= 18)
- npm atau yarn
- Emulator Android/iOS atau perangkat fisik

### Langkah Instalasi
1. Clone repositori:
   ```bash
   git clone https://github.com/username/AppPerpustakaanOnline.git
   cd AppPerpustakaanOnline
   ```
2. Instal dependencies:
   ```bash
   npm install
   ```
3. Jalankan aplikasi di emulator atau perangkat fisik:
   - Untuk Android:
     ```bash
     npm run android
     ```
   - Untuk iOS:
     ```bash
     npm run ios
     ```

### API Endpoint
Aplikasi ini terhubung dengan backend yang mendukung operasi CRUD. Berikut adalah daftar endpoint:

- **GET** `/books`: Mendapatkan daftar buku.
- **POST** `/books`: Menambahkan buku baru.
- **PUT** `/books/:id`: Mengedit informasi buku.
- **DELETE** `/books/:id`: Menghapus buku.
- **POST** `/borrow`: Memproses peminjaman buku.
- **POST** `/return`: Memproses pengembalian buku.

## Struktur Direktori
```
AppPerpustakaanOnline/
├── android/
├── ios/
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── utils/
├── package.json
├── README.md
└── .gitignore
```

## Kontribusi
1. Fork repositori ini.
2. Buat branch baru untuk fitur/bugfix:
   ```bash
   git checkout -b fitur-anda
   ```
3. Lakukan perubahan dan commit:
   ```bash
   git commit -m "Deskripsi perubahan"
   ```
4. Push ke branch Anda:
   ```bash
   git push origin fitur-anda
   ```
5. Ajukan Pull Request ke branch utama.

## Tugas 

Buatlah halaman homepage yang responsive
![WhatsApp Image 2024-12-11 at 11 43 39](https://github.com/user-attachments/assets/c8285671-514f-4de4-a5aa-bc81e0b4fca5)
![WhatsApp Image 2024-12-11 at 11 43 38](https://github.com/user-attachments/assets/23c57ffa-f672-4a74-be51-f073aa7d7f00)
![WhatsApp Image 2024-12-11 at 11 43 38 (1)](https://github.com/user-attachments/assets/dad27e71-3ce5-4a3e-95dc-abd54b69b912)

Buatlah minimal 3 buah unit test
![image](https://github.com/user-attachments/assets/e5ef2912-8b4e-44f0-be1f-9e57f65e83cc)

