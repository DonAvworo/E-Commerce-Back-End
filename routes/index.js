const router = require('express').Router();               // import the express router
const apiRoutes = require('./api/index.js');                 // import the api routes which is inside the index.js file in  the api folder
 
router.use('/api/index.js', apiRoutes);                            // use the api routes in the api folder

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;