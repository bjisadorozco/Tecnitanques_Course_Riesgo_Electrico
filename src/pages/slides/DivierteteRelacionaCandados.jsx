/* eslint-disable react/prop-types */
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { faCheck, faRotate, faRepeat, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import { Typography } from "@mui/material";
import imgNoOlvides from "../../assets/img/no-olvides-color.png";
import img1 from "../../assets/img/candado-repuesta-3.jpg";
import img1Check from "../../assets/img/candado-repuesta-3-ok.jpg";
import img1Mal from "../../assets/img/candado-repuesta-3-x.jpg"
import img2 from "../../assets/img/candado-repuesta-4.jpg";
import img2Check from "../../assets/img/candado-repuesta-4-ok.jpg";
import img2Mal from "../../assets/img/candado-repuesta-4-x.jpg";
import img3 from "../../assets/img/candado-repuesta-5.jpg";
import img3Check from "../../assets/img/candado-repuesta-5-ok.jpg";
import img3Mal from "../../assets/img/candado-repuesta-5-x.jpg";
import img4 from "../../assets/img/candado-repuesta-2.jpg";
import img4Check from "../../assets/img/candado-repuesta-2-ok.jpg";
import img4Mal from "../../assets/img/candado-repuesta-2-x.jpg";
import img5 from "../../assets/img/candado-repuesta-1.jpg";
import img5Check from "../../assets/img/candado-repuesta-1-ok.jpg";
import img5Mal from "../../assets/img/candado-repuesta-1-x.jpg";
import audioRecuerdaCandados from "../../assets/audio/recuerda_candados.mp3";
import Instruction from '../components/Instruction.jsx'
import Button from "../components/Button.jsx";
import Paragraph from "../components/Paragraph.jsx";

const imagesList = [
  {
    id: 1,
    src: img1,
  },
  {
    id: 2,
    src: img2,
  },
  {
    id: 3,
    src: img3,
  },
  {
    id: 4,
    src: img4,
  },
  {
    id: 5,
    src: img5,
  },
];

const options = [
  { value: "1", label: "Bloqueo de sistema eléctrico" },
  { value: "2", label: "Bloqueo de sistema de válvulas" },
  { value: "3", label: "Bloqueo de escaleras y equipos" },
  { value: "4", label: "Bloqueo de instrumentos" },
  { value: "5", label: "Equipos contratistas" }
]
// Componente Draggable Item con @dnd-kit/core
const DraggableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: item.id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    cursor: isDragging ? "pointer" : "pointer",
    width: "250px",
    height: "100px",
    listStyle: "none",
    transition: isDragging ? 'none' : 'transform 0.2s',
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ui-state-default`}
    >
      <div
        style={{ fontSize: "16px", lineHeight: '1.3em', fontWeight: 'normal' }}
        className="text-center text-white bg-secondary-color rounded-md p-2"
      >
        {item.content}
      </div>
    </li>
  )
}

// Componente Drop Zone
const DropZone = ({ zone, onDropItem }) => {
  const { setNodeRef, isOver } = useDroppable({ id: zone.id })

  return (
    <div
      ref={setNodeRef}
      style={{ backgroundColor: '#ebebeb' }}
      className={`border-2 border-dashed border-main-color/60 h-24 w-[250px] rounded-lg flex justify-center items-center ${isOver ? "bg-main-color/20" : ""
        }`}
    >
      {/* Mostrar texto "Arrastra aquí" solo si no hay un item */}
      {!zone.item && (
        <div
          style={{ fontSize: "16px", lineHeight: '1.3em', color: '#999', fontWeight: 'normal' }}
          className="text-center"
        >
          Arrastra aquí
        </div>
      )}

      {/* Mostrar el item arrastrado */}
      {zone.item && (
        <div
          style={{ fontSize: "16px", lineHeight: '1.3em' }}
          className="text-center flex items-center bg-secondary-color h-full text-white font-normal"
        >
          {zone.item.content}
        </div>
      )}
    </div>
  )
}


function DivierteteRelacionaCandados() {
  const [orderValidation, setOrderValidation] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [borderColors, setBorderColors] = useState(Array(5).fill("border-main-color/50"))
  const [dropdowns, setDropdowns] = useState(Array(5).fill("0"))
  // const [selectedItems, setSelectedItems] = useState([])
  // const [combinedItems, setCombinedItems] = useState(imagesList.map((image) => ({ ...image, selectedValue: "0" })))
  const [selectedItems, setSelectedItems] = useState(Array(imagesList.length).fill({ selectedValue: "0" }))
  const [items, setItems] = useState([
    { id: "item-1", content: "Bloqueo de sistema eléctrico", value: "1" },
    { id: "item-2", content: "Bloqueo de sistema de válvulas", value: "2" },
    { id: "item-3", content: "Bloqueo de escaleras y equipos", value: "3" },
    { id: "item-4", content: "Bloqueo de instrumentos", value: "4" },
    { id: "item-5", content: "Equipos contratistas", value: "5" },
  ])

  const [dropZones, setDropZones] = useState([
    { id: "drop-1", item: null, correct: false },
    { id: "drop-2", item: null, correct: false },
    { id: "drop-3", item: null, correct: false },
    { id: "drop-4", item: null, correct: false },
    { id: "drop-5", item: null, correct: false },
  ])
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  const handleDropdownChange = (index, value) => {
    // const newSelectedItems = [...selectedItems];
    // newSelectedItems[index] = value;
    // console.log(newSelectedItems);
    // setSelectedItems(newSelectedItems);
    const newDropdowns = [...dropdowns];
    newDropdowns[index] = value;
    setDropdowns(newDropdowns);
  }

  const getFilteredOptions = (index) => {
    const selectedValues = dropdowns.filter((_, i) => i !== index);
    return options.filter(option => !selectedValues.includes(option.value));
  }

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const [verified, setVerified] = useState(false)

  const onDropItem = (itemId, zoneId) => {
    const itemToDrop = items.find((item) => item.id === itemId)

    const zoneOccupied = dropZones.some((zone) => zone.id === zoneId && zone.item)

    if (zoneOccupied || !zoneId) {
      return
    }

    const newDropZones = dropZones.map((zone) => {
      if (zone.id === zoneId) {
        return { ...zone, item: itemToDrop }
      }
      return zone
    })

    const newItems = items.filter((item) => item.id !== itemId)

    setItems(newItems)
    setDropZones(newDropZones)
    setVerified(false)
  }

  const verifyOrder = () => {
    const correctOrder = ["3", "4", "5", "2", "1"]
    const currentOrder = dropZones.map((zone) =>
      zone.item ? zone.item.value : ""
    )

    let correctCount = 0
    const newDropZones = dropZones.map((zone, index) => {
      const isCorrect = zone.item && zone.item.value === correctOrder[index]
      if (isCorrect) correctCount++
      return { ...zone, correct: isCorrect }
    })

    setDropZones(newDropZones)
    setVerified(true)

    // Calculamos el porcentaje
    const percentage = ((correctCount / correctOrder.length) * 100).toFixed(0)
    setOrderValidation(`Respuestas correctas ${correctCount} de 5. (${percentage}%)`)
    setIsCorrect(correctCount === correctOrder.length)
  }


  const resetActivity = () => {
    setOrderValidation("")
    setDropZones(dropZones.map((zone) => ({ ...zone, item: null, correct: false })))
    setItems([
      { id: "item-1", content: "Bloqueo de sistema eléctrico", value: "1" },
      { id: "item-2", content: "Bloqueo de sistema de válvulas", value: "2" },
      { id: "item-3", content: "Bloqueo de escaleras y equipos", value: "3" },
      { id: "item-4", content: "Bloqueo de instrumentos", value: "4" },
      { id: "item-5", content: "Equipos contratistas", value: "5" },
    ])
    setVerified(false)
  }

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const getImageForZone = (zoneIndex) => {
    if (!verified) {
      switch (zoneIndex) {
        case 0: return img1
        case 1: return img2
        case 2: return img3
        case 3: return img4
        case 4: return img5
        default: return img1
      }
    } else {
      const zone = dropZones[zoneIndex]
      switch (zoneIndex) {
        case 0: return zone.correct ? img1Check : img1Mal
        case 1: return zone.correct ? img2Check : img2Mal
        case 2: return zone.correct ? img3Check : img3Mal
        case 3: return zone.correct ? img4Check : img4Mal
        case 4: return zone.correct ? img5Check : img5Mal
        default: return img1
      }
    }
  }

  const handleResetMobile = () => {
    const newBorderColors = dropdowns.map((value) => value === "border-main-color/50")
    setBorderColors(newBorderColors)
    resetActivity();
    setDropdowns(Array(5).fill("0"))
  }


  const handleValidateMobile = () => {
    const correctOrder = ["3", "4", "5", "2", "1"]
    const newBorderColors = dropdowns.map((value, index) => {
      console.log(value, correctOrder[index])
      return value === correctOrder[index] ? "border-green-600" : "border-red-600"
    })
    setBorderColors(newBorderColors)


  }

  return (
    <div className="container mb-36 md:mb-0">
      <DndContext
        onDragEnd={(event) => onDropItem(event.active.id, event.over?.id)}
      >
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <h1 className="tituloh1-center text-title-size text-center text-secondary-color font-bold mb-2">
              ¡Diviértete! Relaciona los candados con cada caso
            </h1>
            <div className="w-fit mx-auto">
              <div className="hidden md:block">
                <Instruction theme="light" arrow="down">
                  Arrastra cada candado al tipo de bloqueo conveniente
                </Instruction>
              </div>
              <div className="block md:hidden">
                <Instruction theme="light" arrow="down">Escoge la opción correcta de la lista desplegable</Instruction>
              </div>
            </div>
            <br />
          </div>
          {/* <div className="md:hidden flex flex-row gap-4 w-fit mx-auto">
            <Button theme="light" onClick={handleValidateMobile} roundedFull={true} icon={faCheck} className="mx-auto">Validar</Button>
            <Button theme="light" onClick={handleResetMobile} roundedFull={true} icon={faRotate} className="mx-auto">reiniciar</Button>
          </div> */}
          <div className="block md:hidden">
            {dropdowns.map((value, index) => (
              <div key={value.id}>
                <div className="col-md-12 col-lg-12">
                  <div className="flex justify-center mt-4 items-center">
                    <img
                      src={getImageForZone(index)}
                      alt={`Candado Respuesta ${index + 1}`}
                      className="w-[80%] mx-auto"
                    />
                  </div>
                </div>
                <div className="mx-auto text-center">
                  <select
                    key={index}
                    className={`border-2 mx-auto mb-6 ${borderColors[index]}  rounded-md text-black`}
                    name={`dropdown${index + 1}`}
                    // value={item.selectedValue}
                    value={value}
                    onChange={(e) => handleDropdownChange(index, e.target.value)}
                  >
                    <option value="0">Seleccione...</option>
                    {getFilteredOptions(index).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden flex flex-row gap-4 w-fit mx-auto">
            <Button theme="light" onClick={handleValidateMobile} roundedFull={true} icon={faCheck} className="mx-auto">Validar</Button>
            <Button theme="light" onClick={handleResetMobile} roundedFull={true} icon={faRotate} className="mx-auto">reiniciar</Button>
          </div>
          {/* Drag and drop activity for desktop */}
          <div className="hidden md:block">
            <div className="col-md-12 col-lg-12 actividad_candidatos">
              <div
                className="flex gap-8 justify-between"
                id="actividad_candado"
                style={{ width: "80%", margin: "auto" }}
              >
                {dropZones.map((zone, index) => (
                  <span
                    key={zone.id}
                    className="grid-item-pairs act3_drag"
                    draggable="true"
                  >
                    <div>
                      <img
                        src={getImageForZone(index)}
                        alt={`Candado Respuesta ${index + 1}`}
                      />
                    </div>
                  </span>
                ))}
              </div>
            </div>

            {/* Drop Zones */}
            <div
              className="flex gap-16 my-12 w-[80%] mb-3"
              style={{ margin: "0 auto" }}
            >
              {dropZones.map((zone) => (
                <DropZone key={zone.id} zone={zone} onDropItem={onDropItem} />
              ))}
            </div>

            {/* Draggable Items */}
            <div className="flex gap-16 w-[80%]" style={{ margin: "0 auto" }}>
              {items.map((item) => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
            {/* Mensaje de Validación */}
            {orderValidation && (
              <div className="my-2">
                <Paragraph theme="ligth"
                  variant="h6"
                  className={`text-lg  font-bold my-2 text-center ${isCorrect ? "text-gray" : "text-gray"}`}
                  style={{ fontSize: "16px" }}
                >
                  {orderValidation}
                </Paragraph>
              </div>
            )}
            {/* Botones */}
            <div className="col-lg-12 col-md-12" style={{ display: "flex", justifyContent: "center", gap: "4rem" }}>
              <Button theme="light" onClick={handleShow} roundedFull={true} icon={faQuestionCircle} className="mx-auto">No olvides</Button>
              <Button theme="light" onClick={verifyOrder} roundedFull={true} icon={faCheck} className="mx-auto">Validar</Button>
              <Button theme="light" onClick={resetActivity} roundedFull={true} icon={faRepeat} className="mx-auto">Reiniciar</Button>
            </div>
          </div>
        </div>
      </DndContext>
      {/* Modal */}
      {showModal && (
        <>
          <div className="backdrop" onClick={handleClose}></div>
          <div className="modal show fade d-block mt-4" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-contenido">
                <div className="bg-main-color modal-header">
                  <h5 className="modal-title">No olvides</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src={imgNoOlvides}
                    alt="imagen no olvides"
                    className="w-[20%] mb-3"
                    style={{ margin: "0 auto" }}
                  />
                  <Paragraph theme="ligth" >
                    Por favor recuerde que Los CANDADOS son de uso personal.
                    Una vez el candado este abierto la llave no puede salir.
                    Use el color de candado adecuado para la labor a ejecutar.
                    Debe ser en material aislante para labores con
                    electricidad
                  </Paragraph>
                  <div className="flex justify-center">
                    <audio controls className="media-espanol center-media">
                      <source src={audioRecuerdaCandados} type="audio/mp3" />
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DivierteteRelacionaCandados;