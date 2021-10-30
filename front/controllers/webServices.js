import { REACT_APP_API_URL } from '@env';

const urlApi = REACT_APP_API_URL;

const urlWebServices = {
    login: `${urlApi}/api/usuarios/login`,
    crearSitio: `${urlApi}/api/sitios/create`,
    crearDenuncia: `${urlApi}/api/denuncias/create`,
};

export default urlWebServices;
