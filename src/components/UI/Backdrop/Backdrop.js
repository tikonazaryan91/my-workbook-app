import React from 'react';
import './Backdrop.css';

const Backdrop = ({show , clicked}) => (
    show && <div className="backdrop" onClick={clicked}/>
);

export default React.memo(Backdrop);