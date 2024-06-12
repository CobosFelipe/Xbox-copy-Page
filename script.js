// Traer elementos del DOM
const cambioTexto = document.getElementById("cambioTexto");
const fondoVerde = document.getElementById("fondoVerde");
const ulDiv = document.getElementById("ulDiv");
const nuevoLi = document.getElementById("crearLi");
const mostrarOcultar = document.getElementById("mostrarOcultar");
const img = document.getElementById("imgMostrarOcultar");

// Elementos del carrousel
const images = document.querySelectorAll(".carrousel img");
const indicators = document.querySelectorAll(".carrousel-indicators span");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

// Funciones
// Primer punto
function cambiarTexto() {
  let nuevoTexto = prompt("Ingrese nuevo texto");
  cambioTexto.textContent = nuevoTexto;
}

// Segundo punto
function cambioColor() {
  fondoVerde.style.backgroundColor = "#316EA7";
}

function restaurarColor() {
  fondoVerde.style.backgroundColor = "#107c10";
}

function fuentes() {
  const parrafo = document.getElementById("parrafoCambio");
  const fuente = document.getElementById("selectorFuente");
  const fuenteSeleccionada = fuente.value;
  parrafo.style.fontFamily = fuenteSeleccionada;
}

// Tercer punto
function crearLi() {
  let liText = prompt("Ingrese una tarea");
  if (liText) {
    let li = document.createElement("li");
    li.innerText = liText;
    ulDiv.appendChild(li);
    li.addEventListener("click", function () {
      eliminarLi(li);
    });
  }
}

function eliminarLi(li) {
  let confirmación = window.confirm("Está apunto de eliminar un objeto de la lista, ¿Está seguro?");
  if (confirmación) {
    ulDiv.removeChild(li);
    window.alert("Elemento eliminado");
  }
}

// Cuarto punto
function toggler() {
  if (img.style.display === "none") {
    img.style.display = "block";
    mostrarOcultar.textContent = "Ocultar";
    console.log("if");
  } else {
    img.style.display = "none";
    mostrarOcultar.textContent = "Mostrar";
  }
}

// Quinto punto
function juego() {
  const jugador = {
    element: document.getElementById("jugador"),
    posicionVertical: 0,
    posicionHorizontal: 0,
    paso: 25,
    mover: function (direccion) {
      switch (direccion) {
        case "ArrowUp":
          this.posicionVertical = this.posicionVertical - this.paso;
          this.element.style.top = this.posicionVertical + "px";
          break;
        case "ArrowDown":
          this.posicionVertical = this.posicionVertical + this.paso;
          this.element.style.top = this.posicionVertical + "px";
          break;
        case "ArrowLeft":
          this.posicionHorizontal = this.posicionHorizontal - this.paso;
          this.element.style.left = this.posicionHorizontal + "px";
          break;
        case "ArrowRight":
          this.posicionHorizontal = this.posicionHorizontal + this.paso;
          this.element.style.left = this.posicionHorizontal + "px";
          break;
        default:
          break;
      }
    },
  };

  onkeydown = (key) => {
    jugador.mover(key.code);
  };
}
juego();

// Sexto punto
let currentIndex = 0;
let interval;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
    indicators[i].classList.toggle("active", i === index);
  });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function startcarrousel() {
  interval = setInterval(nextImage, 3000);
}

function pausecarrousel() {
  clearInterval(interval);
}

startcarrousel();

// Eventos activadores o triggers
// Primer punto
cambioTexto.addEventListener("click", function () {
  cambiarTexto();
});

// Segundo punto
fondoVerde.addEventListener("mouseover", function () {
  cambioColor();
});

fondoVerde.addEventListener("mouseout", function () {
  restaurarColor();
});

// Tercer punto
nuevoLi.addEventListener("click", function () {
  crearLi();
});

// Cuarto punto
mostrarOcultar.addEventListener("click", function () {
  toggler();
});

// Sexto punto
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
pauseBtn.addEventListener("click", () => {
  pausecarrousel();
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline";
});
resumeBtn.addEventListener("click", () => {
  startcarrousel();
  pauseBtn.style.display = "inline";
  resumeBtn.style.display = "none";
});
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
    pausecarrousel();
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "inline";
  });
});
