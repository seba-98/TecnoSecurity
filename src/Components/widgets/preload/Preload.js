import React from 'react';
import preloadWhite from '../../../images/preloadWhite.gif';

const Preload = ({style, widthImg}) => {
    return (
        <div style={style}><img src={preloadWhite} width={widthImg} alt=''/></div>
    )
}

export default Preload
