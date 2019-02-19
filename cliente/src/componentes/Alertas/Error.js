import React from 'react';

const Error = ({error}) => {

    if (error.message) {
        error = error.message;
    }

    return (
        <p className="alert alert-danger py-3 text-center p-2 mb-2">{error}</p>
    );
}

export default Error;