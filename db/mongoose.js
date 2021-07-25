const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL+'/'+process.env.DB_NAME, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}).then((db)=>{
    console.log('db connection success');
}).catch((err)=>{
    console.log(err);
})