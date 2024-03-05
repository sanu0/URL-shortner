const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

//here we import all the necessary files

//import {createUrl} from ./types.js
const {createUrl} = require("./types");
const {url} = require("./db");

app.use(express.json());
app.use(cors());

app.post('/shortUrl',async function (req,res){
    const payload = req.body;
    const parsedPayload = createUrl.safeParse(payload);

    if(!parsedPayload.success){
        return res.status(411).json({
            msg : "You sent the wrong inputs"
        })
    }
    else{
        let str = "";
        for(let i=0;i<10;i++){
            str = str + String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
        }
        console.log(str);
        await url.create({
            mainUrl : payload.mainUrl,
            shortUrl : str
        })
        return res.json({
            msg : "shortened url created",
            url : "localhost:3000/" + str
        })
    }
})


app.get('/:id', async function (req, res){
    const shortCode = req.params.id;
    
    const originalUrl = await url.findOne({
        shortUrl : shortCode
    });
    console.log(originalUrl.mainUrl);
    if (originalUrl) {
      res.redirect(originalUrl.mainUrl);
    } else {
      res.status(404).send('Not found');
    }
});


app.listen(3000);