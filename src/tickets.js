// require node zendesk api
var Zendesk = require('zendesk-node-api');

// zendesk api instance
var zendesk = new Zendesk({
    url: process.env.ZENDESK_URL,
    email: process.env.ZENDESK_EMAIL,
    token: process.env.ZENDESK_TOKEN
});

function Tickets() {
}

Tickets.prototype.ticketsPerPage = function (pageId, res) {
    // url params return as string? - parse req.params from front end query
    const pageNum = parseInt(pageId) - 1;
    const itemPerPage = 25;
    // first ticket
    const firstIndex = itemPerPage * pageNum;
    // last ticket
    const lastIndex = (pageNum + 1) * itemPerPage;

    //grab all tickets from Zendesk API
    zendesk.tickets.list().then(function (tickets) {
        // return all tickets in JSON
        handleErrors(tickets, res);
        res.end(JSON.stringify(tickets.slice(firstIndex, lastIndex)));
    }).catch(function (error) {
        //handle API unavailable
        console.error(error);
    });
};

Tickets.prototype.singleTicket = function(ticketId, res) {
    zendesk.tickets.show(ticketId).then(function (ticket) {
        handleErrors(ticket, res);
        res.end(JSON.stringify(ticket));
    }).catch(console.error);
}

Tickets.prototype.totalTickets = function(res) {
    zendesk.tickets.list().then(function (tickets) {
        // return all tickets in JSON
        handleErrors(tickets, res);
        res.end(JSON.stringify({'totalTickets': tickets.length}));
    }).catch(function (error) {
        //handle API unavailable
        console.error(error);
    });
}

// This function handles the scenario where the tickets object
// returned by ZenDesk is either undefined or null
function handleErrors(tickets, res) {
    if (tickets === undefined || tickets === null) {
        var errorString = JSON.stringify({ 'error': 'Zendesk API request failed' });
        //handle receieving no JSON
        console.log('Error: request to Zendesk API unsuccessful');
        //respond with bad request and error string
        // return correct MIME type: JSON
        res.writeHead(400, errorString, { 'content-type': 'application/json' });
        res.end(errorString);
        return;
    }
}

module.exports = Tickets;