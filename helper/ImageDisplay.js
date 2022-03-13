const productListStatus = {
	T: "",
	X: 'AA-B',
	S1: 'AA-B',
	S2: 'AA-B',
	S3: 'AA-B',
	S4: 'AA-B',
	SL: 'C',
	R1: "",
	R2: "",
	R3: "",
	R4: "",
	VP: 'PRIORITY',
	VL: 'PRIORITY',
	GP: 'AA-B',
	GL: 'C',
	MP: 'AA-B',
	ML: 'C',
	WP: 'PRIORITY',
	WL: 'PRIORITY',
}

const productDetailStatus = {
	T: null,
	X: 5,
	S1: 1,
	S2: 2,
	S3: 3,
	S4: 4,
	SL: null,
	R1: 6,
	R2: 7,
	R3: 8,
	R4: 9,
	VP: null,
	VL: null,
	GP: null,
	GL: null,
	MP: null,
	ML: null,
	WP: null,
	WL: null,
};

const bagWishlistOrderStatus = {
	T: true,
	X: false,
	S1: false,
	S2: false,
	S3: false,
	S4: false,
	SL: false,
	R1: false,
	R2: false,
	R3: false,
	R4: false,
	VP: false,
	VL: false,
	GP: false,
	GL: false,
	MP: false,
	ML: false,
	WP: false,
	WL: false,
};

const isValidLabel = async (type) => {
	const typeNote = ["T", "X", "S1", "S2", "S3", "S4", "SL", "R1", "R2", "R3", "R4", "VP", "VL", "GP", "GL", "MP", "ML", "WP", "WL"];

	for(let i = 0; i < typeNote.length; i++) {
		if(typeNote[i] == type) {
			return await true;
		}
	}

	return await false;
}

const productListDisplay = async (type) => {
	return await productListStatus[type];
}

const productDetailDisplay = async (type) => {
	return await productDetailStatus[type];
}

const bagWishlistOrderDisplay = async (type) => {
	return await bagWishlistOrderStatus[type];
}

export default {
	productListDisplay,
	productDetailDisplay,
	bagWishlistOrderDisplay,
	isValidLabel
}