const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const ProductData = await Product.findAll ({

      // be sure to include its associated Category and Tag data
      include :[{model: Category}, {model: Tag}],
    });

    res.status(200).json(ProductData);
  }
  
  catch(err) {
    res.status(500).json(err);
  }

});


// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  try {
    const ProductData =  Product.findByPk(req.params.id,{

      // be sure to include its associated Category and Tag data
      include :[{model: Category}, {model: Tag}],
    });

    if (!ProductData) {
      res.status(404).json({message: 'Product not found, plese enter another id'});
      return;
    }

    res.status(200).json(ProductData);
  }

  catch(err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {                    // when using asyn, you need to use await before the function call
  // create a new product
  try {                                                   // try is used to catch errors in the code and catch them in the catch block below
    const ProductData = await Product.create ({           // create a new product and return the new product data to the client
      product_name: req.body.product_name,                // product_name is the name of the column in the database
      product_price: req.body.product_price,              // product_price is the name of the column in the database
      product_quantity: req.body.product_quantity,
      category_id: req.body.category_id,
      tag_id: req.body.tag_id,
    })

    .then((ProductData) => {                             // then is used to return the new product data to the client

      if (req.body.product_tags) {                       // if the product tags exist, create pairs to bulk create the product model and product tag model
        const productTags = req.body.product_tags.map(productTag => { // map is used to create an array of objects with the product tag id and product id
          return {
            product_id: ProductData.id,                  // product_id is the name of the column in the database
            tag_id: productTag.tag_id,                   // tag_id is the name of the column in the database
          };
        });
        return ProductTag.bulkCreate(productTags);       // bulk create the product tag model with the array of objects created above and return the new product tag data to the client
      }
    }).then(() => {                                      // then is used to return the new product tag data to the client
      res.status(201).json(ProductData);                 // status 201 is the status code for a created resource and it is also the default status code for a successful request
    }).catch((err) => {                                  // catch is used to catch errors in the code and catch them in the catch block below
      res.status(500).json(err);                         // status 500 is the status code for an error and it is also the default status code for an unsuccessful request
    }
    );
  }

  catch(err) {
    res.status(500).json(err);                          // this final catch is used to catch errors in the entire code (try and catch) 
  }
}
);
    
   
// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => { 
  // delete one product by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const ProductData = await Product.destroy({
        where:{
          id: req.params.id,
        },
      });
  
      if(!ProductData) {
        res.status(404).json({message:'Product not found, plese enter another id'});
        return;
      }
  
      res.status(200).json(ProductData);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });
  
});

module.exports = router;
