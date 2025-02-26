import React from "react";
import "../templates/styles/EvaluacionCursoTemplate.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import imgEvaluacion from "../assets/img/caras/avatar_sonriente.webp";
import Title from "./components/Title";
import Subtitle from "./components/Subtitle";
import Paragraph from "./components/Paragraph";
import Instruction from "./components/Instruction";
import Button from "./components/Button";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function EvaluacionCurso() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const navigate = useNavigate();
  const isOnDivisor = useStore((state) => state.isOnDivisor);
  const handleGoBack = () => {
    // Navegar de vuelta a la última diapositiva
    navigate("/slides", { state: { returnFromEvaluation: true } });
  };
  return (
    <div
      className={`flex h-[100vh] bg-dark-color px-6 py-8 overflow-x-hidden `}
      style={{
        justifyContent: isMobile ? "start" : "center",
        alignItems: isMobile ? "start" : "center",
      }}
    >
      <div
        className="absolute bottom-0 right-1/2 md:right-auto md:left-0 md:top-1/2 md:bottom-auto group md:h-fit transform -translate-y-1/2 z-10 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer"
        onClick={handleGoBack}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="4x"
          className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
        />
      </div>
      <div
        className="flex md:flex-row items-center justify-center w-full max-w-6xl relative"
        style={{
          left: isMobile ? "0" : "4rem",
          flexDirection: isMobile ? "column" : "row",
          top: isMobile ? "0" : "0",
        }}
      >
        {/* Columna Izquierda (Texto) */}
        <div className="md:w-1/2 w-full max-w-md mb-8 md:mb-0 text-white text-center md:text-left">
          <div className="mb-6 flex justify-center items-center">
            <Title>EVALUACIÓN</Title>
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            Ahora vamos a ver cuánto has aprendido. Al hacer clic afirmas que
            eres la misma persona que ha realizado este curso, y que va a
            presentar la evaluación.
          </Paragraph>
          <div className="w-auto justify-center items-center">
            <Instruction arrow="down" theme="dark" className="my-4">
              {localStorage.getItem("porcentaje") >= 70
                ? "Alcanzaste el puntaje mínimo del 70% y desbloqueaste la evaluación finals."
                : "Tu puntaje actual es del " +
                  localStorage.getItem("porcentaje") +
                  "%. No puedes presentar la Evaluación, revisa el módulo y vuelve a intentarlo."}
            </Instruction>
          </div>
          {localStorage.getItem("porcentaje") >= 70 ? (
            <div className=" flex justify-center items-center">
              <button className="flex justify-center items-center bg-button-color hover:bg-button-color/80 rounded-full px-6 py-2 text-white mx-auto md:mx-0 my-4 transition duration-300">
                <i className="fa fa-check mr-2"></i> Iniciar
              </button>
            </div>
          ) : null}
          <Paragraph
            theme="dark"
            justify={isMobile ? "justify" : "justify"}
            className="mt-4"
          >
            Recuerda que debes superar el 70% de la valoración para aprobar el
            módulo.
          </Paragraph>
        </div>

        {/* Columna Derecha (Imagen Holográfica) */}
        <div className="md:w-1/2 w-full md:w-[50%] flex justify-center items-center mt-8 md:mt-0">
          <div className="hologram-container">
            <div className="hologram-image">
              <img
                src={imgEvaluacion}
                alt="Trabajador con Diploma"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hologram-ring"></div>
            <div className="hologram-dots"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hologram-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
        }
        .hologram-image {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background-color: #093b5a;
        }
        .hologram-ring {
          position: absolute;
          top: -5%;
          left: -5%;
          right: -5%;
          bottom: -5%;
          border: 2px solid #2dd4bf;
          border-radius: 50%;
          animation: rotate 20s linear infinite;
        }
        .hologram-dots {
          position: absolute;
          top: -10%;
          left: -10%;
          right: -10%;
          bottom: -10%;
          background-image: radial-gradient(
            circle,
            #093b5a 2px,
            transparent 2px
          );
          background-size: 20px 20px;
          opacity: 0.5;
          animation: rotate 30s linear infinite reverse;
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default EvaluacionCurso;
