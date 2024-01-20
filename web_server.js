const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {loggers} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// log activity  middleware

app.use(loggers);

// cors middleware

    // made access to some site only 
    const whiteList = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
    const corsOptions ={
        origin:(origin, callback)=>{
            if(whiteList.indexOf(origin) !== -1 || !origin){
                callback(null, true);
            }else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    }

app.use(cors(corsOptions));

// inbuild middlewares

    // handle data submitted via HTML forms
    app.use(express.urlencoded({extended:false}));

    // handle all incoming requests with json
    app.use(express.json())

    // handle to serve static files 
    app.use(express.static(path.join(__dirname, './public')));


app.get('^/$|/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get('/new-page(.html)?', (req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

app.get('/old-page(.html)?', (req,res)=>{
    res.redirect(301,'new-page.html');
})

// route handle with using next
app.get('/hello(.html)?', (req, res, next)=>{
    console.log('Hello.html page load..');
    next()
}, (req, res)=>{
    res.send('Hi hello..')
})

// Chaining route or middleware
const one = (req, res, next)=>{
    console.log('one');
    next();
}
const two = (req, res, next)=>{
    console.log('two');
    next();
}
const three = (req, res)=>{
    console.log("Three");
    res.send('Finished..');
}

app.get('/chain(.html)?', [one, two, three]);


// handle unkown request put this always last..
app.get('/*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

// errorHandle 
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

