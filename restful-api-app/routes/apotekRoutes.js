const express = require("express");
const router = express.Router();
const apotekControllers = require("../controllers/apotekController");
const cekApiKey = require("../middlewares/CekApiKey");

router.get("/", apotekControllers.getAll);
router.get("/:id", apotekControllers.getById);
router.post("/", cekApiKey, apotekControllers.create);
router.put("/:id", cekApiKey, apotekControllers.update);
router.delete("/:id", cekApiKey, apotekControllers.remove);

module.exports = router;
