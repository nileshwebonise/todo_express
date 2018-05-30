var express = require('express');
var router = express.Router();
var userRoutes = require('./users');
var productRoutes = require('./products');
var winston = require('../../configs/winston-config.js');

router.get('/', (req, res) => {
    res.render('index', { title: 'API', message: "specify request uri to access other api's" })
});
//
// router.get('/products', (req, res) => {
//     res.json({ data: products })
// });
//
// router.get('/products/:id', (req, res) => {
//   product = _.find(products, (u) => { return u.id == Number(req.params.id)})
//   res.json({ data: product });
// });
//
// router.post('/products', (req, res) => {
//   var latest_product = _.maxBy(products, 'id');
//   var product = {id: latest_product.id + 1, name: req.body.name}
//   products.push(product)
//   res.json({ data: products });
// });
//
// router.put('/products/:id', (req, res) => {
//   product = _.find(products, (u) => { return u.id == Number(req.params.id)})
//   _.each(products, function(item, index){
//     if(item.id === product.id){
//       products[index] = {id: product.id, name: req.body.name};
//     }
//   });
//   res.json({ data: products });
// });
//
// router.delete('/products/:id', (req, res) => {
//   product = _.find(products, (u) => { return u.id == Number(req.params.id)})
//   _.remove(products, product);
//   res.json({ data: products });
// });

router.use('/user', userRoutes);
router.use('/product', productRoutes);

router.all('*', (req, res) => {
    winston.error(`${404} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(404).send('Not found');
});

module.exports = router;
