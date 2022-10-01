const express = require('express');
const random = require('generate-random-data');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Stock = require('./models/fakeData');
const OpeningPrice = require('./models/openingPrice');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const port = 5000 || process.env.PORT;

const tickers = [
	'Aple',
	'Microsoft',
	'Facebook',
	'Netflix',
	'Google',
	'Tesla',
];

//git conflict testting
//git successfully added on feluda's lappy

for (let i = 0; i < tickers.length; i++) {
	const newOpening = new OpeningPrice({
		openingPrice: random.int(1, 10),
		ticker: tickers[i],
		id: tickers[i],
	});

	newOpening
		.save()
		.then((data) => {
			console.log(data),
				res.status(200).json({
					message: 'Blog Sucessfully created',
					success: true,
					data: data,
				});
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Blog not created',
				success: false,
				data: err,
			});
		});
}

const genRandom = async () => {
	for (let i = 0; i < tickers.length; i++) {
		try {
			const updatedStock =
				await OpeningPrice.findOneAndUpdate(
					{ id: tickers[i] },
					{ price: random.int(1, 10) },
					{ upsert: true }
				);

			const updatedStockData =
				await OpeningPrice.findOneAndUpdate(
					{ id: tickers[i] },
					{
						$push: {
							stockData: {
								id: updatedStock.id,
								updatedAt: updatedStock.updatedAt,
								price: updatedStock.price,
							},
						},
					}
				);
			console.log(updatedStockData);
		} catch (error) {
			console.log(error);
		}
	}
};

setInterval(genRandom, 1000);

app.get('/openingPrice', (req, res) => {
	OpeningPrice.find()
		.then((data) => {
			res.status(200).json({
				message: 'Blog Sucessfully retrieved',
				success: true,
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Blog not retrieved',
				success: false,
				data: err,
			});
		});
});

mongoose
	.connect(process.env.MONGO_URI)
	.then((data) => {
		console.log(
			'Mongodb successfully connected....'
		);
	})
	.catch((err) => {
		console.log(err);
	});
app.listen(port, () => {
	console.log('server is up and running');
});
