var express = require('express');
var router = express.Router();
var _ = require('lodash');
var products = [{id: 1, name: 'A1'}, {id: 2, name: 'A2'}, {id: 3, name: 'A3'}]

router.get('/', (req, res) => {
    res.json({ data: products })
});

router.get('/:id', (req, res) => {
  product = _.find(products, (u) => { return u.id == Number(req.params.id)})
  res.json({ data: product });
});

router.post('/', (req, res) => {
  var latest_product = _.maxBy(products, 'id');
  var product = {id: latest_product.id + 1, name: req.body.name}
  products.push(product)
  res.json({ data: products });
});

router.put('/:id', (req, res) => {
  product = _.find(products, (u) => { return u.id == Number(req.params.id)})
  _.each(products, function(item, index){
    if(item.id === product.id){
      products[index] = {id: product.id, name: req.body.name};
    }
  });
  res.json({ data: products });
});

router.delete('/:id', (req, res) => {
  product = _.find(products, (u) => { return u.id == Number(req.params.id)})
  _.remove(products, product);
  res.json({ data: products });
});

module.exports = router;
