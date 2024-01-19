const express = require('express');
const app = express();
const path = require('path');
const logEvents = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;

// log activity  middleware

app.use((req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`);
    console.log(`${req.method} ${req.path}`);
    next()
});


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



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

