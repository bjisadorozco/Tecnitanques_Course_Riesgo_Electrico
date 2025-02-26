import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import { faPaw, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { initializeTooltips, reproducirAudio } from "../../assets/js/interactividad.js";
import { useMediaQuery } from "react-responsive";
import imgSabiasQue from "../../assets/img/botones/no-olvides-color.webp";
import audioBienvenidos from "../../assets/audio/Sld_1_reflexionemos_v2.mp3";
import "../slides/styles/BienvenidosModulo.css";
import audio82Porciento from "../../../src/assets/audio/SLIP_82_porciento.mp3";
import audio11Porciento from "../../../src/assets/audio/SLIP_11_porciento.mp3";
import audio7Porciento from "../../../src/assets/audio/SLIP_7_porciento.mp3";
import ingeTecnitanques from "../../../src/assets/img/avatar_feliz.webp";
// import "../../assets/css/style.css"
import "../../pages/slides/styles/BienvenidoModulo.css"

function BienvenidosModulo() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  useEffect(() => {
    initializeTooltips();
    reproducirAudio("toggleSwitch", [
      { esp: "slip_82_porciento", ing: "slip_82_porciento_ingles" },
      { esp: "slip_11_porciento", ing: "slip_11_porciento_ingles" },
      { esp: "slip_7_porciento", ing: "slip_7_porciento_ingles" }
    ]);
  }, []);

  return (
    // Contenedor principal con altura ajustada
    <div className="flex flex-col md:flex-row alt-sld w-full overflow-x-hidden mb-36 md:mb-0">
      {/* Columna izquierda */}
      <div className="md:w-1/2 w-full bg-main-color py-6 md:py-3 px-[6px] md:px-[14px] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="my-4 text-center">
            <Title>Bienvenidos al módulo</Title>
            <Subtitle>de Riesgo eléctrico</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify="justify">
              De acuerdo con el NIOSH (El Instituto Nacional de Seguridad y Salud Ocupacional de Estados Unidos), los factores relacionados con ENERGÍAS PELIGROSAS que han ocasionado la muerte... son los siguientes:
              En Morelco estamos comprometidos con tu Salud y tu Seguridad, por favor revisa atentamente este curso, puede SALVAR TU VIDA o la de un compañero tuyo en la operación.
            </Paragraph>
          </div>
          <div className="px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="dark">
              Haz clic para ejecutar el audio
            </Instruction>
          </div>
          <div>
            <audio controls className="media-espanol">
              <source src={audioBienvenidos} type="audio/mp3" />
            </audio>
          </div>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center items-center py-8 md:py-0">
        <div className="flex flex-col justify-center items-center w-full max-w-[400px] mx-auto relative">
          <Instruction theme="light" arrow='down'>
            Toca los botones para obtener más información y reproducir el audio
          </Instruction>
          <div className="image-container relative w-full h-auto">
            <img
              src={ingeTecnitanques}
              alt="ingeniero"
              className="imagen-carl-respon md:w-full m-0"
            />
            <button className="botonporcentaje" id="boton1" value="1">
              82%
            </button>
            <button className="botonporcentaje" id="boton2" value="2">
              11%
            </button>
            <button className="botonporcentaje" id="boton3" value="3">
              7%
            </button>
          </div>
          <audio
            controls
            className="media-espanol"
            id="slip_82_porciento"
            hidden
          >
            <source src={audio82Porciento} type="audio/mp3" />
          </audio>
          <audio
            controls
            className="media-espanol"
            id="slip_11_porciento"
            hidden
          >
            <source src={audio11Porciento} type="audio/mp3" />
          </audio>
          <audio
            controls
            className="media-espanol"
            id="slip_7_porciento"
            hidden
          >
            <source src={audio7Porciento} type="audio/mp3" />
          </audio>
        </div>
      </div>
    </div>
  );
}

export default BienvenidosModulo;