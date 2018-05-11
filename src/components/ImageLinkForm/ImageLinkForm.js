import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className = 'f3 orange'>
				{"Detect human faces in your pictures. Try it !"}
			</p>
			<div className='center'>
				<div className='form pa2 br1'>
					<input 
						placeholder = "Image address here .." 
						className = 'f4 pa2 w-70' 
						type='text' 
						onChange={ onInputChange }
					/>
					<button 
						className = 'w-30 grow f4 link ph3 pv2 dib black bg-orange' 
						onClick={ onButtonSubmit }>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}
export default ImageLinkForm;