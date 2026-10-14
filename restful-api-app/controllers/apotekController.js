const apotekModel = require("../models/apotekModel");
const { errorHttp } = require("../middlewares/errorHandler");

exports.getAll = (req, res) => {
  const { jenis } = req.query;
  res.json(apotekModel.getAll(jenis));
};

exports.getById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = apotekModel.getById(id);
  if (!data) return next(errorHttp(404, "Data tidak ditemukan"));
  res.json(data);
};

exports.create = (req, res, next) => {
  const { namaObat, jenis, harga, stok, tanggalKedaluwarsa } = req.body;
  if (!namaObat || !jenis || !harga || !stok || !tanggalKedaluwarsa)
    return next(errorHttp(400, "Semua field wajib diisi"));

  const baru = apotekModel.create({
    namaObat,
    jenis,
    harga,
    stok,
    tanggalKedaluwarsa,
  });
  res.status(201).json(baru);
};

exports.update = (req, res, next) => {
  const id = parseInt(req.params.id);
  const hasil = apotekModel.update(id, req.body);
  if (!hasil) return next(errorHttp(404, "Data tidak ditemukan"));
  res.json(hasil);
};

exports.remove = (req, res, next) => {
  const id = parseInt(req.params.id);
  const berhasil = apotekModel.remove(id);
  if (!berhasil) return next(errorHttp(404, "Data tidak ditemukan"));
  res.status(204).send();
};
