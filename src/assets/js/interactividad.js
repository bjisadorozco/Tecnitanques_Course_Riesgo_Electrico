// Slider21 - componente PictogramasTipoClasificacion
// Función para cambiar la imagen al pasar el ratón por encima
export function onMouseOver(element, nuevaImagen) {
    // Obtener la imagen actual
    var imagen = element.querySelector(".inf2");
  
    // Guardar la imagen original en un atributo personalizado
    if (!imagen.dataset.originalImagen) {
      imagen.dataset.originalImagen = imagen.src;
    }
  
    // Cambiar la imagen al pasar el ratón por encima
    imagen.src = nuevaImagen;
  }
  
  // Función para restaurar la imagen original al quitar el ratón
export function onMouseOut(element) {
    var imagen = element.querySelector(".inf2");
  
    // Restaurar la imagen original
    if (imagen.dataset.originalImagen) {
      imagen.src = imagen.dataset.originalImagen;
    }
  }

//slider24
var correctCount4 = 0;
export function mostrarImagen(elemento, setImages, images) {
    const id = elemento.id; // Obtén el id del elemento clicado
    setImages({ ...images, [id]: !images[id] });
    correctCount4++;
    console.log(correctCount4);
    let interrogacion = elemento;
    let respuesta = elemento.nextElementSibling;

    // Ocultar el signo de interrogación
    interrogacion.style.display = "none";

    // Mostrar la imagen de respuesta
    respuesta.style.display = "inline";
   
    let correct = correctCount4;
    let total = 5;
    let percentage = (correctCount4 / total) * 100;;
    //activit_id se usa para controlar cada actividad dentro del módulo y del número de actividades dentro del curso
    let activity_id = 5;

    trackingManager_activities.getProgress(userId, courseId, module_id, fullName, percentage, activity_id);
    getProgressActivity(userId, courseId, module_id, fullName, percentage, activity_id, correct, total);
   
}

// BotonesTooltipsAudio
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export function initializeTooltips() {
  const buttons = document.querySelectorAll('.botonporcentaje');

  buttons.forEach((button) => {
    const value = button.getAttribute('value');
    let descripcion = '';

    switch (value) {
      case '1':
        descripcion = 'No cortar completamente la electricidad.';
        break;
      case '2':
        descripcion = 'No bloquear ni identificar con etiquetas los dispositivos de control de energía.';
        break;
      case '3':
        descripcion = 'Olvidar verificar que la energía haya sido cortada antes de empezar el trabajo.';
        break;
      default:
        break;
    }

    tippy(button, {
      content: descripcion,
      allowHTML: true,
      placement: 'top',
      hideOnClick: false, // Evita que se oculten al hacer clic
    });
  });
}

export function reproducirAudio(toggleSwitchId, audioIds) {
  const toggleSwitch = document.getElementById(toggleSwitchId);
  const audioElementos = audioIds.map(ids => ({
    esp: document.getElementById(ids.esp),
    ing: document.getElementById(ids.ing)
  }));

  function pausarTodosLosAudios() {
    audioElementos.forEach(audio => {
      if (audio.esp) {
        audio.esp.pause();
        audio.esp.currentTime = 0;
      }
      if (audio.ing) {
        audio.ing.pause();
        audio.ing.currentTime = 0;
      }
    });
  }

  document.querySelectorAll(".botonporcentaje").forEach(button => {
    button.addEventListener("click", function() {
      pausarTodosLosAudios();

      let indice = parseInt(this.id.slice(-1), 10) - 1; // Obtiene el índice del botón (1, 2 o 3)
      let audioActual = audioElementos[indice];
      if (audioActual) {
        if (toggleSwitch && toggleSwitch.checked) {
          audioActual.ing?.play();
        } else {
          audioActual.esp?.play();
        }
      } else {
        console.error("Audio no encontrado para el botón con ID:", this.id);
      }
    });
  });
}

// BienvenidoModuloOperacionSegura
// export function carrusel() {
//   let carrusel = document.getElementById("carrusel");
//   let images = [];

//   // Generar URLs de imágenes con un bucle
//   for (let i = 1; i <= 5; i++) {
//     let img = document.createElement("img");
//     img.src = `src/assets/img/slides_home/slide-${i}.png`;
//     carrusel.appendChild(img);
//     images.push(img);
//   }

//   let currentImageIndex = 0;

//   function changeImage() {
//     images[currentImageIndex].classList.remove("active-img");
//     currentImageIndex = (currentImageIndex + 1) % images.length;
//     images[currentImageIndex].classList.add("active-img");
//   }

//   images[currentImageIndex].classList.add("active-img");
//   // Cambiar la imagen cada dos segundos
//   setInterval(changeImage, 2100);
// }

// ExperimentandoAtrapamiento
import { useState, useEffect } from 'react';

// Hook personalizado para manejar la rotación de palabras
export const useWordRotation = (words) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return words[currentWordIndex];
};

// Hook personalizado para manejar la visualización de imágenes
export const useImageToggle = (initialState) => {
  const [imageShown, setImageShown] = useState(initialState);

  const mostrarImagen = (index) => {
    const updatedImageShown = [...imageShown];
    updatedImageShown[index] = true;
    setImageShown(updatedImageShown);
  };

  return [imageShown, mostrarImagen];
};
