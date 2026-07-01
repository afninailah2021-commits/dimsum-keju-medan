const NOMOR_HP_TOKO = "6285767823715"; // Target pengiriman WhatsApp Utama

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
    document.getElementById('formPemesanan').reset(); // Bersihkan isi data form
}

// EKSEKUSI PENGIRIMAN DATA FORM KE WHATSAPP
function submitOrder(event) {
    event.preventDefault(); // Mencegah reload halaman web

    // Mengambil value dari tiap input form
    const menuName = document.getElementById('modalMenuName').value;
    const menuPrice = document.getElementById('modalMenuPrice').value;
    const buyerName = document.getElementById('buyerName').value;
    const buyerPhone = document.getElementById('buyerPhone').value;
    const buyerArea = document.getElementById('buyerArea').value;
    const buyerAddress = document.getElementById('buyerAddress').value;

    // Format struktur teks pesan yang rapi untuk dikirim ke WA
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

    // Buat URL API WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${NOMOR_HP_TOKO}&text=${encodeURIComponent(teksPesanWA)}`;
    
    // Alihkan user ke WhatsApp di tab baru & tutup modal form di web
    window.open(urlWhatsApp, '_blank');
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
    
    if (event.target === orderModal) {
        closeOrderModal();
    }
    if (event.target === contactModal) {
        closeContactModal();
    }
}

console.log("Website Dimsum Keju Medan versi Dynamic Form WhatsApp berhasil diintegrasikan.");