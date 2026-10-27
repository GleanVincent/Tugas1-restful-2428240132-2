const Obat = require("../models/apotekModels");
const { errorHttp } = require("../middlewares/errorHandler");

exports.create = async (req, res) => {
  try {
    const obat = await Obat.create(req.body);
    await obat.populate("pemasokId", "kode nama");
    res.status(201).json(obat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  const rawPage = req.query.page ?? "1";
  const rawLimit = req.query.limit ?? "10";

  if (typeof rawPage !== "string" || typeof rawLimit !== "string") {
    throw errorHttp(400, "page dan limit harus berupa bilangan bulat positif");
  }

  const page = Number(rawPage);
  const limit = Number(rawLimit);

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
    throw errorHttp(400, "page dan limit harus berupa bilangan bulat positif");
  }

  const [total, data] = await Promise.all([
    Obat.countDocuments(),
    Obat.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("pemasokId", "kode nama"),
  ]);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data,
  });
};

exports.getById = async (req, res) => {
  const data = await Obat.findById(req.params.id).populate("pemasokId", "kode nama");
  if (!data) throw errorHttp(404, "Data tidak ditemukan");
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await Obat.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after', runValidators: true }
  );
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  await data.populate("pemasokId", "kode nama");
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await Obat.findByIdAndDelete(req.params.id);
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.status(204).send();
};
