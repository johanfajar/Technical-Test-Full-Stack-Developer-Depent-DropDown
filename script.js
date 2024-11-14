// URL dasar untuk API
const BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api/";

// Referensi dropdown
const provinceDropdown = document.getElementById("province");
const regencyDropdown = document.getElementById("regency");
const districtDropdown = document.getElementById("district");
const villageDropdown = document.getElementById("village");

// Fungsi untuk memuat data provinsi
async function loadProvinces() {
    const response = await fetch(`${BASE_URL}provinces.json`);
    const provinces = await response.json();
    populateDropdown(provinceDropdown, provinces);
}

// Fungsi untuk memuat data kabupaten/kota berdasarkan provinsi yang dipilih
async function loadRegencies() {
    const provinceId = provinceDropdown.value;
    if (!provinceId) return clearDropdown(regencyDropdown, districtDropdown, villageDropdown);

    const response = await fetch(`${BASE_URL}regencies/${provinceId}.json`);
    const regencies = await response.json();
    populateDropdown(regencyDropdown, regencies);
    clearDropdown(districtDropdown, villageDropdown);
}

// Fungsi untuk memuat data kecamatan berdasarkan kabupaten/kota yang dipilih
async function loadDistricts() {
    const regencyId = regencyDropdown.value;
    if (!regencyId) return clearDropdown(districtDropdown, villageDropdown);

    const response = await fetch(`${BASE_URL}districts/${regencyId}.json`);
    const districts = await response.json();
    populateDropdown(districtDropdown, districts);
    clearDropdown(villageDropdown);
}

// Fungsi untuk memuat data kelurahan berdasarkan kecamatan yang dipilih
async function loadVillages() {
    const districtId = districtDropdown.value;
    if (!districtId) return clearDropdown(villageDropdown);

    const response = await fetch(`${BASE_URL}villages/${districtId}.json`);
    const villages = await response.json();
    populateDropdown(villageDropdown, villages);
}

// Fungsi untuk mengisi dropdown dengan data
function populateDropdown(dropdown, items) {
    clearDropdown(dropdown);
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        dropdown.appendChild(option);
    });
}

// Fungsi untuk menghapus pilihan dropdown
function clearDropdown(...dropdowns) {
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = "<option value=''>Pilih</option>";
    });
}

// Memuat provinsi saat halaman pertama kali dibuka
window.addEventListener("load", loadProvinces);