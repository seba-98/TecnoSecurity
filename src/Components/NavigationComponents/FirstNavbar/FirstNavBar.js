
import React from 'react'
//----------------components-------------
import UseWidget from './UseWidget'
import  Brand  from './Brand'

const  FirstNavbar =()=>  {
        return (
            <>
                <header>
                <Brand />
                    <section className="navItems">
                        <h1>TecnoSecurity</h1>
                            <div className="userItems">
                                <UseWidget name="admin"/>
                                <UseWidget name="cart"/>
                            </div>
                    </section>
                </header>
            </>
        )
}

export default FirstNavbar;