import { REACT_APP_API_URL } from '@env';
// const urlApi = 'http://192.168.1.17:8000';
const urlApi = 'https://mimunicipio-api.herokuapp.com';

const urlWebServices = {
    login: `${urlApi}/api/usuarios/login`,
    crearSitio: `${urlApi}/api/sitios/create`,
    crearDenuncia: `${urlApi}/api/denuncias/create`,
    listarDenuncia: `${urlApi}/api/denuncias/list`,
    registrarUsuario: `${urlApi}/api/usuarios/create`,
    cambiarPassword: `${urlApi}/api/usuarios/cambiarPassword/`,
    buscarUsuario: `${urlApi}/api/usuarios/buscar/`,
    buscarPublicacionesHabilitadas: `${urlApi}/api/publicaciones/habilitadas`,
    crearNuevaPublicacion:`${urlApi}/api/publicaciones/create`,
    listarDenunciasUser:`${urlApi}/api/denuncias/list`,
};

export default urlWebServices;
