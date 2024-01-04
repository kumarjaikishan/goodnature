const express = require('express');
const app = express();
// const office = require('./conn/officeexp')
const promoter = require('./modals/promote_modal')
const customer = require('./modals/customer_model')
const user = require('./modals/login_modal')
const port = process.env.PORT || 5000;
const fileupload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs');
const cloudinary = require('cloudinary').v2

app.use(express.json());
require('./conn/conn')

require('./test');
app.use(cors());

cloudinary.config({
    cloud_name: 'dusxlxlvm',
    api_key: '214119961949842',
    api_secret: "kAFLEVAA5twalyNYte001m_zFno"
});

const path = require('path');
const { log } = require('console');

app.use(fileupload({
    useTempFiles: true
}))

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


// page signup logic here
app.post('/signup', async (req, res) => {
    const { name, email, phone, password,date } = req.body;
    // console.log(email + " " + password)

    try {
        const query = new user({ name, email, phone, password,date });
        const result = await query.save();
        if (result) {
            res.status(201).json({
                msg: "SignUp successfully",
                data: result
            })
        } else {
            res.status(500).json({
                msg: "something went wrong in db"
            })
        }
    } catch (error) {
        res.send(error);
    }
})


// page login logic here
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        const result = await user.find({ email, password });
        // console.log(result);
        if (result) {
            // const userid = result[0]._id;
            const query = await promoter.find();
            const consumer =  await customer.find();
            // console.log(query);
            // console.log(consumer);
            if (query) {
                res.status(200).json({
                    login: true,
                    data: result,
                    promotor: query,
                    customer:consumer
                })
            }
        } else {
            res.status(200).json({
                login: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "NO USER FOUND",
        })
    }

})


// for geting promotor list
app.post('/promotorlist', async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = await promoter.find().sort({ date: -1 });
        if (query) {
            res.status(200).json({
                promotor: query
            })
        }
        else {
            res.status(200).json({
                login: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Promotor list not found",
        })
    }
})
// for geting promotor list ends here


//    for adding promotor data into database
app.post('/addpromoter', async (req, res) => {
    const {senior, name, id, contact, address } = req.body;
    if (!name || !id || !contact || !address || !senior) {
        res.json({
            msg: "all fields are required"
        })
    } else {
        try {
            const query = new promoter({ senior,name, id, contact, address });
            console.log(query)
            const result = await query.save();

            res.json({
                msg: "data inserted successfully",
                data:result
            })
        } catch (error) {
            res.json({
                msg: error
            })
        }
    }
})
//    for adding promotor data into database ends here



//    for adding Customer data into database
app.post('/addcustomer', async (req, res) => {
    const {promotor, name,  cust_id, contact, address } = req.body;
    if (!name || ! cust_id || !contact || !address || !promotor) {
        res.json({
            msg: "all fields are required"
        })
    } else {
        try {
            const query = new customer({ promotor,name, cust_id, contact, address });
            console.log(query)
            const result = await query.save();

            res.json({
                msg: "data inserted successfully",
                data:result
            })
        } catch (error) {
            res.json({
                msg: error
            })
        }
    }
})
//    for Customer data into database ends here

// for customer list logic
app.post('/customerlist', async (req, res) => {
        try {
            const query = await customer.find();
            // console.log(query);
            res.json({
                customer:query
            })
        } catch (error) {
            res.json({
                msg: error
            })
        }
})
//    for Customer list ends here


app.listen(port, () => {
    console.log(`server listening at ${port}`);
})