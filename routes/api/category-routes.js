const router = require('express').Router();               
const { Category, Product } = require('../../models');    // import the models

// The `/api/categories` endpoint

router.get('/', async (req, res) => {                     // add async await to this function so that it returns a promise
  // find all categories
  try {                                                   // try to find all categories and return them to the client if successful
    const CategoryData = await Category.findAll({         // find all categories and return them to the client if successful (this is a promise)

  // be sure to include its associated Products
        include: [{ model: Product }],                    // include the products associated with each category so that the client can see the products in each category
  });
      res.status(200).json(CategoryData);                 // return the categories to the client if successful  (this is a promise)
  } catch (err) {                                         // if there is an error, return the error to the client
    res.status(500).json(err);                            // return the error to the client
  }
});
  

router.get('/:id', async (req, res) => {                   // add async await to this function so that it returns a promise
  // find one category by its `id` value
  try {                                                    // try to find one category by its `id` value and return it to the client if successful (this is a promise)
  const CategoryData = await Category.findByPk(req.params.id, { // find one category by its `id` value and return it to the client if successful (this is a promise)
    // be sure to include its associated Products
    include: [{ model: Product }],                         // include the products associated with each category so that the client can see the products in each category
  });

    if (!CategoryData) {                                   // if there is no category with the `id` value, return a 404 error to the client
      res.status(404).json({ message: 'Category not found, plese enter another id' }); // return a 404 error to the client  (this is a promise)
      return;
    }

    res.status(200).json(CategoryData);                   // return the category to the client if successful  (this is a promise)
  } catch (err) {                                         // if there is an error, return the error to the client
    res.status(500).json(err);                             // return the error to the client
  }
});

router.post('/', async(req, res) => {                   // add async await to this function so that it returns a promise
  // create a new category
  try {
    const CategoryData = await Category.create({       // create a new category and return it to the client if successful (this is a promise)
      category_name: req.body.category_name            // create a new category and return it to the client if successful (this is a promise)
    });
    res.status(200).json(CategoryData);                // return the category to the client if successful  (this is a promise)
  } catch (err) {                                      // if there is an error, return the error to the client 
    res.status(400).json(err);                         // return the error to the client
  }
});


router.put('/:id', async (req, res) => {                // add async await to this function so that it returns a promise
  // update a category by its `id` value  
  try {                                                 // try to update a category by its `id` value and return it to the client if successful (this is a promise)
    const CategoryData = await Category.update(req.body,{     // update a category by its `id` value and return it to the client if successful (this is a promise)
      where: {                                            // update a category by its `id` value and return it to the client if successful (this is a promise)
        id: req.params.id,                              // update a category by its `id` value and return it to the client if successful (this is a promise)
      },
    });

    if (!CategoryData) {                              // if there is no category with the `id` value, return a 404 error to the client
      res.status(404).json({ message: 'Category not found, plese enter another id' });
      return;                                        // return a 404 error to the client  (this is a promise)
    }

    res.status(200).json(CategoryData);             // return the category to the client if successful  (this is a promise)
  } catch (err) {                                   // if there is an error, return the error to the client
    res.status(500).json(err);                     // return the error to the client
  }
});


router.delete('/:id', (req, res) => {               // add async await to this function so that it returns a promise
  // delete a category by its `id` value
  try {                                             // try to delete a category by its `id` value and return it to the client if successful (this is a promise)
    const CategoryData =  Category.destroy({   // delete a category by its `id` value and return it to the client if successful (this is a promise)
      where: {
        id: req.params.id,                         // delete a category by its `id` value and return it to the client if successful (this is a promise)
      },  
    });

    if (!CategoryData) {                         // if there is no category with the `id` value, return a 404 error to the client
      res.status(404).json({ message: 'Category not found, plese enter another id' });
      return;
    }

    res.status(200).json(CategoryData);        // return the category to the client if successful  (this is a promise)
  } catch (err) {                              // if there is an error, return the error to the client  
    res.status(500).json(err);                  // return the error to the client
  }
});

module.exports = router;
