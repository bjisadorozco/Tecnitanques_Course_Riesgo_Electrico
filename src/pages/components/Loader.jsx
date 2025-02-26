import React from 'react';
import './styles/Loader.css';

const Loader = () => {
    return (
        <div className="loader">
            {[...Array(12)].map((_, index) => (
                <div key={index} className={`bar${index + 1}`}></div>
            ))
            }
        </div >
    );
};

export default Loader;