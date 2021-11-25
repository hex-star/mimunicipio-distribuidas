import urlWebServices from './webServices';

export const crearSitio = async function (sitio, comentarios) {
    const url = urlWebServices.crearSitio;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    const raw = JSON.stringify({
        latitud: sitio.latitud,
        longitud: sitio.longitud,
        calle: sitio.calle,
        numero: sitio.numero,
        descripcion: sitio.descripcion,
        comentarios,
    });

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: raw,

    });

    return response.json();
};

export default crearSitio;
