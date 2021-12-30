import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './backButton.css'


const BackButton = ({route='/home'}) => {

	const [volver]= useState('⬅')

    return <Link to={route} style={{textDecoration:'none'}}>
				<button className='backBtn' >
					{volver}
				</button>
			</Link>
}

export default BackButton
