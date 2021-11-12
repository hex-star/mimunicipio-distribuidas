// import { REACT_APP_API_URL } from '@env';

const urlApi = 'http://localhost:8000';

const urlWebServices = {
    login: `${urlApi}/api/usuarios/login`,
    crearSitio: `${urlApi}/api/sitios/create`,
    crearDenuncia: `${urlApi}/api/denuncias/create`,
    listarDenuncia: `${urlApi}/api/denuncias/list`,
    registrarUsuario: `${urlApi}/api/usuarios/create`,
    cambiarPassword: `${urlApi}/api/usuarios/cambiarPassword/`,
    buscarUsuario: `${urlApi}/api/usuarios/buscar/`,
};

export default urlWebServices;
