
const mongoose = require('mongoose');                   //for creating database with schema mongoose is used
const mongoURI = 'mongodb+srv://gofood:gofood1113@cluster0.gd9mnto.mongodb.net/gofoodmern?retryWrites=true&w=majority';
global.food_items;
global.order_data;
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected');
    
    const db = await mongoose.connection; // Get the connection object
    const fetched_data = db.collection("food_items"); // Access the collection
    const data = await fetched_data.find({}).toArray();
    const foodCategory = db.collection("foodCategory");


    const categoryData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = categoryData;
    
 // Fetch data from the collection
  const orders = db.collection("orders"); 
  const order_data1 = await orders.find({}).toArray();
  
  global.order_data = order_data1;
  
  } catch (err) {
    console.error('Error:', err);
  }
}

module.exports = mongoDB;