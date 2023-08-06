const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagsData = await Tag.findAll({
     include: [{model: Product, through: ProductTag, as: "products" }],
    });
    res.status(200).json(allTagsData);
   } catch (err) {
     res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id,{
     include: [{model: Product, through: ProductTag, as: "products" }],
    });
    res.status(200).json(singleTagData);
   }catch (err) {
     res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create(req.body)
    .then((tag) => {
      return res.status(200).json(tag);
    })
    .catch ((err) => {
      console.log(err)
    return res.status(500).send("Error creating new tag")
 });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update( req.body, {
      where: {
      id: req.params.id,
      }
    });
  
    res.status(200).json(updateTag);
  }catch (err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagID = req.params.id
    await Tag.destroy({
      where:{
        id: tagID
      }
    });
  if (tagID === 0){
    res.status(404).json({message:"Tag not found."});
  } else {
    res.status(200).json({message:"Tag deleted successfully."});
  }
 } catch (err){
    res.status(400).json(err);
  }
});

module.exports = router;
