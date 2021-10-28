import urlWebServices from './webServices';

export const login = async function (values) {
    const url = urlWebServices.login;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Origin', 'http://localhost:16000');
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
};

export const aux = 2;
export default login;

