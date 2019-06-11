var express = require('express');
var Tickets = require('../src/tickets');
var router = express.Router();

/* GET landing page */
router.get('/', function (req, res) {
  res.redirect('/ticketsByPage/1');
});

// GET single ticket
router.get('/ticket/:ticketId', function (req, res) {
  // url params return as string? - req.params from front end query
  const ticketId = parseInt(req.params.ticketId)
  res.setHeader('Content-Type', 'application/json');
  var tickets = new Tickets();
  tickets.singleTicket(ticketId, res);
});

// GET tickets per page
router.get('/ticketsByPage/:pageId', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var tickets = new Tickets();
  tickets.ticketsPerPage(req.params.pageId, res);
});

module.exports = router;
