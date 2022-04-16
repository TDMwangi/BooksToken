import React from 'react';

function SecondView(props) {
	console.log(props.data);
	return (
		<div className="main-cointainer">
			<h2>Second View</h2>
			<p>{props.data.w} </p>
		</div>
	)
}

export default SecondView;