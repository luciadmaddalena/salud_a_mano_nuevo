//=================== Tarjeta 1
// Lista de rutas de imágenes para carrusel de la tarjeta 1
const imagesCard1 = [
  "../assets/img/brandsen.png",  
  "../assets/img/catedral.png"
];

let indexCard1 = 0;

// Referencia al <img> en la tarjeta 1
const imgCard1 = document.getElementById("img-ciudad");

// Actualización de imagen mostrada
function updateImageCard1() {
  imgCard1.src = imagesCard1[indexCard1];
}

// Función para ir a la siguiente imagen (circular)
function nextImageCard1() {
  indexCard1 = (indexCard1 + 1) % imagesCard1.length;
  updateImageCard1();
}

// Inicia el carrusel automático (puede ajustar el tiempo)
let intervalCard1 = setInterval(nextImageCard1, 1500); // 2 segundos

// === Selección de ciudad para Tarjeta 1
const ciudades = ["Brandsen", "La Plata"];
const selectCiudad = document.getElementById("ciudad-select");
const carruselCard1 = document.querySelector(".card-1 .carrusel-ciudades");

// Detener el carrusel cuando se selecciona una ciudad
selectCiudad.addEventListener("change", (e) => {
  const valor = e.target.value;
  const idx = ciudades.indexOf(valor);

  if (idx !== -1) {
    // Ciudad válida seleccionada
    clearInterval(intervalCard1);
    intervalCard1 = null;

    indexCard1 = idx;
    updateImageCard1();

    // Aplica resaltado
    carruselCard1.classList.remove("selected");
    void carruselCard1.offsetWidth; // reinicia animación
    carruselCard1.classList.add("selected");

  } else {
    // Si se vuelve a la opción vacía, reiniciar carrusel
    if (!intervalCard1) {
      intervalCard1 = setInterval(nextImageCard1, 1500);
    }
    carruselCard1.classList.remove("selected");
  }
});





// ===================Tarjeta 2
// Lista de especialidades
const especialidades = [
  "Alergología",
  "Cardiología",
  "Dermatología",
  "Clínica médica",
  "Endocrinología",
  "Gastroenterología",
  "Ginecología",
  "Medicina familiar",
  "Nefrología",
  "Neumonología",
  "Neurología",
  "Odontología",
  "Oftalmología",
  "Oncología",
  "Otorrinolaringología",
  "Pediatría",
  "Psiquiatría",
  "Reumatología",
  "Traumatología",
  "Urología"
]

// Lista de rutas de las imágenes
const images = [
  "../assets/img/alergologia_.png",
  "../assets/img/cardiologia.png",
  "../assets/img/dermatologia.png",
  "../assets/img/clinica_medica.png",
  "../assets/img/endocrinologia.png",
  "../assets/img/gastroenterologia.png",
  "../assets/img/ginecologia.png",
  "../assets/img/medicina_familiar.png",
  "../assets/img/nefrologia.png",
  "../assets/img/neumonologia.png",
  "../assets/img/neurologia.png",
  "../assets/img/odontologia.png",
  "../assets/img/oftalmologia.png",
  "../assets/img/oncologia.png",
  "../assets/img/otorrinolaringologia.png",
  "../assets/img/pediatria.png", 
  "../assets/img/psiquiatria.png",
  "../assets/img/reumatologia.png",
  "../assets/img/traumatologia.png",
  "../assets/img/urologia.png",
];

let currentIndex = 0;

// Guarda el interval en una variable
// cambiar imagen automáticamente cada x segundos/
let intervalId = setInterval(nextImage, 1700);

// Seleccionamos la imagen por su ID
const imgElement = document.getElementById("img-1");

// Función para actualizar la imagen mostrada
function updateImage() {
  imgElement.src = images[currentIndex];
}
// Botón de siguiente imagen
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length; // Avanza y vuelve al inicio
  updateImage();
}
// Botón de imagen anterior
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Retrocede de forma segura
  updateImage();
} 

// 
const selectEsp = document.getElementById("specialidad-select");
/* const selectEsp = document.getElementById("specialidad-select"); */
const carruselEl = document.querySelector(".card-2 .carrusel");

// Detener el carrusel cuando se seleccione una especialidad
selectEsp.addEventListener("change", (e) => { //Se agrega un listener al select para detectar cambios de opción
  const valor = e.target.value; // Se obtiene el valor elegido en el select. e.target: es el <select>,.value: opción elegida
  const idx = especialidades.indexOf(valor); // Se busca en qué posición del array 'especialidades' está ese valor

  if (idx !== -1) { //Si no está, indexOf devuelve -1. 
    // Si idx != -1, el usuario eligió una especialidad válida
    clearInterval(intervalId); // se detiene la rotación automática
    intervalId = null; // ya no hay timer activo

    // Cambiar la imagen y resaltar
    currentIndex = idx; // actualiza qué índice de imagen se está mostrando
    updateImage(); // cambia la <img> del carrusel a images[currentIndex]
    carruselEl.classList.remove("selected"); // Aplica el css para resaltar la imagen de la especialidad seleccionada
    void carruselEl.offsetWidth; // reinicia el carrusel
    carruselEl.classList.add("selected");

  } else {
    // Si el usuario vuelve a la opción vacía, se reinicia el carrusel 
    if (!intervalId) {
      intervalId = setInterval(nextImage, 1500);
    }
    carruselEl.classList.remove("selected"); // Quita el resaltado
  }
});


// =================Mapa=================== //
document.addEventListener("DOMContentLoaded", function () {
  // 1) Inicializo Leaflet
  const map = L.map("mapa").setView([-34.6037, -58.3816], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  setTimeout(() => map.invalidateSize(), 300);

  // 2) se cargan datos de centros de salud
  fetch("../assets/data/centros_salud.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar JSON");
      return res.json();
    })
    .then(data => {
      // función que tiene acceso a `map` y a `data`
      function actualizarMapa(ciudad, especialidad) {
        // a) se quitan los marcadores viejos
        map.eachLayer(layer => {
          if (layer instanceof L.Marker) map.removeLayer(layer);
        });

        // b) se filtran los centros
        const resultados = data.filter(c =>
          c.ciudad === ciudad && c.especialidades.includes(especialidad)
        );

        // c) se crean los nuevos marcadores
        resultados.forEach(centro => {
          const marker = L.marker(centro.coordenadas).addTo(map);
          // se quita cualquier popup previo y se enlaza uno nuevo
          marker
          .bindPopup(`<b>${centro.nombre}</b><br>${centro.especialidades.join(", ")}`)
          .on("click", () => {
          seleccionarCentro(centro);
          });
        });

        // d) se ajusta el zoom para que quepan todos
        if (resultados.length) {
          map.fitBounds(resultados.map(c => c.coordenadas));
        }
      }

      // 3) Interactividad con los select
      const ciudadSelect = document.getElementById("ciudad-select");
      const especialidadSelect = document.getElementById("specialidad-select");

      // cambi0 de ciudad
      ciudadSelect.addEventListener("change", () => {
      const ciudad       = ciudadSelect.value;
      const especialidad = especialidadSelect.value;
      if (ciudad && especialidad) actualizarMapa(ciudad, especialidad);
    });


      // cambio de especialidad
      especialidadSelect.addEventListener("change", () => {
      const ciudad       = ciudadSelect.value;
      const especialidad = especialidadSelect.value;
      if (ciudad && especialidad) actualizarMapa(ciudad, especialidad);
    });

  })  

  .catch(err => console.error(err));

  // 4) Variables y funciones para seleccionar un centro y mostrar su info
  let centroSeleccionado = null;

  function seleccionarCentro(centro) {
    centroSeleccionado = centro;
    mostrarInfoCentro();
  }

  function mostrarInfoCentro() {
    const cont = document.getElementById("info-centro");
    const titulo = document.getElementById("titulo-info"); 
    if (!centroSeleccionado) { 
      // Si no hay ningún centro seleccionado se muestra el título
      titulo.style.display = ""; 
      cont.innerHTML = "";
      return;
    }
    //Ocultar el título para que se muestre solo la info
    titulo.style.display = "none";

    // Datos que se van a mostrar en la tarjeta 4
    cont.innerHTML = `
      <h3>${centroSeleccionado.nombre}</h3>
      <p><strong>Ciudad:</strong> ${centroSeleccionado.ciudad}</p>
      <p><strong>Especialidades:</strong> ${centroSeleccionado.especialidades.join(", ")}</p>
      <p><strong>Turnos:</strong> ${centroSeleccionado.turnos}</p> 
      <a href="https://www.google.com/maps/search/?api=1&query=${centroSeleccionado.coordenadas[0]},${centroSeleccionado.coordenadas[1]}"
         target="_blank">Ver en Google Maps</a>
    `;
    // Desplazar a la tarjeta 4
    document.getElementById("card-4")
            .scrollIntoView({ behavior: "smooth" });
  }
});
