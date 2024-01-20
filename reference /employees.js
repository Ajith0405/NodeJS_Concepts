const express = require('express');
const router = express.Router();
const path = require('path');

data ={};
data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res)=>{
        res.json(data.employees)
    })
    .post((req, res)=>{
        res.json({
            'firstName': req.body.firstname,
            'lastName': req.body.lastname,
        })
    })
    .put((req, res)=>{
        res.json({
            'firstName': req.body.firstname,
            'lastName': req.body.lastname,
        })
    })
    .delete((req, res)=>{
        res.json({"id":req.body.id})
    })

// access params of url
    router.route('/:id')
            .get((req, res)=>{
                res.json({"id": req.params.id})
            })

    module.exports = router;
