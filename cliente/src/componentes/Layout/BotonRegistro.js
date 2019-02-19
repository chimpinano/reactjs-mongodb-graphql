import React from 'react';
import { Link } from 'react-router-dom';

const BotonRegistro = ({session}) => {
    //console.log(props);
    //console.log(session.session.obtenerUsuario.rol)
    const { rol } = session.session.obtenerUsuario;

    // cualquiera que sea difenete de administrador no lo podra ver
    if(rol !== 'ADMINISTRADOR') return null;

    return (
        <Link to="/registro" className="btn btn-warning ml-md-2 mt-2 mt-md-0">
            Crear Usuarios
        </Link>
    );
}

export default BotonRegistro;
