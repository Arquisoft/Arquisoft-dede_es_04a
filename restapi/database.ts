import mongoose from 'mongoose';

const mongoString: string = process.env.DATABASE_URL!;
mongoose.connect(mongoString);

const database = mongoose.connection;

database.once('open', (error: Error) => {
  console.log('Mongodb Connection stablished');
});

database.on('error', (error: Error) => {
  console.log('Mongodb connection error:', error);
  process.exit();
})