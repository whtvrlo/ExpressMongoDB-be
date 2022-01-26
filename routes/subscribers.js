const express = require('express');
const router = express.Router();


// getting all
router.get("/", (req, res) => {
    res.json("Hello");

})

// getting single one
router.get("/:id", (req, res) => {

})

// creating single one
router.post("/:id", (req, res) => {
    
})

// updating single one
router.patch("/", (req, res) => {
    
})

// deleting single one
router.delete("/:id", (req, res) => {
    
})


module.exports = router