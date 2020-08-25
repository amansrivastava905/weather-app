const path=require("path");
const express=require("express");
const hbs=require("hbs");
const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");
const { request } = require("http");



// create your express app
const app=express();
const port=process.env.PORT || 3000;

// define paths for express config
const publicdir=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials');

// setup handlebars and views location
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialspath);

// setup static dir to serve
app.use(express.static(publicdir));

// creates routes

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        });
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error});
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Aman Srivastava'
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Aman Srivastava"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful text.",
        title:'Help',
        name:"Aman Srivastava"
    })
})

app.get('*',(req,res)=>{
    res.send("404 page")
})




// start your server
app.listen(port,(e)=>{
    console.log("server started at"+ port);
})

// hello just to commit again


