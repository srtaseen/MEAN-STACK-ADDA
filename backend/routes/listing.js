const router = require("express").Router();
const Listing = require('../model/Listing');
const verify = require('./verifyToken');

// Get All Listing
router.get('/', async (req, res) =>{
    try{
        const listings = await Listing.find();
        res.json(listings);
    }
    catch(error){
        res.json({message: error});
    }
    
});

// Get Single Listing
router.get('/:listingId', async (req, res) =>{
    try{
        const listing = await Listing.findById(req.params.listingId);
        res.json(listing);
    }
    catch(error){
        res.json({message: error});
    }
});

// Add Listing
router.post('/', verify, async (req, res) =>{
    const listing = new Listing({
        title: req.body.title,
        price: req.body.price,
        locality: req.body.locality,
        details: req.body.details    
    });
    try{
        const listingSave = await listing.save();
        res.send(listingSave);
    }
    catch(error){
        res.status(400).send(error);
    }
    
});

// Update Listing
router.put('/:listingId', verify, async (req, res) =>{
    try{
        const listing = {
            title: req.body.title,
            price: req.body.price,
            locality: req.body.locality,
            details: req.body.details  
        }
        const updatedListing = await Listing.findByIdAndUpdate(
            {_id: req.params.listingId},
            listing
        );
        res.json(updatedListing);
    }
    catch(error){
        res.json({message: error});
    }
});

// Delete Listing
router.delete('/:listingId', verify, async (req, res) =>{
   try{
    const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
    res.json(removeListing); 
   }
   catch(error){
    res.json({message: error});
   }
});



module.exports = router;