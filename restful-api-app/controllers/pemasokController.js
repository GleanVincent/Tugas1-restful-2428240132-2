const Pemasok = require("../models/pemasokModels");

exports.create = async (req, res) => {
  try {
    const pemasok = await Pemasok.create(req.body);
    res.status(201).json(pemasok);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await Pemasok.find());
};
