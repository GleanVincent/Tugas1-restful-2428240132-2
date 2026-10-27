const mongoose = require("mongoose");

const obatSchema = new mongoose.Schema({
  nama: { type: String, required: [true, "nama wajib diisi"], trim: true },
  pemasokId: { type: mongoose.Schema.Types.ObjectId, ref: "Pemasok" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Obat", obatSchema);
