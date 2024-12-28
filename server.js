
import express from 'express'
import dotenv from 'dotenv'
import createDB from './config/db.js'
import authRouter from './routes/auth.route.js'
import catagoryRoute from './routes/catagoryRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import productRoute from './routes/productRoutes.js'
import path from 'path'

//rest object
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
dotenv.config();



//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/catagory", catagoryRoute);
app.use('/api/v1/product', productRoute);
// app.use(express.static(path.join(__dirname, './client/build')));




//rest api
// app.use('*', function (req, res) {
//     res.sendFile(path.json(__dirname, './client/build/index.html'));

// })


createDB()
    .then(() => {


        //listen
        app.listen(process.env.PORT || 4000, () => {
            console.log(`port is running on ${process.env.PORT}`);

        })

    })
