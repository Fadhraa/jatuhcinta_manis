let count = 0;
data = [
  {
    gambar: "../img/dudu_bubu/joget.gif",
    teks: "Tetott coba lagi",
  },
  {
    gambar: "../img/dudu_bubu/julurLidah.gif",
    teks: "Masih Salah wueekk",
  },
  {
    gambar: "../img/dudu_bubu/mataNaikTurun.gif",
    teks: "Masa ga tau sih",
  },
];
const lirik = [
  {
    teks: "jatuh cinta memang manis",
    jeda: 1200, // Waktu tunggu sebelum baris ini mulai diketik/muncul (2000 = 2 detik)
    delay: 1000,
    speed: 100,
    speedHapus: 75,
  },
  {
    teks: "Apalagi ada kamu Disini...",
    jeda: 10,
    delay: 800,
    speed: 120,
    speedHapus: 10,
  },
  {
    teks: "Genggam Tanganku Sayangg....",
    jeda: 0,
    delay: 1000,
    speed: 120,
    speedHapus: 5,
  },
  {
    teks: "Kota ini tak sama tanpamuuuuu",
    jeda: 10,
    delay: 1000,
    speed: 80,
    speedHapus: 15,
  },
  {
    teks: "Masi Rasa ingin Lagi",
    jeda: 5,
    delay: 200,
    speed: 100,
    speedHapus: 15,
  },
  {
    teks: "Habiskan waktu di sini",
    jeda: 0,
    delay: 50,
    speed: 85,
    speedHapus: 5,
  },
  {
    teks: "Mungkin tiga atau empat hari lagi",
    jeda: 0,
    delay: 2000,
    speed: 90,
    speedHapus: 25,
  },
];
const gambar = document.getElementById("gambar");
const teks = document.getElementById("teks");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const container = document.querySelector(".container");
const lirikContainer = document.querySelector(".lirikContainer");
const teksLirik = document.getElementById("teks-lirik");
const audio = document.getElementById("audio");

function cekJawaban() {
  if (count == 3) {
    const nyerah = document.querySelector(".nyerah");
    nyerah.style.display = "block";
    modal.classList.add("active");
    overlay.classList.add("active");
    return;
  } else {
    modal.classList.add("active");
    overlay.classList.add("active");
    gambar.src = data[count].gambar;
    teks.textContent = data[count].teks;

    count++;
  }
}

function tutupModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
function buatHati() {
  const heart = document.createElement("div");
  heart.innerHTML = "♥"; // Menggunakan simbol karakter agar bisa diwarnai dengan CSS
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 2 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000); // Hapus elemen hati setelah 5 detik
}

function nyerah() {
  container.style.display = "none";
  lirikContainer.style.display = "flex";
  audio.play();

  setInterval(buatHati, 300); // Efek hujan hati dimulai

  let iLirik = 0;
  function prosesLirik() {
    if (iLirik < lirik.length) {
      let item = lirik[iLirik];

      // Ambil nilai jeda, jika tidak diatur di array maka gunakan default 500ms
      let jedaMulai = item.jeda !== undefined ? item.jeda : 500;

      setTimeout(() => {
        teksLirik.innerHTML = ""; // Bersihkan isi teks
        teksLirik.className = "";

        let chars = item.teks.split("");
        let spans = [];

        // Ambil kecepatan per huruf (default 50ms)
        let kecepatan = item.speed !== undefined ? item.speed : 50;
        let detikAnimasi = kecepatan / 1000;

        // Buat span per huruf untuk fade in dari KIRI
        chars.forEach((c, index) => {
          let span = document.createElement("span");
          span.textContent = c === " " ? "\u00A0" : c; // Jaga spasi
          span.className = "char";
          span.style.animationDelay = index * detikAnimasi + "s"; // Jarak per huruf
          teksLirik.appendChild(span);
          spans.push(span);
        });

        // Total durasi sampai huruf terakhir muncul sempurna
        let durasiMunculSemua = chars.length * kecepatan + 500;

        // Waktu tunggu = durasiMunculSemua + waktu tunggu ekstra (item.delay)
        setTimeout(() => {
          // Kecepatan hapus (jika tidak diset, nilainya mengikuti speed muncul awal)
          let speedHapus =
            item.speedHapus !== undefined ? item.speedHapus : kecepatan;
          let detikHapus = speedHapus / 1000;

          // Mulai fade out per huruf dari KANAN ke kiri
          spans.forEach((span, index) => {
            // Gunakan 'both' agar lirik tetap kelihatan utuh selama menunggu giliran menghilang
            span.style.animation = `hilangHuruf 0.5s both`;
            // Rumus hitung dari kanan: length - 1 - index
            let urutanDariKanan = chars.length - 1 - index;
            span.style.animationDelay = urutanDariKanan * detikHapus + "s";
          });

          // Waktu tunggu agar semua huruf dari kanan selesai menghilang
          let waktuFadingOut = chars.length * speedHapus + 500;

          setTimeout(() => {
            iLirik++;
            prosesLirik();
          }, waktuFadingOut);
        }, durasiMunculSemua + item.delay); // Dijamin lirik tampil full dulu
      }, jedaMulai); // Gunakan durasi jeda yang sudah ditentukan
    }
  }

  prosesLirik(); // Jalankan baris pertama
}
