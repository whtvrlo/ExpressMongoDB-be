const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');


// middleware function
const getSubscriber = async (req, res, next) => { // function saying if we call this move on to the next bit of code; to avoid hardcode
    let subscriber 
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber'})
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber 
    next()

}



// getting all
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({msg: err.message}) // status code: error on your server. (our db)

    }

})

// getting one
router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// creating one
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try { // save our subscriber:
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber) // status 201 succesfully created an object. (default is 200, 201 is just more specific that you created something)
        
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
 });

// updating single one
router.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel =! null ) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber)
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

// deleting single one
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber'})
        
    } catch (error) {
        res.status(500).json({ message: error.message})
        
    }
    
})



module.exports = router