import urlWebServices from './webServices';

export const crearDenuncia = async function (values) {
    const url = urlWebServices.crearDenuncia;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    const raw = JSON.stringify({
        documento: values.documento,
        idSitio: values.idSitio,
        descripcion: values.descripcion,
        nombreDenunciado: values.nombreDenunciado,
        imagenesDenuncia: values.imagenesDenuncia,
    });

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: raw,

    });

    return response.json();
};

export default crearDenuncia;
