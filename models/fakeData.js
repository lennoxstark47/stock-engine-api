const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema(
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
	},
	{ timestamps: true }
);

const Stock = mongoose.model(
	'Stock',
	stockSchema
);
module.exports = Stock;
