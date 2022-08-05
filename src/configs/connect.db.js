const mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => console.log('Connected to MongoDB failed'));