import urlWebServices from './webServices';

export const listarPublicacionesHabilitadas = async function () {
    const url = urlWebServices.buscarPublicacionesHabilitadas;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
    });

    return response.json();
}

export const crearPublicacion = async function (values) {
    const url = urlWebServices.crearNuevaPublicacion;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    const raw = JSON.stringify({
        documento: values.documento,
        idSitio: values.idSitio,
        descripcion: values.descripcion,
        titulo: values.titulo,
        telefono: values.telefono,
        mail: values.mail,
        horarios: values.horarios,
        rubro: values.rubro,
        imagenesPublicacion: values.imagenesPublicacion,
    });

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: raw,

    });

    return response.json();
};

export default listarPublicacionesHabilitadas;