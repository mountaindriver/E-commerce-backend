// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// FIX ALL OF THIS 13/24;

// Products belongsTo Category
Product.belongsToMany(Product, {
  foreignKey: `category_id`,
})

// Categories have many Products
Category.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: `category_id`,
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: `tag_id`,
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: `tag_id`,
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};


// Associations
// You'll need to execute association methods on your Sequelize models to create the following relationships between them:

// Product belongs to Category, and Category has many Product models, as a category can have multiple products but a product can only belong to one category.

// Product belongs to many Tag models, and Tag belongs to many Product models. Allow products to have multiple tags and tags to have many products by using the ProductTag through model.

// Hint: Make sure you set up foreign key relationships that match the column we created in the respective models.