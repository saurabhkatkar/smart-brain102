import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm=({onInputChange, onSubmit})=>{
	return (
		<div>
		<div >
		<p className='f3'>
		{'Magic Brain Will Detect Faces In From Your Photo. Give It A Try'}
		</p>
		</div>
		<div className='center'>
			<div className=' form center pa4 br3 shadow-5'>
				<input className='f4 pa2 w-70 center' type="text" onChange={onInputChange} />
				<button  className='f4 ph3 pv2 w-30 grow link dib white bg-light-purple' onClick={onSubmit}>Detect </button>
			</div>
		</div>
		</div>
		);

}


export default ImageLinkForm;