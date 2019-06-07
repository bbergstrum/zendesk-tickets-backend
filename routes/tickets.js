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

// GET entire ticket collection
router.get('/tickets', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  //grab all tickets from Zendesk API
  zendesk.tickets.list().then(function(tickets){
    // return all tickets in JSON
    res.end(JSON.stringify(tickets));
  }).catch(console.error);
});

// GET single ticket
router.get('/ticket/:ticketId', function(req, res) {
   // url params return as string? - req.params from front end query
  const ticketId = parseInt(req.params.ticketId)
  res.setHeader('Content-Type', 'application/json');
  zendesk.tickets.show(ticketId).then(function(ticket){
    res.end(JSON.stringify(ticket));
  }).catch(console.error);
});

// GET tickets per page
router.get('/ticketsByPage/:pageId', function(req, res){
  // url params return as string? - parse req.params from front end query
  const pageNum = parseInt(req.params.pageId) - 1;
  const itemPerPage = 25;
  // first ticket
  const firstIndex = itemPerPage * pageNum;
  // last ticket
  const lastIndex = (pageNum + 1) * itemPerPage;
  res.setHeader('Content-Type', 'application/json');
  //grab all tickets from Zendesk API
  zendesk.tickets.list().then(function(tickets){
  // return all tickets in JSON
    res.end(JSON.stringify(tickets.slice(firstIndex, lastIndex)));
  }).catch(console.error); 
});

module.exports = router;
