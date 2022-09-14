const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try { 
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err.message);
  }
}); 

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!catData){
      res.status(404).json({message: `No category id found`});
    }
    res.status(200).json(catData);
  }catch{
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch(err){
    res.status(400).json(err)
  }
});


router.put('/:id', async (req, res, next) => {
  // update a category by its `id` value
  try{
    const catData = await Category.update(
      {category_name: req.body.category_name},
      {where: {id:req.params.id}}
    )
    res.status(200).json(catData);
  } catch (err){
    res.status(404).json(err);
  }
});

// it does delete but the request doesn't stop (this and tag delete)
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!catData){
      res.status(404).json({
        message: "No category found with this id"
      });
      return;
    }
    res.status(200).json({
      message: "Category Deleted"
    });
  } catch{
    res.status(500).json(err);
  }
});

module.exports = router;
