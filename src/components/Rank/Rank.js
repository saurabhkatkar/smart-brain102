import React from 'react';

const Rank = ({name,entries}) => {
	return (
		<div >
			<div className='white f3'>
			{`${name}, Your current Rank is..`}
			</div>
			<div className='white f2'>
			{entries}
			</div>
		</div>

	);

}

export default Rank;