const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/students-api", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
}).then(() => {
    console.log("db connected...")
}).catch((e) => {
    console.log("failed to connect")
})