
// require node zendesk api
var Zendesk = require('zendesk-node-api');

// zendesk api instance
var zendesk = new Zendesk({
    url: 'https://bbergstrum.zendesk.com',
    email: 'bbergstrum@hotmail.com',
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
        res.end(JSON.stringify(tickets.slice(firstIndex, lastIndex)));
    }).catch(function (error) {
        //handle API unavailable
        console.error(error);
    });
};

Tickets.prototype.singleTicket = function(ticketId, res) {
    zendesk.tickets.show(ticketId).then(function (ticket) {
        res.end(JSON.stringify(ticket));
    }).catch(console.error);
}

module.exports = Tickets;