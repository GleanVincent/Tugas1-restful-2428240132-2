let nextId = 3;

let apotek = [
  {
    id: 1,
    namaObat: "Paracetamol 500 mg",
    jenis: "tablet",
    harga: 12000,
    stok: 150,
    tanggalKedaluwarsa: "2028-03-31",
  },
  {
    id: 2,
    namaObat: "Ibuprofen 400 mg",
    jenis: "tablet",
    harga: 15000,
    stok: 100,
    tanggalKedaluwarsa: "2028-06-30",
  },
];

function getAll(jenis) {
  if (jenis) return apotek.filter((a) => a.jenis === jenis);
  return apotek;
}

function getById(id) {
  return apotek.find((a) => a.id === id);
}

function create(data) {
  const baru = { id: nextId++, ...data };
  apotek.push(baru);
  return baru;
}

function update(id, data) {
  const index = apotek.findIndex((a) => a.id === id);
  if (index === -1) return null;
  apotek[index] = { ...apotek[index], ...data, id };
  return apotek[index];
}

function remove(id) {
  const index = apotek.findIndex((a) => a.id === id);
  if (index === -1) return false;
  apotek.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
