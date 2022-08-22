const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try{
    const tagData =  Tag.findAll({

      // be sure to include its associated Product data
      include: [{model:Product}],
    });

    res.status(200).json(tagData);
  }

  catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData =  Tag.findByPk(req.params.id,{

      // be sure to include its associated Product data
      include: [{model:Product}],
    });

    if (!tagData) {
      res.status(404).json({message: 'No Tag found, plese enter another id'});
      return;
    }

    res.status(200).json(tagData);
  }

  catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', (req, res) => {
  // create a new tag
  try{
    const tagData =  Tag.create ({
      tag_name : req.body.tag_name,
    });

    res.status(200).json(tagData);
  }

  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update (req.body,{
        where: {
          id: req.params.id,
        },
      });
  
      if(!tagData) {
        res.status(404).json({message: 'No Tag found, plese enter another id' });
        return;
      }
  
      res.status(200).json(tagData);
    }
  
    catch (err) {
      res.status(500).json(err);
    }
  });
});

  

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData =  Tag.destroy ({
        where: {
          id: req.params.id,
        },
      });
  
      if(!tagData) {
        res.status(404).json({message: 'Tag not found, plese enter another id' });
        return;
      }
  
      res.status(200).json(tagData);
    }
  
    catch (err) {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
