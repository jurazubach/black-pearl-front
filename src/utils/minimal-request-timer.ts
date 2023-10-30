const minimalRequestTimer = (ms: number = 1000) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(null), ms);
	});
};

export default minimalRequestTimer;