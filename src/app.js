const express = require('express');
const app = express();
const Subscriber = require('./models/subscribers');

// Your code goes here
app.get('/subscribers', (req, res) => {
    Subscriber.find().then(subscribers => res.send(subscribers));
});
app.get('/subscribers/names', (req, res) => {
    let array = [];
    Subscriber.find().then(ele => {
        ele.map(data => {
            let name = data.name;
            let subscribedChannel = data.subscribedChannel;
            array.push({name, subscribedChannel})
        })
        res.send(array)
    })
});
app.get('/subscribers/:id', (req, res) => {
    const id = req.params.id;
    Subscriber.find({_id : id}).then(subscribers => subscribers.map(subscribers => res.send(subscribers))).catch(error => res.status(400).send({message: error.message}));
    return;
});

module.exports = app;