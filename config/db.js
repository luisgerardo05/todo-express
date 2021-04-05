const mongoose = require ('mongoose');

const db = process.env.MONGO_URI;

const connectDB = async () => {

	try {
		await mongoose.connect (
			db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
			useFindAndModify: false
		});

		console.log ('\nMongoDB connected!\n');
	} 
	
	catch (err) {
		console.error (err.message);
		process.exit (1);	// exit process with failure
	}
	
};

module.exports = connectDB;