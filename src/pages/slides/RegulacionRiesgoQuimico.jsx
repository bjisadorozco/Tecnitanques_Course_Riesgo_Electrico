import { useState, useEffect } from "react"
import useStore from "../../store"
import Title from "../components/Title.jsx"
import Paragraph from "../components/Paragraph.jsx"
import Instruction from "../components/Instruction.jsx"
import audio1 from "../../assets/audio/colombia_descripcion.mp3"
import { motion } from "framer-motion"

function RegulacionRiesgoQuimico() {
  const [activeItem, setActiveItem] = useState(null)
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor)

  useEffect(() => {
    setIsOnDivisor(false)
  }, [setIsOnDivisor])

  const timelineItems = [
    {
      year: "2009",
      title: "Resolución 1348",
      description:
        "Adopta el Reglamento de Salud Ocupacional en los Procesos de Generación, Transmisión y Distribución de Energía Eléctrica.",
    },
    {
      year: "2019",
      title: "Resolución 5018",
      description:
        "Establece lineamientos en Seguridad y Salud en el trabajo en los Procesos de Generación, Transmisión y Distribución de Energía Eléctrica.",
    },
    {
      year: "RETIE",
      title: "Reglamento Técnico de Instalaciones Eléctricas",
      description:
        "Basado en la Norma NFPA 70, establece medidas que garantizan la seguridad de las personas, vida animal y vegetal, y la preservación del medio ambiente.",
    },
  ]

  return (
    <div className="container m-0 min-w-[100vw] px-4 py-2 mb-36 md:mb-0 bg-dark-color">
      <div className="max-w-6xl mx-auto grid justify-center  mb-36 md:mb-0">
        <div className="flex justify-center items-center my-2" style={{ margin: "0 auto" }}>
          <Title theme="dark" className="text-center mb-6">
            Regulación de riesgos eléctricos en Colombia
          </Title>
        </div>
        <Paragraph theme="dark" className="text-center mb-8">
          Recordemos que todas las normas y regulaciones establecidas, se han desarrollado para proteger la integridad
          de los trabajadores y las empresas, conozcamos las principales:
        </Paragraph>
        <div className="w-fit mx-auto">
          <Instruction theme="dark" arrow="down">
            Haz clic sobre el audio
          </Instruction>
        </div>
        <div className="flex justify-center">
          <audio controls className="mx-auto">
            <source src={audio1} type="audio/mp3" />
          </audio>
        </div>
        <div className="w-fit mx-auto">
          <Instruction theme="dark" arrow="down">
            Haz clic en las regulaciones para ver mas detalles
          </Instruction>
        </div>
        {/* Timeline for web (horizontal) */}
        <div className="hidden md:block relative mb-32">
          <div className="absolute w-full h-1 bg-white top-6"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full left-0 top-5"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full right-0 top-5"></div>
          <div className="flex justify-between items-start relative">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                className="w-1/3 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 bg-white border-4 border-main-color rounded-full absolute top-3 z-10"></div>
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 w-full mt-16"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveItem(activeItem === index ? null : index)}
                  >
                    <h3 className="text-xl font-bold text-main-color mb-2">{item.year}</h3>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    {activeItem === index && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-600">
                        {item.description}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline for mobile (vertical) */}
        <div className="md:hidden relative">
          <div className="absolute w-1 bg-white h-full left-8 top-0"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full left-7 top-0"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full left-7 bottom-0"></div>
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              className="mb-8 flex items-start w-full pl-16"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="absolute left-6 w-6 h-6 bg-white border-4 border-main-color rounded-full mt-1"></div>
              <motion.div
                className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveItem(activeItem === index ? null : index)}
              >
                <h3 className="text-xl font-bold text-main-color mb-2">{item.year}</h3>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                {activeItem === index && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-600">
                    {item.description}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RegulacionRiesgoQuimico

