// number format
function formatNumber(num) {
  num = Number(num);
  if (num < 10000) return num;
  if (num < 1000000) return (num / 1000).toFixed(1).replace(".0","") + "K";
  return (num / 1000000).toFixed(1).replace(".0","") + "M";
}

// generate profile
function generateProfile() {
  const username = document.getElementById("username").value || "username";
  const posts = document.getElementById("posts").value || 0;
  const followers = document.getElementById("followers").value || 0;
  const following = document.getElementById("following").value || 0;
  const photo = document.getElementById("photo").files[0];

  document.getElementById("name").innerText = username;
  document.getElementById("postText").innerText = formatNumber(posts);
  document.getElementById("followerText").innerText = formatNumber(followers);
  document.getElementById("followingText").innerText = formatNumber(following);

  if (photo) {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById("profileImg").src = e.target.result;
    };
    reader.readAsDataURL(photo);
  }
}

// download story (9:16 + watermark)
function downloadImage() {
  const card = document.getElementById("profile");

  html2canvas(card).then(canvas => {
    const storyCanvas = document.createElement("canvas");
    storyCanvas.width = 1080;
    storyCanvas.height = 1920;
    const ctx = storyCanvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 1080, 1920);

    const scale = Math.min(900 / canvas.width, 1200 / canvas.height);
    const w = canvas.width * scale;
    const h = canvas.height * scale;
    const x = (1080 - w) / 2;
    const y = (1920 - h) / 2;

    ctx.drawImage(canvas, x, y, w, h);

    // watermark
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = "#fff";
    ctx.font = "28px Arial";
    ctx.textAlign = "right";
    ctx.fillText("BadalCreations", 1040, 1880);
    ctx.globalAlpha = 1;

    const link = document.createElement("a");
    link.download = "insta-story-demo.png";
    link.href = storyCanvas.toDataURL("image/png");
    link.click();
  });
}

// theme toggle
function toggleTheme() {
  document.body.classList.toggle("light");
  const btn = document.querySelector(".theme-btn");
  btn.innerText = document.body.classList.contains("light") ? "🌙" : "☀️";
}
