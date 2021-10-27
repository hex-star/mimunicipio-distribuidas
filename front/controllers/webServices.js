const urlApi = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const urlWebServices = {
    login: `${urlApi}/api/usuarios/login`,
};



export default urlWebServices;