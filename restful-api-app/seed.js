// Mengisi basis data dengan 3 pemasok dan 25 obat. Aman dijalankan berulang:
// data lama dihapus dulu.
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
  quiet: true,
});
const mongoose = require("mongoose");
const Pemasok = require("./models/pemasokModels");
const Obat = require("./models/apotekModels");

const PEMASOK = [
  { kode: "PMK001", nama: "PT Kimia Farma Trading & Distribution" },
  { kode: "PMK002", nama: "PT Anugrah Argon Medica" },
  { kode: "PMK003", nama: "PT Indofarma Global Medika" },
];

const OBAT = [
  "Paracetamol 500 mg",
  "Ibuprofen 400 mg",
  "Amoxicillin 500 mg",
  "Antasida",
  "Vitamin C 500 mg",
  "Cetirizine 10 mg",
  "Loratadine 10 mg",
  "Omeprazole 20 mg",
  "Metformin 500 mg",
  "Amlodipine 5 mg",
  "Simvastatin 10 mg",
  "OBH Combi",
  "Dextromethorphan 15 mg",
  "Betadine Antiseptik",
  "Oralit",
  "Zinc 20 mg",
  "Salbutamol 2 mg",
  "Dexamethasone 0.5 mg",
  "Captopril 25 mg",
  "Loperamide 2 mg",
  "Asam Mefenamat 500 mg",
  "Ranitidine 150 mg",
  "Methylprednisolone 4 mg",
  "Cefadroxil 500 mg",
  "Vitamin B Complex",
];

async function main() {
  if (!process.env.DB_URI) {
    throw new Error("DB_URI belum diatur pada file .env");
  }

  await mongoose.connect(process.env.DB_URI);

  try {
    await Obat.deleteMany({});
    await Pemasok.deleteMany({});

    const pemasok = await Pemasok.insertMany(PEMASOK);
    const obat = OBAT.map((nama, i) => ({
      nama,
      pemasokId: pemasok[i % pemasok.length]._id,
    }));
    await Obat.insertMany(obat);

    console.log(`Seed selesai: ${pemasok.length} pemasok, ${obat.length} obat`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
