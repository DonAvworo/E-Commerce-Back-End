// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Products.belongsTo(Category,{            // this is a one to one relationship between Product and Category
  foreignKey: 'category_id',             // the column in products that maps to category_id                  
}  
);

// Categories have many Products
Category.hasMany(Product, {              // this is a one to many relationship which means that each category can have many products and each product can have only one category
  foreignKey: 'category_id',             // the column in products that maps to category_id
}
);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {            // this is a many to many relationship between Product and Tag 
  through: ProductTag,                  // the model that connects the two models together (through ProductTag) using the foreign keys in ProductTag
  foreignKey: 'product_id',             // the column in products that maps to product_id in ProductTag table 
  // otherKey: 'tag_id',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {            // this is a many to many relationship between Tag and Product
  through: ProductTag,                  // the model that connects the two models together (through ProductTag) using the foreign keys in ProductTag
  foreignKey: 'tag_id',                 // the column in tags that maps to tag_id in ProductTag table and otherKey: 'product_id',
  // otherKey: 'product_id',
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
