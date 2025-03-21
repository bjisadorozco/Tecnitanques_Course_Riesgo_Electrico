import { useEffect } from "react";
import useStore from "../../store";
import { initializeTooltips, reproducirAudio } from "../../assets/js/interactividad.js";
import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import imgSabiasQue from "../../assets/img/botones/no-olvides-color.webp";
import audioBienvenidos from "../../assets/audio/sld1_riesgo_electrico_ok.mp3";
import audio82Porciento from "../../../src/assets/audio/SLIP_82_porciento.mp3";
import audio11Porciento from "../../../src/assets/audio/SLIP_11_porciento.mp3";
import audio7Porciento from "../../../src/assets/audio/SLIP_7_porciento.mp3";
import ingeTecnitanques from "../../../src/assets/img/avatar_feliz.webp";
import "../../pages/slides/styles/BienvenidoModulo.css";

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

  // Función para detener todos los audios excepto el que se está reproduciendo
  const handleAudioPlay = (event) => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      if (audio !== event.target) {
        audio.pause();
        audio.currentTime = 0; // Reinicia el audio
      }
    });
  };

  return (
    // Contenedor principal con altura ajustada
    <div className="flex flex-col md:flex-row alt-sld w-full overflow-x-hidden mb-36 md:mb-0">
      {/* Columna izquierda */}
      <div className="md:w-1/2 w-full md:h-screen bg-main-color py-6 md:py-3 px-[6px] md:px-[14px] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="my-4 text-center">
            <Title>Bienvenidos al módulo</Title>
            <Subtitle>de Riesgo eléctrico</Subtitle>
          </div>
          <div className="px-6 md:px-14 text-justify">
            <Paragraph justify="justify">
              De acuerdo con el NIOSH (El Instituto Nacional de Seguridad y Salud Ocupacional de Estados Unidos), los factores relacionados con ENERGÍAS PELIGROSAS que han ocasionado la muerte... son los siguientes:
              En Tecnitanques estamos comprometidos con tu Salud y tu Seguridad, por favor revisa atentamente este curso, puede SALVAR TU VIDA o la de un compañero tuyo en la operación.
            </Paragraph>
          </div>
          <div className="px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="dark">
              Haz clic para ejecutar el audio
            </Instruction>
          </div>
          <div>
            <audio controls className="media-espanol" onPlay={handleAudioPlay}>
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
            onPlay={handleAudioPlay}
          >
            <source src={audio82Porciento} type="audio/mp3" />
          </audio>
          <audio
            controls
            className="media-espanol"
            id="slip_11_porciento"
            hidden
            onPlay={handleAudioPlay}
          >
            <source src={audio11Porciento} type="audio/mp3" />
          </audio>
          <audio
            controls
            className="media-espanol"
            id="slip_7_porciento"
            hidden
            onPlay={handleAudioPlay}
          >
            <source src={audio7Porciento} type="audio/mp3" />
          </audio>
        </div>
      </div>
    </div>
  );
}

export default BienvenidosModulo;