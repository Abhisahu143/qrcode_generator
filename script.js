  // Create stars
  function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.setProperty('--twinkle-duration', Math.random() * 3 + 2 + 's');
        starsContainer.appendChild(star);
    }
}

// Initialize stars
createStars();

// QR Code functionality
const qrInput = document.getElementById('qr-input'),
    bgColorInput = document.querySelector(".bg-color"),
    fgColorInput = document.querySelector(".fg-color"),
    generateBtn = document.getElementById("generate-btn"),
    qrContainer = document.querySelector(".qr-code"),
    qrImg = qrContainer.querySelector("img"),
    downloadBtn = document.getElementById("download-btn");

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue) {
        qrInput.classList.add('border-red-500');
        qrInput.classList.add('shake');
        setTimeout(() => {
            qrInput.classList.remove('border-red-500');
            qrInput.classList.remove('shake');
        }, 1000);
        return;
    }
    
    generateBtn.textContent = "Generating...";
    generateBtn.disabled = true;
    
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}&bgcolor=${bgColorInput.value.substring(1)}&color=${fgColorInput.value.substring(1)}`;
    
    qrImg.addEventListener("load", () => {
        qrContainer.style.opacity = "1";
        generateBtn.textContent = "Generate QR Code";
        generateBtn.disabled = false;
    });
});

downloadBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(qrImg.src);
        const blob = await response.blob();
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
        alert("Failed to download QR code. Please try again.");
    }
});

qrInput.addEventListener("input", () => {
    if(!qrInput.value.trim()) {
        qrContainer.style.opacity = "0";
    }
});