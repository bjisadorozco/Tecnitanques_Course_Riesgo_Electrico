import axios from 'axios';

var porcentajeTraking = 0;

const logEmployeeData = () => {
    const params = new URLSearchParams(window.location.search);
    axios.get('../../../data_user.php',
        {
        params: {
            course_code: params.get('course_code'),
            uid: params.get('uid'),
            mid: params.get('mid')
        }
        }
    )
    .then((response) => {
        const datos = response.data;
        if (datos.data_course[0].react_progress_object != "") {
        setArrayValidacionTraking((JSON.parse(datos.data_course[0].react_progress_object)));
        const storedArray = getArrayValidacionTraking();
        const sum = storedArray.length;
        const porcentaje = (sum / parseInt(13)) * 100;
        setPorcentajeTraking(parseInt(porcentaje));
        } else {
        addNumber(parseInt(1))
        setPorcentajeTraking(0)
        }
    })
    .catch((error) => {
        console.error('Error al obtener los datos:', error);
    });
};

logEmployeeData();

export const setPorcentajeTraking = (value) => {
    porcentajeTraking = value;
};

export const getPorcentajeTraking = () => {
    return porcentajeTraking;
};

var arrayValidacionTraking = [];

export const setArrayValidacionTraking = (array) => {
    arrayValidacionTraking = array;
};

export const getArrayValidacionTraking = () => {
    return arrayValidacionTraking;
};

export const clearArrayValidacionTraking = () => {
    arrayValidacionTraking = [];
};