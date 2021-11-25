import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const style={
    borderRadius: '50%',
	border: 'none',
	cursor: 'pointer',
	fontSize: '35px',
	padding: '15px',
	textAlign: 'center',
	fontWeight: 'bold',
	backgroundColor: 'black',
	color: 'chartreuse'
}

const styleBack={
	borderRadius: '5px',
	border: 'none',
	cursor: 'pointer',
	fontSize: '35px',
	padding: '15px',
	textAlign: 'center',
	fontWeight: 'bold',
	backgroundColor: 'black',
	color: 'chartreuse'
}

const BackButton = ({route='/home'}) => {

	const [volver, setVolver]= useState('◄')

    return <Link to={route}>
				<button style={volver=== '◄'? style : styleBack} onMouseOut={()=>{setVolver('◄')}}  onMouseOver={()=>{setVolver('Volver')}}>
					{volver}
				</button>
			</Link>
}

export default BackButton
