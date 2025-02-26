import { useState, useEffect } from "react";
import { faCheck, faRotate } from "@fortawesome/free-solid-svg-icons";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import useStore from "../../store";
import Button from "../components/Button.jsx";
import Subtitle from "../components/Subtitle.jsx";
import Instruction from "../components/Instruction.jsx";
import Paragraph from "../components/Paragraph.jsx";
import imgLotoL1 from "../../assets/img/act_loto/Loto-L-1.jpg";
import imgLotoO2 from "../../assets/img/act_loto/Loto-O-2.jpg";
import imgLotoT3 from "../../assets/img/act_loto/Loto-T-3.jpg";
import imgLotoO4 from "../../assets/img/act_loto/Loto-O-4.jpg";
import imgTrue from "../../assets/img/checkAct.png";
import imgFalse from "../../assets/img/xmarkAct.png";

const DraggableItem = ({ id, imgSrc, isDropped }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      transition: "none",
    }
    : undefined;

  if (isDropped) {
    return null;
  }

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        width: "100px",
        height: "100px",
        listStyle: "none",
        cursor: "grab",
      }}
    >
      <img src={imgSrc || "/placeholder.svg"} alt="Loto item" className="w-24 h-24 object-contain" />
    </li>
  );
};

const DropZone = ({ id, item, verificationImage }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ backgroundColor: "#ebebeb", position: "relative" }}
      className="border-2 border-dashed border-main-color/60 h-24 w-24 flex justify-center items-center"
    >
      {item ? (
        <img
          src={item.imgSrc || "/placeholder.svg"}
          alt="Loto item"
          className="w-full h-full object-contain"
          style={{ margin: 0 }}
        />
      ) : (
        <span className="text-gray-500 text-xs">Arrastre aquí</span>
      )}
      {verificationImage && (
        <img src={verificationImage || "/placeholder.svg"} alt="Verification result" className="absolute w-12 h-12" />
      )}
    </div>
  );
};

function BloquearEtiquetar() {
  const [isMobile, setIsMobile] = useState(false);
  const [items, setItems] = useState([
    { id: "item-1", imgSrc: imgLotoO2, value: "O", isDropped: false },
    { id: "item-2", imgSrc: imgLotoT3, value: "T", isDropped: false },
    { id: "item-3", imgSrc: imgLotoO4, value: "O", isDropped: false },
    { id: "item-4", imgSrc: imgLotoL1, value: "L", isDropped: false },
  ]);
  const [dropZones, setDropZones] = useState([
    { id: "drop-1", item: null, verificationImage: null },
    { id: "drop-2", item: null, verificationImage: null },
    { id: "drop-3", item: null, verificationImage: null },
    { id: "drop-4", item: null, verificationImage: null },
  ]);
  const [mobileGuess, setMobileGuess] = useState(["", "", "", ""]);
  const [availableLetters, setAvailableLetters] = useState({
    L: 1,
    O: 2,
    T: 1,
  });
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsOnDivisor]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      const targetZone = dropZones.find((zone) => zone.id === over.id);
      if (targetZone.item) {
        return;
      }
      const newItems = items.map((item) => (item.id === active.id ? { ...item, isDropped: true } : item));
      const newDropZones = dropZones.map((zone) =>
        zone.id === over.id ? { ...zone, item: items.find((i) => i.id === active.id) } : zone
      );
      setItems(newItems);
      setDropZones(newDropZones);
    }
  };

  const handleMobileGuess = (index, value) => {
    const newGuess = [...mobileGuess];
    const oldValue = newGuess[index];
    newGuess[index] = value;
    setMobileGuess(newGuess);

    const newAvailableLetters = { ...availableLetters };

    if (oldValue && oldValue !== "Seleccione") {
      newAvailableLetters[oldValue] = (newAvailableLetters[oldValue] || 0) + 1;
    }

    if (value && value !== "Seleccione") {
      newAvailableLetters[value] = newAvailableLetters[value] - 1;
    }

    setAvailableLetters(newAvailableLetters);
  };

  const verifyOrder = () => {
    const correctOrder = ["L", "O", "T", "O"];
    let correct = 0;
    const newDropZones = dropZones.map((zone, index) => {
      if (!zone.item && !isMobile) return zone;
      const isCorrect = (isMobile ? mobileGuess[index] : zone.item.value) === correctOrder[index];
      if (isCorrect) correct++;
      return {
        ...zone,
        verificationImage: isCorrect ? imgTrue : imgFalse,
      };
    });

    setDropZones(newDropZones);
    setCorrectAnswers(correct);
    setIsValidated(true);
  };

  const resetActivity = () => {
    setDropZones(dropZones.map((zone) => ({ ...zone, item: null, verificationImage: null })));
    setItems([
      { id: "item-1", imgSrc: imgLotoO2, value: "O", isDropped: false },
      { id: "item-2", imgSrc: imgLotoT3, value: "T", isDropped: false },
      { id: "item-3", imgSrc: imgLotoO4, value: "O", isDropped: false },
      { id: "item-4", imgSrc: imgLotoL1, value: "L", isDropped: false },
    ]);
    setMobileGuess(["", "", "", ""]);
    setAvailableLetters({
      L: 1,
      O: 2,
      T: 1,
    });
    setCorrectAnswers(0);
    setIsValidated(false);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
        <div className="md:flex-1 bg-dark-color md:w-1/2 w-full sm:h-screen py-6 px-2 sm:px-24 flex-col justify-center items-center">
          <div className="md:h-[90vh] my-auto flex flex-col justify-center items-center">
            <h1 className="text-white text-center font-bold text-title-size mt-6">¿Bloquear o Etiquetar…?</h1>
            <Subtitle>¡Las dos (2) cosas!</Subtitle>
            <div className="md:mx-24 my-3 mb-3 text-justify">
              <Paragraph justify="justify">
                Bloqueo / Etiquetado (LOTO por sus siglas en inglés: Lock Out Tag Out) se refiere a prácticas y
                procedimientos secuenciales específicos para proteger la seguridad de los empleados de la activación o
                inicio inesperado de máquinas y equipo.
              </Paragraph>
            </div>
          </div>
        </div>

        <div className="md:flex-2 bg-white md:w-1/2 w-full md:h-screen px-10 md:pr-20 flex mx-auto justify-center items-center">
          <div className="flex flex-col justify-center items-center p-0 gap-4 sm:h-[90vh] max-w-[100%] mx-auto">
            <Instruction theme="light" arrow="down">
              {isMobile ? "Selecciona las letras correctas:" : "Organiza las letras en el orden correcto:"}
            </Instruction>

            <div className="center-actividad mx-0">
              {isMobile ? (
                <div className="flex flex-col items-center">
                  <div className="flex mb-4">
                    {mobileGuess.map((letter, index) => (
                      <div
                        key={index}
                        className={`mx-1 text-2xl font-bold w-12 h-12 flex items-center justify-center ${isValidated
                          ? letter === ["L", "O", "T", "O"][index]
                            ? "bg-correct-feedback text-white"
                            : "bg-incorrect-feedback text-white"
                          : "border-b-2 border-gray-300"
                          }`}
                      >
                        {letter || "_"}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {mobileGuess.map((letter, index) => (
                      <select
                        key={index}
                        value={letter}
                        onChange={(e) => handleMobileGuess(index, e.target.value)}
                        className={`p-2 border rounded ${isValidated
                          ? letter === ["L", "O", "T", "O"][index]
                            ? "bg-correct-feedback text-white"
                            : "bg-incorrect-feedback text-white"
                          : ""
                          }`}
                        disabled={isValidated}
                      >
                        <option value="">Seleccione</option>
                        {Object.entries(availableLetters).flatMap(([letter, count]) =>
                          Array(count).fill(letter).map((l, i) => (
                            <option key={`${l}-${i}`} value={l}>
                              {l}
                            </option>
                          ))
                        )}
                        {letter && !availableLetters[letter] && <option value={letter}>{letter}</option>}
                      </select>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 mt-0 mx-auto md:grid-cols-4 md:gap-4 mb-4">
                    {dropZones.map((zone) => (
                      <DropZone
                        key={zone.id}
                        id={zone.id}
                        item={zone.item}
                        verificationImage={zone.verificationImage}
                      />
                    ))}
                  </div>
                  <ul className="actOrderElement flex justify-center md:gap-2 mb-4" id="actOrderElement">
                    {items.map((item) => (
                      <DraggableItem key={item.id} id={item.id} imgSrc={item.imgSrc} isDropped={item.isDropped} />
                    ))}
                  </ul>
                </>
              )}

              {/* Mensaje de respuestas correctas */}
              {isValidated && (
                <Paragraph theme="ligth" className="mb-4 text-center">
                  Respuestas correctas: {correctAnswers} de 4. ({((correctAnswers / 4) * 100).toFixed(0)}%)
                </Paragraph>
              )}

              <div className="flex justify-center gap-2 mt-4">
                <Button roundedFull={true} onClick={verifyOrder} icon={faCheck}>
                  Validar
                </Button>
                <Button roundedFull={true} icon={faRotate} onClick={resetActivity}>
                  Reiniciar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default BloquearEtiquetar;