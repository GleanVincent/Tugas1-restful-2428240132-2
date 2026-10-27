const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

const apotekRoutes = require("./routes/apotekRoutes");
const mongoose = require("mongoose"); // tambahkan di antara require lainnya

const app = express();
const PORT = process.env.PORT || 3000;

const pemasokRoutes = require('./routes/pemasokRoutes');   // bersama require lainnya

// ---------- Middleware global ----------

app.use(logger);
const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5500",
  "null",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin tidak diizinkan oleh CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

// ---------- Route dasar ----------
app.get("/", (req, res) => {
  res.send("Server Express.js berjalan!");
});

// ---------- Route per modul ----------
app.use("/Medicines", apotekRoutes);
app.use('/Pemasok', pemasokRoutes);                          // di bawah app.use('/mahasiswa', ...)

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");
    app.listen(PORT, () =>
      console.log(`Server berjalan di http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err.message);
    process.exit(1);
  });

  
