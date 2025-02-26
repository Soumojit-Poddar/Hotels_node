const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// Create a new menu item
router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
  
      console.log('Data saved');
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
  // Get all menu items
router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:taste', async (req, res) =>{
  try{
      const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
      if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy' ){
          const response = await MenuItem.find({taste: tasteType});
          console.log('response fetched');
          res.status(200).json(response);
      }else{
          res.status(404).json({error: 'Invalid Taste type'});
      }
  }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;