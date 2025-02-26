import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import useStore from "../../store";
import imgIngeMorelco from "../../assets/img/caras/avatar_feliz.webp";
import audioQueEsUnaCarga from "../../assets/audio/que-es-peligro.mp3";
// Importar imágenes de peligros
import imgPeligro1 from "../../assets/img/peligro-1-sld6.webp";
import imgPeligro2 from "../../assets/img/peligro-2-sld6.webp";
import imgPeligro3 from "../../assets/img/peligro-3-sld6.webp";
import imgPeligro4 from "../../assets/img/peligro-4-sld6.webp";
import imgPeligro5 from "../../assets/img/peligro-5-sld6.webp";
import imgPeligro6 from "../../assets/img/peligro-6-sld6.webp";
import imgPeligro7 from "../../assets/img/peligro-7-sld6.webp";
import imgPeligro8 from "../../assets/img/peligro-8-sld6.webp";
import imgPeligro9 from "../../assets/img/pregunta-sld9.webp";
// Importar audios
import audioFisico from "../../assets/audio/sld6_fisico.mp3";
import audioQuimico from "../../assets/audio/sld6_quimicos.mp3";
import audioBiologico from "../../assets/audio/sld6_biologicos.mp3";
import audioPsicosocial from "../../assets/audio/sld6_riesgo_psicosical.mp3";
import audioBiomecanico from "../../assets/audio/sld6_biomecanicos.mp3";
import audioSeguridad from "../../assets/audio/sld6_condiciones_seguridad.mp3";
import audioNatural from "../../assets/audio/sld6_fenomenos_naturales.mp3";
import audioMecanico from "../../assets/audio/sld6_mecanicos.mp3";
import audioPeigro from "../../assets/audio/que-es-peligro.mp3";

import "../../pages/slides/styles/ProfundicemosQueEsUnaCarga.css";

export default function ProfundicemosQueEsUnPeligro() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isMobile, setIsMobile] = useState(false);
  const [activeAudio, setActiveAudio] = useState(null);
  const audioRefs = useRef({});

  const hazardCards = [
    {
      image: imgPeligro9,
      title: "¿Qué es un peligro?",
      description: "Haz clic para ejecutar el audio.",
      audio: audioPeigro,
    },
    {
      image: imgPeligro1,
      title: "Físicos",
      description: "Ruido, iluminación, vibración, temperaturas extremas (frío y calor).",
      audio: audioFisico,
    },
    {
      image: imgPeligro2,
      title: "Químicos",
      description: "Polvos, líquidos, gases y vapores, material particulado.",
      audio: audioQuimico,
    },
    {
      image: imgPeligro3,
      title: "Biológicos",
      description: "Virus, Bacterias, Hongos, Picaduras, Mordeduras.",
      audio: audioBiologico,
    },
    {
      image: imgPeligro4,
      title: "Psicosocial",
      description: "Estilo de mando, pago, carga mental, rotación, horas extras.",
      audio: audioPsicosocial,
    },
    {
      image: imgPeligro5,
      title: "Biomecánicos",
      description: "Posturas prolongadas, esfuerzo, movimiento repetitivo.",
      audio: audioBiomecanico,
    },
    {
      image: imgPeligro6,
      title: "Condiciones de seguridad",
      description: "Trabajo en alturas, espacios confinados.",
      audio: audioSeguridad,
    },
    {
      image: imgPeligro7,
      title: "Fenómenos naturales",
      description: "Sismo, terremoto, inundación, derrumbes.",
      audio: audioNatural,
    },
    {
      image: imgPeligro8,
      title: "Mecánicos",
      description: "Uso de maquinaria, equipos, herramientas.",
      audio: audioMecanico,
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsOnDivisor]);

  const handleCardClick = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  const handleAudioPlay = (index) => {
    if (activeAudio !== null && activeAudio !== index) {
      // Pause the previous audio if there's one active
      const previousAudio = audioRefs.current[activeAudio];
      if (previousAudio) {
        previousAudio.pause();
      }
      // Remove the "playing" class from the previous card
      const previousCard = document.querySelector(`.card-container_peligro.playing`);
      if (previousCard) {
        previousCard.classList.remove("playing");
      }
    }

    const currentCard = document.querySelector(`#card-${index}`);
    currentCard.classList.add("playing");
    setActiveAudio(index);
  };

  const handleAudioPause = (index) => {
    const currentCard = document.querySelector(`#card-${index}`);
    currentCard.classList.remove("playing");
    if (activeAudio === index) {
      setActiveAudio(null);
    }
  };

  const handleAudioEnd = (index) => {
    const currentCard = document.querySelector(`#card-${index}`);
    currentCard.classList.remove("playing");
    setActiveAudio(null);
  };

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Left Column */}
      <div className="md:w-2/5 w-full h-auto md:h-screen bg-main-color px-6 md:px-20 py-6 md:py-3 flex flex-col justify-center items-center">
        <div className="w-[50%]">
          <img className="mb-0" src={imgIngeMorelco} alt="Avatar instructor" />
        </div>
        <div className="text-center">
          <Title>Profundicemos...</Title>
        </div>
        <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
          Ahora Tamara nos va a recordar{" "}
          <span className="text-subtitle-color-qa">qué es un peligro,</span> y
          cuáles son los tipos más comunes que podemos encontrar en el entorno
          laboral
        </Paragraph>
      </div>

      {/* Right Column */}
      <div className="md:w-3/5 w-full bg-white md:px-6 md:pr-20 py-6 md:py-3 flex flex-col justify-start items-center">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="w-auto px-4 mb-4">
              <Instruction arrow="down" theme="light">
              Haz clic en cada tarjeta para ver la información y reproducir el audio.
              </Instruction>
            </div>
            <div className="cards-wrapper_peligro">
              {hazardCards.map((card, index) => (
                <div
                  key={index}
                  id={`card-${index}`}
                  className={`card-container_peligro ${activeAudio === index ? "active playing" : ""}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="card_peligro">
                    <div className="card-face_peligro card-front_peligro">
                      <img src={card.image} alt={card.title} />
                      <h3>{card.title}</h3>
                    </div>
                    <div className="card-face_peligro card-back_peligro">
                      <p>{card.description}</p>
                      <audio
                        ref={(el) => {
                          if (el) {
                            audioRefs.current[index] = el;
                          }
                        }}
                        onPlay={() => handleAudioPlay(index)}
                        onPause={() => handleAudioPause(index)}
                        onEnded={() => handleAudioEnd(index)}
                        controls
                      >
                        <source src={card.audio} type="audio/mp3" />
                        Tu navegador no soporta el elemento de audio.
                      </audio>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

