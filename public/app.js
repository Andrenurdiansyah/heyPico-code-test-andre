const map = L.map("map").setView([-6.2, 106.816666], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

const loading = document.getElementById("loading");

document.getElementById("askBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  document.getElementById("reply").textContent = "";

  // tampilkan overlay loading
  loading.style.display = "flex";

  try {
    // panggil LLM
    const llmRes = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const llmData = await llmRes.json();
    document.getElementById("reply").textContent = llmData.reply;

    // panggil OSM
    const osmRes = await fetch(`/places?q=${encodeURIComponent(prompt)}`);
    const places = await osmRes.json();

    map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });

    if (places.length) {
      places.forEach(p => {
        L.marker([parseFloat(p.lat), parseFloat(p.lon)])
          .addTo(map)
          .bindPopup(p.display_name);
      });
      const first = places[0];
      map.setView([parseFloat(first.lat), parseFloat(first.lon)], 14);
    } else {
      alert("Tidak ada hasil dari OpenStreetMap.");
    }

  } catch (err) {
    document.getElementById("reply").textContent = "Error: " + err.message;
  } finally {
    // sembunyikan loading
    loading.style.display = "none";
  }
});
