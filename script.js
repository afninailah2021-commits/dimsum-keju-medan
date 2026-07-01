const NOMOR_HP_TOKO = "6285767823715"; 
// GANTI DENGAN URL WEB APP GOOGLE APPS SCRIPT LO YANG SEBENARNYA:
const URL_GOOGLE_SHEETS_API = "PASTE_URL_WEB_APP_APPS_SCRIPT_DISINI";

// LOGIKA MODAL FORM PEMESANAN MENU
function openOrderModal(namaMenu, hargaMenu) {
    document.getElementById('modalMenuName').value = namaMenu;
    document.getElementById('modalMenuPrice').value = hargaMenu;
    
    const orderModal = document.getElementById('orderModal');
    orderModal.classList.add('active');
}

function closeOrderModal() {
    const orderModal = document.getElementById('orderModal');
    orderModal.classList.remove('active');
    document.getElementById('formPemesanan').reset();
}

// EKSEKUSI PENGIRIMAN DATA SEKALIGUS (GOOGLE SHEETS + WHATSAPP)
function submitOrder(event) {
    event.preventDefault(); // Mencegah reload halaman

    // 1. Ambil data dari form input
    const menuName = document.getElementById('modalMenuName').value;
    const menuPrice = document.getElementById('modalMenuPrice').value;
    const buyerName = document.getElementById('buyerName').value;
    const buyerPhone = document.getElementById('buyerPhone').value;
    const buyerArea = document.getElementById('buyerArea').value;
    const buyerAddress = document.getElementById('buyerAddress').value;

    // 2. Bungkus data dalam format JSON untuk dikirim ke Google Sheets
    const dataPemesanan = {
        menuName: menuName,
        menuPrice: menuPrice,
        buyerName: buyerName,
        buyerPhone: buyerPhone,
        buyerArea: buyerArea,
        buyerAddress: buyerAddress
    };

    // 3. Proses pengiriman data ke Google Sheets di latar belakang (Background)
    fetch(URL_GOOGLE_SHEETS_API, {
        method: "POST",
        body: JSON.stringify(dataPemesanan)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Sukses masuk Google Sheets:", result);
    })
    .catch(error => {
        console.error("Gagal masuk Google Sheets, tapi orderan WA tetap jalan:", error);
    });

    // 4. Format pesan teks untuk WhatsApp
    const teksPesanWA = `*HALO DIMSUM KEJU MEDAN (NEW ORDER)* 🔔\n` +
                        `-----------------------------------------\n` +
                        `*Detail Menu:* ${menuName} (${menuPrice})\n\n` +
                        `*Data Pembeli:*\n` +
                        `• *Nama:* ${buyerName}\n` +
                        `• *No HP/WA:* ${buyerPhone}\n` +
                        `• *Kecamatan/Wilayah:* ${buyerArea} (Sekitaran Medan)\n` +
                        `• *Alamat Rumah:* ${buyerAddress}\n` +
                        `-----------------------------------------\n` +
                        `Mohon segera diproses dan hitungkan total ongkirnya ya Min! 🙏`;

    // 5. Buka WhatsApp otomatis di tab baru
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${NOMOR_HP_TOKO}&text=${encodeURIComponent(teksPesanWA)}`;
    window.open(urlWhatsApp, '_blank');
    
    // 6. Tutup modal form setelah selesai
    closeOrderModal();
}

// LOGIKA MODAL POP-UP INFO KONTAK TOKO
function openContactModal() {
    document.getElementById('contactModal').classList.add('active');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
}

// Deteksi klik global di luar area modal untuk auto close
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const contactModal = document.getElementById('contactModal');
    
    if (event.target === orderModal) { closeOrderModal(); }
    if (event.target === contactModal) { closeContactModal(); }
}

console.log("Website Dimsum Terintegrasi Google Sheets & WhatsApp Siap Digunakan.");