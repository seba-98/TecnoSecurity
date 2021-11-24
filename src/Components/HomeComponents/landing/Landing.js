import React from 'react'
import cctv from '../../../imagesProduct/cctvkit.jpg'
import cctvkit from '../../../imagesProduct/cctvkitpcbox.jpg'
import dvr from '../../../imagesProduct/dvr.jpg'
import './landing.css'

const Landing = () => {
    return (
        <>
            <section className="desc">
                <article>
                    <div className="textImage"><h3>COMBOS CCTV </h3></div>
                    <img src={cctv} alt="" />
                </article>

                <article>
                    <div className="textImage"><h3>ACCESORIOS <br/> PARA EQUIPOS<br/> DE SEGURIDAD</h3></div>
                    <img src={cctvkit} alt="" />
                </article>

                <article>
                    <div className="textImage"><h3>COMBOS DVR</h3></div>
                    <img src={dvr} alt="" />
                </article>
            </section>
        </>
    )
}

export default Landing
