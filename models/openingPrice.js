const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const openingSchema = new Schema(
	{
		id: {
			type: String,
		},
		openingPrice: {
			type: Number,
			// required: true,
		},
		ticker: {
			type: String,
			// required: true,
		},
		price: {
			type: Number,
			// required: true,
		},
		stockData: {
			type: Array,
		},
	},
	{ timestamps: true }
);

const OpeningPrice = mongoose.model(
	'OpeningPrice',
	openingSchema
);
module.exports = OpeningPrice;
