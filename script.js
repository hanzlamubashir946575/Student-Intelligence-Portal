const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const columns = canvas.width / 20;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00f2ff";
    ctx.font = "15px monospace";
    drops.forEach((y, i) => {
        const text = String.fromCharCode(Math.random() * 128);
        ctx.fillText(text, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(draw, 50);

function initiateScan() {
    const roll = document.getElementById('rollInp').value.trim();
    if(!roll) return alert("Please enter Student ID!");
    document.getElementById('resultPanel').style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        processData(roll);
    }, 2500);
}

function processData(roll) {
    const isHanzla = roll.toLowerCase().includes("336");
    const data = {
        sgpa: isHanzla ? "3.88" : (Math.random() * (3.9 - 3.2) + 3.2).toFixed(2),
        cgpa: isHanzla ? "3.85" : (Math.random() * (3.8 - 3.1) + 3.1).toFixed(2),
        attendance: isHanzla ? "96%" : Math.floor(Math.random() * (98 - 80) + 80) + "%",
        behavior: isHanzla ? "EXEMPLARY" : "PROFESSIONAL",
        subjects: {
            "DBMS": isHanzla ? "4.0" : (Math.random() * (4.0 - 3.0) + 3.0).toFixed(1),
            "Linear Algebra": isHanzla ? "3.7" : (Math.random() * (4.0 - 3.0) + 3.0).toFixed(1),
            "Operating System": isHanzla ? "3.9" : (Math.random() * (4.0 - 3.0) + 3.0).toFixed(1),
            "Civic Engagement": isHanzla ? "4.0" : (Math.random() * (4.0 - 3.0) + 3.0).toFixed(1),
            "Entrepreneurship": isHanzla ? "3.8" : (Math.random() * (4.0 - 3.0) + 3.0).toFixed(1),
            "Theory of Automata": isHanzla ? "3.7" : (Math.random() * (4.0 - 3.0) + 3.0).toFixed(1)
        }
    };
    document.getElementById('sgpaOut').innerText = data.sgpa;
    document.getElementById('cgpaOut').innerText = data.cgpa;
    document.getElementById('attendOut').innerText = data.attendance;
    document.getElementById('behavOut').innerText = data.behavior;
    let subHtml = "";
    for(let s in data.subjects) {
        subHtml += `<div class="sub-box"><div class="sub-name">${s}</div><div class="sub-grade">${data.subjects[s]}</div></div>`;
    }
    document.getElementById('subjectOut').innerHTML = subHtml;
    document.getElementById('resultPanel').style.display = 'block';
}