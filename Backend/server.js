import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/db/db.js';



connectDB();



if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, ()=>{
    console.log('Server Is Running On Port 3000');
  });
}

export default app;