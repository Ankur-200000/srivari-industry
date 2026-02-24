const canvas = document.getElementById('assembly-canvas');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const speed = 1.0;          
const spacing = 260;        
const boxSize = 40;         
const maxBoxHeight = 50;    
const beltGap = 280;        

const cTop = '#e7c39f';     
const cLeft = '#d3a87c';    
const cRight = '#b88a5a';   
const beltTop = '#f1f5f9';  
const beltSide = '#e2e8f0'; 

const angle = Math.PI / 6; 
const isoCos = Math.cos(angle);
const isoSin = Math.sin(angle);

function drawIsoBox(cx, cy, size, hSize) {
    const dx = isoCos * size;
    const dy = isoSin * size;
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineJoin = 'round';

    ctx.beginPath(); ctx.moveTo(cx, cy - hSize); ctx.lineTo(cx + dx, cy - dy - hSize); ctx.lineTo(cx, cy - 2 * dy - hSize); ctx.lineTo(cx - dx, cy - dy - hSize); ctx.closePath();
    ctx.fillStyle = cTop; ctx.fill(); ctx.stroke();

    ctx.beginPath(); ctx.moveTo(cx, cy - hSize); ctx.lineTo(cx - dx, cy - dy - hSize); ctx.lineTo(cx - dx, cy - dy); ctx.lineTo(cx, cy); ctx.closePath();
    ctx.fillStyle = cLeft; ctx.fill(); ctx.stroke();

    ctx.beginPath(); ctx.moveTo(cx, cy - hSize); ctx.lineTo(cx + dx, cy - dy - hSize); ctx.lineTo(cx + dx, cy - dy); ctx.lineTo(cx, cy); ctx.closePath();
    ctx.fillStyle = cRight; ctx.fill(); ctx.stroke();
}

function drawBelt(startX, startY, length, width) {
    const dx = isoCos;
    const dy = isoSin;
    
    ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(startX + width * dx, startY - width * dy); ctx.lineTo(startX + width * dx - length * dx, startY - width * dy + length * dy); ctx.lineTo(startX - length * dx, startY + length * dy); ctx.closePath();
    ctx.fillStyle = beltTop; ctx.fill();
    
    ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(startX - length * dx, startY + length * dy); ctx.lineTo(startX - length * dx, startY + length * dy + 12); ctx.lineTo(startX, startY + 12); ctx.closePath();
    ctx.fillStyle = beltSide; ctx.fill();
}

let offset = 0;

function animate() {
    ctx.clearRect(0, 0, w, h);
    offset = (offset + speed) % spacing;
    
    const beltLength = w + h + 500; 
    const beltWidth = 65;
    const numBelts = Math.ceil((w + h) / beltGap) + 2; 

    const foldDistance = speed * 60 * 5; 

    for (let b = numBelts; b >= -2; b--) {
        let lineX = b * beltGap;
        let lineY = -150; 
        
        drawBelt(lineX, lineY, beltLength, beltWidth);

        let pos_top = (0 - lineY) / isoSin + (beltWidth / 2);
        let pos_right = (lineX - w) / isoCos + (beltWidth / 2);
        let entryPos = Math.max(pos_top, pos_right);
        
        const numBoxes = Math.ceil(beltLength / spacing) + 1;
        
        for (let i = -1; i < numBoxes; i++) {
            let pos = i * spacing + offset;
            let bx = lineX - pos * isoCos + (beltWidth/2 * isoCos);
            let by = lineY + pos * isoSin - (beltWidth/2 * isoSin);
            let currentHeight = 4; 
            
            if (pos > entryPos) {
                let foldProgress = Math.min(1, (pos - entryPos) / foldDistance);
                currentHeight = 4 + (foldProgress * (maxBoxHeight - 4));
            }
            
            drawIsoBox(bx, by, boxSize, currentHeight);
        }
    }
    requestAnimationFrame(animate);
}

animate();

// Mobile Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconBars = document.getElementById('menu-icon-bars');
    const iconClose = document.getElementById('menu-icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        // Toggle menu on button click
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconBars.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });

        // Close menu automatically when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconBars.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }
});

// FAQ Accordion Toggle
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('svg');
        
        // Toggle the hidden class
        content.classList.toggle('hidden');
        
        // Rotate the icon
        icon.classList.toggle('rotate-180');
    });
});

// "View All" FAQ logic
const viewAllBtn = document.getElementById('view-all-faqs');
const extraFaqs = document.getElementById('extra-faqs');

if(viewAllBtn && extraFaqs) {
    viewAllBtn.addEventListener('click', () => {
        extraFaqs.classList.remove('hidden');
        viewAllBtn.classList.add('hidden'); // Hide button after expansion
    });
}