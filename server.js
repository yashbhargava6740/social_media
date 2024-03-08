const express = require("express");
const path = require('path');
const app = express();
const { dbConnect } = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { cloudinaryConnect } = require('./config/cloudinaryConnect');
const fileUpload = require('express-fileupload');
cloudinaryConnect();
dbConnect();
app.use(fileUpload());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.get("/",(req,res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.listen(5000, () => {
    console.log("Server is running at 5000".underline.cyan);
});