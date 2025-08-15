Overview:
 HeyPico.ai Demo - LLM + OpenStreetMap
 Project ini adalah demo aplikasi web yang menggabungkan LLM (Large Language Model) dan
 OpenStreetMap untuk pencarian lokasi. Pengguna bisa mengetik kata kunci, LLM akan memberikan
 saran singkat, dan peta akan menampilkan marker lokasi terkait.
 Tech Stack- Backend: Node.js, Express.js- Frontend: HTML, CSS, JavaScript, Leaflet.js- LLM: Ollama LLaMA 3.1 (8B)- Map API: OpenStreetMap (Nominatim)- Others: dotenv, cors, body-parser, node-fetch
 How It Works
 1. User Input: Pengguna mengetik kata kunci di form input.
 2. LLM Request: Frontend memanggil endpoint /ask di backend untuk meminta jawaban LLM.
 3. OSM Request: Backend memanggil endpoint /places menggunakan Nominatim API untuk
 mencari lokasi.
 4. Map Rendering: Marker ditampilkan di Leaflet map berdasarkan hasil OSM.
 5. Loading Animation: Saat LLM memproses, ditampilkan animasi loading.
 Features- Form berbasis card dengan desain modern (gradasi magenta-teal, animasi hover)- Input keyword dengan visual fokus interaktif- Integrasi LLM untuk memberikan jawaban teks singkat- OpenStreetMap integration dengan marker dinamis- Loading animation saat backend memproses request- Responsif, dapat dijalankan di browser desktop maupun mobile
 Running Demo
 1. Install dependencies
   npm install
 2. Start backend server
   node server.js
 3. Open frontend
   Buka index.html di browser (atau gunakan live server)
 4. Try it
   Masukkan kata kunci, klik Cari, lihat jawaban LLM dan marker di peta.
 Project Structure
 /
 |-- public/
 |   |-- index.html
 |   |-- app.js
 |   |-- style.css
 |
 |-- server.js
 |-- .env
 |-- package.json
 Notes- Pastikan Ollama server LLaMA berjalan di port 11434- Pastikan koneksi internet untuk Nominatim API- Gunakan email valid di .env untuk User-Agent header Nominatim
