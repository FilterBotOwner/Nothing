async function loadPlaylist() {
  const url = document.getElementById("playlistUrl").value;
  try {
    const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const playlistText = await response.text();
    const firstStream = playlistText.split("\n").find(line => line.endsWith(".m3u8"));

    if (firstStream) {
      document.getElementById("videoPlayer").src = firstStream;
      document.getElementById("videoPlayer").play();
    } else {
      alert("No .m3u8 stream found in playlist.");
    }
  } catch (error) {
    alert("Error loading playlist: " + error.message);
  }
}
