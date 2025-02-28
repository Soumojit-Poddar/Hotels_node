const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save();
  
      console.log('Data saved');
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType;
  
      if (['chef', 'manager', 'waiter'].includes(workType)) {
        const response = await Person.find({ work: workType });
        console.log('Response fetched');
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Invalid work type' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's ID from the URL parameter

    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data deleted');
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Testing comment
module.exports = router;