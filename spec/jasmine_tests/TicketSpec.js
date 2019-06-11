// dependencies
var httpMocks = require('node-mocks-http');
var Tickets = require('../../src/tickets');

describe("Ticket", function () {
  beforeEach(function () {
    tickets = new Tickets();
  });

  it("object should be able to grab tickets for a given page from the Zendesk API", function () {
    // Arrange
    // Mock a response object - this is usually provided by Express
    var response = httpMocks.createResponse();

    // Act
    // ticketsPerPage takes two arguments, pageId and a response object. A default page number is given instead
    var actual = tickets.ticketsPerPage(1, response);

    // Assert
    // Return type of this function is undefined, instead it writes to the response
    expect(actual).toBe(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');
  });

  // demonstrates use of spies to intercept and test method calls
  it("object should be able to get a single ticket from the Zendesk API", function () {
    // Arrange
    var response = httpMocks.createResponse();

    // Act
    // singleTicket takes the selected ticket ID as an argument
    var actual = tickets.singleTicket(1, response);

    // Assert
    // Return type of this function is undefined, instead it writes to the response
    expect(actual).toBe(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');
  });
});
