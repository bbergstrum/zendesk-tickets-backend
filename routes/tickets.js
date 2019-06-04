var express = require('express');
var router = express.Router();

// require node zendesk api
var Zendesk = require('zendesk-node-api');
 
// zendesk api instance
var zendesk = new Zendesk({
  url: 'https://bbergstrum.zendesk.com',
  email: 'bbergstrum@hotmail.com', 
  token: process.env.ZENDESK_TOKEN
});


/* GET landing page */

router.get('/', function(req, res){
  res.redirect('/tickets');
});

router.get('/tickets', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  //grab all tickets from Zendesk API
  zendesk.tickets.list().then(function(tickets){
    // return all tickets in JSON
    res.end(JSON.stringify(tickets));
  }).catch(console.error);
});

router.get('/ticketsByPage/:pageId', function(req, res){
  const pageNum = parseInt(req.params.pageId) - 1;
  const itemPerPage = 25;
  const firstIndex = itemPerPage * pageNum;
  const lastIndex = (pageNum + 1) * itemPerPage;
  res.setHeader('Content-Type', 'application/json');
  //grab all tickets from Zendesk API
  zendesk.tickets.list().then(function(tickets){
  // return all tickets in JSON
    res.end(JSON.stringify(tickets.slice(firstIndex, lastIndex)));
  }).catch(console.error); 
});


module.exports = router;
