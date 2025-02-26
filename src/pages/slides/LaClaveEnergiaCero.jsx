"use client"

import { useEffect, useState } from "react"
import useStore from "../../store"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import Title from "../components/Title.jsx"
import Paragraph from "../components/Paragraph.jsx"
import Subtitle from "../components/Subtitle.jsx"
import Instruction from "../components/Instruction.jsx"
import { motion, AnimatePresence } from "framer-motion"
import EnergiaCero from "../../assets/img/Energia-cero.png"
import EnergiaSlide1 from "../../assets/img/slide-14-1.webp"
import EnergiaSlide2 from "../../assets/img/slide-14-2.webp"
import EnergiaSlide3 from "../../assets/img/slide-14-3.webp"
import EnergiaSlide4 from "../../assets/img/slide-14-4.webp"

import "swiper/css"
import "swiper/css/pagination"

// Añade estos estilos CSS en línea o en tu archivo CSS
const slideStyles = `
  .slide-container {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    min-height: 300px;
  }

  .text-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

function LaClaveEnergiaCero() {
  const [activeVerification, setActiveVerification] = useState(null)
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const slidesContent = [
    { imageURL: EnergiaSlide1, text: "Multímetro Digital" },
    { imageURL: EnergiaSlide2, text: "Manómetro" },
    { imageURL: EnergiaSlide3, text: "Medidor de Ausencia de Tensión" },
    { imageURL: EnergiaSlide4, text: "Termómetro Digital" },
  ]

  const verifications = [
    {
      text: "Apagadas",
      description: "Asegúrate de que todos los interruptores y fuentes de energía estén en posición de apagado.",
    },
    {
      text: "Aisladas",
      description: "Verifica que el equipo esté completamente aislado de cualquier fuente de energía externa.",
    },
    {
      text: "Desconectadas",
      description: "Desconecta físicamente el equipo de todas las fuentes de energía posibles.",
    },
    {
      text: "Purgadas",
      description: "Libera cualquier energía residual almacenada en el sistema, como presión hidráulica o neumática.",
    },
    {
      text: "Encerradas",
      description: "Asegura que todas las partes móviles estén completamente detenidas y no puedan moverse.",
    },
    { text: "Inmovilizadas", description: "Fija cualquier parte que pueda moverse por gravedad u otras fuerzas." },
    {
      text: "Bloqueadas",
      description: "Aplica dispositivos de bloqueo en todos los puntos de desconexión de energía.",
    },
    {
      text: "Obstruidas",
      description: "Coloca barreras físicas para prevenir el acceso a áreas peligrosas o energizadas.",
    },
  ]

  return (
    <>
      <style>{slideStyles}</style>
      <div className="min-h-screen bg-white p-4 md:p-8 mb-36 md:mb-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Title theme="ligth">La clave es</Title>
            <Subtitle className="text-secondary-color">¡ENERGÍA CERO!</Subtitle>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-8">
            <div className="order-2 md:order-2 flex flex-col items-center">
              <img
                src={EnergiaCero}
                alt="Energia Cero"
                className="max-w-[30%] md:max-w-[30%] h-auto mb-3"
              />
              <Swiper
                // pagination={{
                //   clickable: true,
                //   renderBullet: (index, className) =>
                //     `<span class="${className} relative w-6 h-6 text-center leading-6 bg-main-color text-white rounded-full">${index + 1}</span>`,
                // }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                className="w-full max-w-sm rounded-lg overflow-hidden shadow-xl"
              >
                {slidesContent.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="slide-container"
                      style={{ backgroundImage: `url(${slide.imageURL})` }}
                    >
                      <div className="text-overlay">
                        <h2 className="text-white text-lg font-bold">{slide.text}</h2>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="order-1 md:order-1">
              <Paragraph theme="ligth" className="text-white mb-6">
                Antes de darle servicio o mantenimiento a un equipo, verifica que todas las fuentes de energía estén:
              </Paragraph>
              <div className="w-fit mx-auto mb-4">
                <Instruction theme="ligth" arrow="down">
                  Selecciona cada paso para ver su descripción detallada
                </Instruction>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {verifications.map((verification, index) => (
                  <motion.button
                    key={index}
                    className={`py-2 px-3 rounded-full text-white text-sm font-medium transition-colors duration-300 ${activeVerification === verification.text
                      ? "bg-secondary-color"
                      : "bg-main-color hover:bg-main-color/80"
                      }`}
                    onClick={() =>
                      setActiveVerification(activeVerification === verification.text ? null : verification.text)
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    {verification.text}
                  </motion.button>
                ))}
              </div>
              <div className="mt-4">
                <AnimatePresence>
                  {activeVerification && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-dark-color p-4 rounded-lg shadow-lg"
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{activeVerification}</h3>
                      <Paragraph theme="dark">
                        {verifications.find((v) => v.text === activeVerification)?.description}
                      </Paragraph>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LaClaveEnergiaCero