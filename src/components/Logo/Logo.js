import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import nn from './nn.png';

const Logo = () => {
	return (
		<div className='m4 ml5 mt0'>
			<Tilt className="Tilt shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa3">
 					<img style={{paddingTop: '5px'}} alt="Neural Network" src ={nn}/>
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;