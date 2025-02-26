import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Divisor1 from '../../assets/img/fondo01.webp';
import Divisor2 from '../../assets/img/fondo01.webp';
import Divisor3 from '../../assets/img/fondo01.webp';
import imgDivisorMobile1 from '../../assets/img/fondo01.webp';
import imgDivisorMobile2 from '../../assets/img/fondo01.webp';
import imgDivisorMobile3 from '../../assets/img/fondo01.webp';
import useStore from "../../store";
import BienvenidosModulo from "../../pages/slides/BienvenidosModulo";
import EstructuraTematica from "../../pages/slides/EstructuraTematica";
import DivisorMomentos from "../../pages/slides/DivisorMomentos";
import ExperimentadoAtrapamiento from "../../pages/slides/ExperimentadoAtrapamiento";
import SeisTiposEnergiasPeligrosas from "../../pages/slides/SeisTiposEnergiasPeligrosas";
import RegulacionRiesgoQuimico from "../slides/RegulacionRiesgoQuimico";
import LaClaveEnergiaCero from "../slides/LaClaveEnergiaCero";
import BloquearEtiquetar from "../slides/BloquearEtiquetar";
import ReconoceElementosKitBloqueo from "../slides/ReconoceElementosKitBloqueo";
import DivierteteRelacionaCandados from "../slides/DivierteteRelacionaCandados";
import ProcedimientoLOTO from "../slides/BloqueoEtiquetado";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setArrayValidacionTraking, getArrayValidacionTraking, setPorcentajeTraking, getPorcentajeTraking } from "../../traking";

const EmployeeDataUpdateProg = () => {
  const params = new URLSearchParams(window.location.search);
  axios.get('../../../data_user.php',
    {
      params: { // Aquí agregamos los parámetros a la URL
        course_code: params.get('course_code'),
        uid: params.get('uid'),
        mid: params.get('mid')
      }
    }
  )
    .then((response) => {
      console.log(response.data.data.user_id);
      const datos = response.data;
      axios.post('../../../react_update_progress.php', {
        progress: getPorcentajeTraking(), // Enviar parámetros en el cuerpo de la solicitud
        module_id: params.get('mid'),
        unique_course_id: params.get('uid'),
        asistencia_id: datos.data.user_id,
        react_progress_object: JSON.stringify(getArrayValidacionTraking())
      })
        .then((response) => {
          const datos = response;
          console.log(datos);
        })
        .catch((error) => {
          console.error('Error al obtener los datos:', error); // Imprime el error
        });
    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error); // Imprime el error
    });
};

const addNumber = (number) => {
  const storedArray = getArrayValidacionTraking() || [];
  if (!storedArray.includes(number)) {
    const updatedNumbers = [...storedArray, number];
    setArrayValidacionTraking(updatedNumbers);
  }
};

function SlideNavigator() {
  const slides = [
    <BienvenidosModulo key="BienvenidosModulo" />,
    <EstructuraTematica key="EstructuraTematica" />,
    <DivisorMomentos
      background={Divisor1}
      mobileBackground={imgDivisorMobile1}
      index={6}
      line1="La Energía"
      line2="En Nuestro"
      line3="Trabajo"
      momento="Momento 1"
      key="DivisorMomentos"
    />,
    <ExperimentadoAtrapamiento key="ExperimentadoAtrapamiento" />,
    <SeisTiposEnergiasPeligrosas key="SeisTiposEnergiasPeligrosas" />,
    <RegulacionRiesgoQuimico key="RegulacionRiesgoQuimico" />,
    <DivisorMomentos
      background={Divisor2}
      mobileBackground={imgDivisorMobile2}
      index={6}
      line1="Principios del"
      line2="Bloqueo y Etiquetado"
      line3="(LOTO)"
      momento="Momento 2"
      key="DivisorMomentos"
    />,
    <LaClaveEnergiaCero key="LaClaveEnergiaCero" />,
    <BloquearEtiquetar key="BloquearEtiquetar" />,
    <ReconoceElementosKitBloqueo key="ReconoceElementosKitBloqueo" />,
    <DivierteteRelacionaCandados key="DivierteteRelacionaCandados" />,
    <DivisorMomentos
      background={Divisor3}
      mobileBackground={imgDivisorMobile3}
      index={6}
      line1="Procedimiento de"
      line2="Bloqueo y Etiquetado"
      line3="(LOTO)"
      momento="Momento 3"
      key="DivisorMomentos"
    />,
    <ProcedimientoLOTO key="ProcedimientoLOTO" />,
  ];

  const setSlideIndex = useStore((state) => state.setSlideIndex);
  const slideIndex = useStore((state) => state.slideIndex);
  const setTotalSlides = useStore((state) => state.setTotalSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setCurrentProgress = useStore((state) => state.setCurrentProgress);
  const isOnDivisor = useStore((state) => state.isOnDivisor);
  const [numbersArray, setNumbers] = useState([]);
  const navigate = useNavigate();


  // Función para hacer scroll al Header y al slide actual
  const scrollToSlide = () => {
    if (window.innerWidth <= 768) { // Solo en móviles
      const headerElement = document.getElementById("slide-Header"); // Obtén el Header
      if (headerElement) {
        headerElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll al Header
      }

      const slideId = `slide-${slides[currentSlide].key}`; // Construye el ID del slide actual
      const slideElement = document.getElementById(slideId); // Obtén el elemento del slide
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll al inicio del slide
      }
    }
  };

  // Efecto para hacer scroll cuando cambia el slide
  useEffect(() => {
    scrollToSlide();
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

    if (currentSlide === slides.length - 1) {
      null;
    } else {
      setSlideIndex(currentSlide + 1);
      if (slides.length === 0) {
        setPorcentajeTraking(0);
      } else {
        addNumber(parseInt(currentSlide + 2))
        const storedArray = getArrayValidacionTraking() || [];
        const sum = storedArray.length;
        console.log(sum);
        const porcentaje = (sum / parseInt(slides.length)) * 100;
        setPorcentajeTraking(parseInt(porcentaje))
        EmployeeDataUpdateProg();
      }
    }
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    if (currentSlide === 0) {
      null;
    } else {
      setSlideIndex(currentSlide - 1);
      if (slides.length === 0) {
        setPorcentajeTraking(0);
      } else {
        if (parseInt(currentSlide - 1) != 0) {
          addNumber(parseInt(currentSlide - 1));
          const storedArray = getArrayValidacionTraking() || [];
          const sum = storedArray.length;
          console.log(sum);
          const porcentaje = (sum / parseInt(slides.length)) * 100;
          setPorcentajeTraking(parseInt(porcentaje));
          EmployeeDataUpdateProg();
        }
      }
    }
  };

  // set progress from 0 to 100 based on currentSlide
  const setProgress = (currentSlide) => {
    const progress = (currentSlide / (slides.length - 1)) * 100;
    setCurrentProgress(parseInt(progress));
  };

  useEffect(() => {
    setCurrentSlide(slideIndex);
    setProgress(slideIndex);
  }, [slideIndex, setCurrentSlide]);

  useEffect(() => {
    setTotalSlides(slides.length);
  }, []);

  return (
    <div
      className="relative p-0 m-0"
    // style={{ height: "94vh", overflowX: "hidden" }}
    >
      {currentSlide === 0 ? null : (
        <div
          className="absolute  bottom-0 right-1/2 md:right-auto md:left-0 md:top-1/2 md:bottom-auto group md:h-fit transform -translate-y-1/2 z-10 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer"
          onClick={prevSlide}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div className="flex justify-between w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-full mx-1 my-0 hover:cursor-pointer ${currentSlide >= index ? "bg-color-verde " : "bg-main-color/30"} `}
            onClick={() => {
              addNumber(parseInt(index + 1));
              const storedArray = getArrayValidacionTraking() || [];
              const sum = storedArray.length;
              const porcentaje = (sum / parseInt(slides.length)) * 100;
              setPorcentajeTraking(parseInt(porcentaje));
              setCurrentSlide(index);
              setSlideIndex(index);
            }}
          ></div>
        ))}
      </div>
      {currentSlide === slides.length - 1 ? (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={() => navigate('/evaluación')}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      ) : (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={nextSlide}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div
        className="overflow-hidden p-0 m-0 w-screen hide-scrollbar"
      // style={{ height: "100vh" }}
      >
        {slides[currentSlide]}
      </div>
    </div>
  );
}

export default SlideNavigator;
