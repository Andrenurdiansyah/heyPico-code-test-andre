import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Endpoint LLM
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        prompt: `User mencari tempat: ${prompt}. Balas singkat, jangan pakai simbol selain teks.`,
        stream: false
      }),
    });
    const data = await response.json();
    res.json({ reply: data.response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint cari tempat via OSM Nominatim
const userEmail = process.env.CONTACT_EMAIL || "default@example.com";

app.get("/places", async (req, res) => {
  const q = req.query.q;
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`,
      {
        headers: {
          "User-Agent": `heyPico-code-test-andre/1.0 (${userEmail})`
        }
      }
    );
    const places = await response.json();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const markersGroup = L.layerGroup().addTo(map);

document.getElementById("askBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;

  // Panggil LLM
  const llmRes = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const llmData = await llmRes.json();
  document.getElementById("reply").textContent = llmData.reply;

  // Panggil OSM Nominatim
  const osmRes = await fetch(`/places?q=${encodeURIComponent(prompt)}`);
  const places = await osmRes.json();

  // Hapus semua marker sebelumnya
  markersGroup.clearLayers();

  if (places.length === 0) {
    alert("Tidak ada hasil dari OpenStreetMap.");
    return;
  }

  places.forEach(p => {
    const lat = parseFloat(p.lat);
    const lon = parseFloat(p.lon);
    L.marker([lat, lon]).bindPopup(p.display_name).addTo(markersGroup);
  });

  // Fokus ke lokasi pertama
  const first = places[0];
  map.setView([parseFloat(first.lat), parseFloat(first.lon)], 14);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
