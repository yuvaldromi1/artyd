document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
    }, index * 500);
  });

  const captions = document.querySelectorAll(".caption");
  captions.forEach((caption, i) => {
    setTimeout(() => {
      caption.style.opacity = 1;
      caption.style.transition = "opacity 2s ease-in-out";
    }, 2500 + i * 600);
  });

  let hue = 200;
  setInterval(() => {
    hue = (hue + 0.1) % 360;
    document.body.style.background = `linear-gradient(to bottom, hsl(${hue}, 80%, 95%), hsl(${
      (hue + 30) % 360
    }, 100%, 98%))`;
  }, 100);

  // ציור באוויר עם העכבר - Canvas Overlay (רק בדף index)
  if (window.location.pathname.includes("index.html")) {
    const drawCanvas = document.createElement("canvas");
    drawCanvas.style.position = "fixed";
    drawCanvas.style.top = 0;
    drawCanvas.style.left = 0;
    drawCanvas.style.width = "100vw";
    drawCanvas.style.height = "100vh";
    drawCanvas.style.pointerEvents = "none";
    drawCanvas.style.zIndex = 2000;
    drawCanvas.width = window.innerWidth;
    drawCanvas.height = window.innerHeight;
    document.body.appendChild(drawCanvas);
    let ctx = drawCanvas.getContext("2d");
    let drawing = false;
    let last = null;
    let lines = [];
    function fadeLines() {
      ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      lines = lines.filter((line) => {
        line.alpha -= 0.012;
        if (line.alpha > 0) {
          // אפקט אור זהוב זורם
          const grad = ctx.createLinearGradient(
            line.from.x,
            line.from.y,
            line.to.x,
            line.to.y
          );
          grad.addColorStop(0, `rgba(255, 245, 180, ${line.alpha})`); // זהב בהיר
          grad.addColorStop(0.5, `rgba(255, 220, 100, ${line.alpha * 0.9})`); // זהב עז
          grad.addColorStop(1, `rgba(255, 255, 220, ${line.alpha * 0.7})`); // לבן-צהוב
          ctx.strokeStyle = grad;
          ctx.shadowColor = "rgba(255, 220, 100, 0.7)";
          ctx.shadowBlur = 18 * line.alpha;
          ctx.lineWidth = 5 + 6 * line.alpha;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(line.from.x, line.from.y);
          ctx.lineTo(line.to.x, line.to.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
          return true;
        }
        return false;
      });
      requestAnimationFrame(fadeLines);
    }
    fadeLines();
    window.addEventListener("resize", () => {
      drawCanvas.width = window.innerWidth;
      drawCanvas.height = window.innerHeight;
    });
    document.addEventListener("pointerdown", (e) => {
      drawing = true;
      last = { x: e.clientX, y: e.clientY };
    });
    document.addEventListener("pointerup", (e) => {
      drawing = false;
      last = null;
    });
    document.addEventListener("pointermove", (e) => {
      if (!drawing) return;
      const curr = { x: e.clientX, y: e.clientY };
      lines.push({ from: { ...last }, to: { ...curr }, alpha: 1 });
      last = curr;
    });
  }
});

if (window.location.pathname.includes("painting.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const paintings = {
    1: {
      title: "שחר באגם",
      image: "../images/1.jpg",
      description:
        "האור הראשון החודר בין ענפי העצים משתקף במים הרדומים של הבוקר.",
    },
    2: {
      title: "צללים על פני הזמן",
      image: "../images/2.jpg",
      description: "הציור בוחן את תנועת השמש דרך עלים נושרים, כרמז למעבר הזמן.",
    },
    3: {
      title: "עץ באור סתיו",
      image: "../images/3.jpg",
      description: "רגע של התבוננות – כשהצבעים משתנים, אך השקט נשאר אותו שקט.",
    },
    4: {
      title: "שקט על שפת הנהר",
      image: "../images/4.jpg",
      description: "המים כמעט ואינם זזים – רק השתקפות העלים מגלה את הרוח.",
    },
    5: {
      title: "קרני ערב",
      image: "../images/5.jpg",
      description: "היום יורד באיטיות, אך הצבעים עדיין שרים בקצה השדה.",
    },
    6: {
      title: "שדות בגשם קל",
      image: "../images/6.jpg",
      description:
        "טיפות עדינות של גשם חורפי עוברות כמו מחשבות עמוקות על נוף מוכר.",
    },
    7: {
      title: "רוח על פני העלים",
      image: "../images/7.jpg",
      description: "רוח סתווית מפזרת את העלים – תנועה קלה על פני האדמה.",
    },
    8: {
      title: "חוף בלי צל",
      image: "../images/8.jpg",
      description: "הים בהיר, השמש חזקה – והצל נעלם מהחול.",
    },
    9: {
      title: "בין עונות",
      image: "../images/9.jpg",
      description:
        "הטבע לא החליט אם אביב או סתיו – צבעים משני הצדדים חיים יחד.",
    },
    10: {
      title: "שירת הזמן",
      image: "../images/10.jpg",
      description: "רגע לפני שקיעה – כאשר הזמן והצבע שרים יחד את שירת המעבר.",
    },
  };

  const painting = paintings[id];
  if (painting) {
    document.getElementById("title").innerText = painting.title;
    document.getElementById("image").src = painting.image;
    document.getElementById("description").innerText = painting.description;
  } else {
    document.getElementById("title");
  }
}

$(function () {
  $("body").ripples({
    resolution: 256,
    perturbance: 0.04,
  });
});
