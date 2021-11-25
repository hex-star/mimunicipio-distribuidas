const urlApi = 'https://mimunicipio-api.herokuapp.com';

const urlWebServices = {
    login: `${urlApi}/api/usuarios/login`,
    crearSitio: `${urlApi}/api/sitios/create`,
    crearDenuncia: `${urlApi}/api/denuncias/create`,
    listarDenuncia: `${urlApi}/api/denuncias/list`,
    registrarUsuario: `${urlApi}/api/usuarios/create`,
    cambiarPassword: `${urlApi}/api/usuarios/cambiarPassword/`,
    buscarUsuario: `${urlApi}/api/usuarios/buscar/`,
    crearReclamo: `${urlApi}/api/reclamos/create`,
    listarRubros: `${urlApi}/api/rubros/list`,
    listarReclamo: `${urlApi}/api/reclamos/list`,
};

export default urlWebServices;
