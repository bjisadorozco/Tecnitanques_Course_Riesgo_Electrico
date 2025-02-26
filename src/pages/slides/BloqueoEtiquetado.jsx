import React, { useEffect } from "react";
import useStore from "../../store";
import SwiperComponent from "../components/SwiperBloqueoEtiquetado";
import Subtitle from "../components/Subtitle";

// Import images
import slide1 from "../../assets/img/carrusel/slider1.png";
import slide2 from "../../assets/img/carrusel/slider2.png";
import slide3 from "../../assets/img/carrusel/slider3.png";
import slide4 from "../../assets/img/carrusel/slider4.png";
import slide5 from "../../assets/img/carrusel/slider5.png";
import slide6 from "../../assets/img/carrusel/slider6.png";

// Import audio files
import audio1Esp from "../../assets/audio/sld_17_Preparacion_para_apagado.mp3";
import audio2Esp from "../../assets/audio/sld_17_Apagado_maquinas_equipos.mp3";
import audio3Esp from "../../assets/audio/sld_17_aislamiento_maquinas_equipos.mp3";
import audio4Esp from "../../assets/audio/sld17_aseguramiento_y_etiquetado.mp3";
import audio5Esp from "../../assets/audio/sld17_energia_residual.mp3";
import audio6Esp from "../../assets/audio/sld17_Liberacion-seguros-etiquetas.mp3";

import "../slides/styles/BloqueoEtiquetado.css";
import Paragraph from "../components/Paragraph";

const ProcedimientoLOTO = () => {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const slidesNoText = [
    {
      imgSrc: slide1,
      title: "1. Preparación para apagado",
      text: '',
      audioEsp: audio1Esp,
    },
    {
      imgSrc: slide2,
      title: "2. Apagado de máquinas o equipos",
      text: '',
      audioEsp: audio2Esp,
    },
    {
      imgSrc: slide3,
      title: "3. Aislamiento de máquinas o equipos",
      text: '',
      audioEsp: audio3Esp,
    },
    {
      imgSrc: slide4,
      title: "4. Aseguramiento y etiquetado",
      text: '',
      audioEsp: audio4Esp,
    },
    {
      imgSrc: slide5,
      title: "5. Energía Residual",
      text: '',
      audioEsp: audio5Esp,
    },
    {
      imgSrc: slide6,
      title: "6. Liberación de seguros y etiquetas",
      text: '',
      audioEsp: audio6Esp,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Left Column */}
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full sm:h-screen py-6 px-2 sm:px-24 flex-col justify-center items-center">
        <div className="md:h-[90vh] my-auto flex flex-col justify-center items-center">
          <h1 className="text-white text-center font-bold text-title-size mt-6">
            Revisemos el procedimiento de bloqueo y etiquetado
          </h1>
          <Subtitle>¡Conoce los pasos!</Subtitle>
          <div className=" md:mx-24 my-3 mb-3 text-justify">
            <Paragraph justify="justify">
              El procedimiento de bloqueo y etiquetado es fundamental para garantizar la seguridad durante el mantenimiento
              de equipos. A continuación, exploraremos los seis pasos esenciales que componen este proceso crítico de seguridad.
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full md:h-screen py-6 flex justify-center items-center">
        <div className="row mx-auto" style={{ maxWidth: "1000px" }}>
          <div className="md:h-[80vh] h-[50vh] w-[100vw] md:w-[40vw] m-0">
            <SwiperComponent slides={slidesNoText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcedimientoLOTO;