import urlWebServices from './webServices';

export const crearReclamo = async function (values) {
    const url = urlWebServices.crearReclamo;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    const raw = JSON.stringify({
        documento: values.documento,
        idSitio: values.idSitio,
        idDesperfecto: values.idDesperfecto,
        descripcion: values.descripcion,
        imagenesReclamo: values.imagenesReclamo,
    });

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: raw,

    });
    console.log(raw);
    console.log('RESPONSE');
    console.log(response);

    return response.json();
};

export const listarReclamos = async function () {
    const url = urlWebServices.listarReclamo;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
    });

    return response.json();
};

export const listarRubros = async function () {
    const url = urlWebServices.listarRubros;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
    });

    return response.json();
};

export default listarRubros;
