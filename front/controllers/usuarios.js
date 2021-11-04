import urlWebServices from './webServices';

export const login = async function (values) {
    try {
        const url = urlWebServices.login;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');

        // armo json con datos

        const raw = JSON.stringify({
            email: values.email,
            password: values.password,

        });

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: raw,

        });

        return response.json();
    } catch (e) {
        console.log(e);
    }
};

export const registrar = async function (values) {
    const url = urlWebServices.registrarUsuario;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    // armo json con datos
    try {
        const raw = JSON.stringify({
            email: values.email,
            documento: values.documento,

        });

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: raw,

        });
        return response.json();
    } catch (e) {
        console.log(e);
    }

   
};

export const cambiarPassword = async function (values) {
    const url = urlWebServices.cambiarPassword + values.documento;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    // armo json con datos
    try {
        const raw = JSON.stringify({
            nuevaPassword: values.password,
            referencia: values.documento,
            claveRecuperacion:values.claveRecuperacion,

        });

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: raw,

        });
        return response.json();
    } catch (e) {
        console.log(e);
    }

  
};

export const getUsuario = async function (documento) {
    const url = urlWebServices.buscarUsuario + documento;
    console.log("Documento controller: " + urlWebServices.buscarUsuario + documento)
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    // armo json con datos
    try {
  
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders,

        });
        console.log("response controller:" + response)
        return response.json();
    } catch (e) {
        console.log(e);
    }

  
};

export default login;
