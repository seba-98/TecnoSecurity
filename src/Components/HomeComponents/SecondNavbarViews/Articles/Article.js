import React from 'react'

const Article = ({nombre, info, image1}) => {
    return (
        <article className='article'>
             <img src={image1} alt="" />
                <h3>{nombre}</h3>
                <p>{info}</p>
        </article>
    )
}

export default Article
