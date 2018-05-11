import React from 'react';
import './Navigation.css'

const Navigation = ({ onRouteChange, isSignedIn }) => {
	
	if(isSignedIn)
	{
		return (
			<nav style = {{display: 'flex', justifyContent: 'flex-end' }}>
				<p onClick={() => onRouteChange('signout')} className='bg f3 link dim orange m4 mt0 pa3 pointer shadow-5'>Sign Out </p>
			</nav>
		);
	} else {
		return (
			<nav style = {{display: 'flex', justifyContent: 'flex-end' }}>
				<p onClick={() => onRouteChange('signin')} className='bg f3 link dim orange m4 mt0 pa3 pointer shadow-5'>Sign In </p>
				<p onClick={() => onRouteChange('register')} className='bg f3 link dim orange m4 mt0 pa3 pointer shadow-5'>Register </p>
			</nav>
		);
	}
}

export default Navigation;