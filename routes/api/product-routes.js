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
    const ProductData = await Product.findByPk(req.params.id,{

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
router.post('/', async (req, res) => {
  // create a new product
  try {
    const ProductData = await Product.create ({           // create a new product and return the new product data to the client
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_image: req.body.product_image,
      product_quantity: req.body.product_quantity,
      category_id: req.body.category_id,
    });
  
    res.status(200).json(ProductData);
  }

  catch(err) {
    res.status(500).json(err);
  }
} );


   

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
});

module.exports = router;
