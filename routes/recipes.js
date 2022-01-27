const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');


// middleware function
const getRecipe = async (req, res, next) => { // function saying if we call this move on to the next bit of code; to avoid hardcode
    let recipe
    try {
        recipe = await Recipe.findById(req.params.id)
        if (recipe == null) {
            return res.status(404).json({ message: 'Cannot find this recipe'})
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.recipe = recipe
    next()

}

//==================================================================================================================================================================

// GET ALL
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.json(recipes)
    } catch (err) {
        res.status(500).json({msg: err.message}) // status code: error on your server. (our db)

    }

})

// GET ONE
router.get("/:id", getRecipes, (req, res) => {
    res.json(res.recipe)
})

// CREATE ONE
router.post("/", async (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description
    })

    try { // save our recipe:
        const newRecipe = await recipe.save()
        res.status(201).json(newRecipe) // status 201 succesfully created an object. (default is 200, 201 is just more specific that you created something)
        
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
 });

// UPDATE ONE
router.patch("/:id", getRecipe, async (req, res) => {
    if (req.body.name != null) {
        res.recipe.name = req.body.name
    }
    if (req.body.description =! null ) {
        res.recipe.description = req.body.description
    }
    try {
        const updatedRecipe = await res.recipe.save();
        res.json(updatedRecipe)
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
})

// DELETE ONE
router.delete("/:id", getRecipe, async (req, res) => {
    try {
        await res.recipe.remove()
        res.json({ message: 'Deleted Recipe'})
        
    } catch (error) {
        res.status(500).json({ message: error.message})
        
    }
    
})


module.exports = router