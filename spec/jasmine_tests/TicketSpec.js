// dependencies
var httpMocks = require('node-mocks-http');
var Tickets = require('../../src/tickets');
var router = require('../../routes/router')


describe("Tickets class", function () {
  beforeEach(function () {
    tickets = new Tickets();
  });

  it("should be able to grab tickets for a given page from the Zendesk API", function () {
    // Arrange
    // Mock a response object - this is usually provided by Express
    var response = httpMocks.createResponse();

    // Act
    // ticketsPerPage takes two arguments, pageId and a response object. A default page number is given instead
    const actual = tickets.ticketsPerPage(1, response);

    // Assert
    // Return type of this function is undefined, instead it writes to the response
    expect(actual).toBe(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');
  });

  it("should be able to get a single ticket from the Zendesk API", function () {
    // Arrange
    const response = httpMocks.createResponse();

    // Act
    // singleTicket takes the selected ticket ID as an argument and the JSON from Zendesk API
    const actual = tickets.singleTicket(1, response);

    // Assert
    // Return type of this function is undefined, instead it writes to the response
    expect(actual).toBe(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');
  });

  it("should be able to get total amount of tickets", function () {
    // Arrange
    const response = httpMocks.createResponse();

    // Act
    // singleTicket takes the selected ticket ID as an argument and the JSON from Zendesk API
    const actual = tickets.totalTickets(response);

    // Assert
    // Return type of this function is undefined, instead it writes to the response
    expect(actual).toBe(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');
  });
});

describe("using express router, it should be able to grab tickets for a given page from the Zendesk API", function () {
  it("should return a JSON object upon request", function () {
    // Arrange
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/ticketsByPage/:pageId',
      params: {
        pageId: 1
      }
    });

    const res = httpMocks.createResponse();

    // Act
    router(req, res);

    // Assert
    expect(res).not.toBe(undefined);
    expect(res).not.toBe(null);
    expect(res._isJSON()).toBe(true);
  });

  describe("using express router, it should be able to get a single ticket from the Zendesk API", function () {
    it("should return a JSON object upon request", function () {
      // Arrange
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/ticket/1'
      });
  
      const res = httpMocks.createResponse();
  
      // Act
      router(req, res);
  
      // Assert
      expect(res).not.toBe(undefined);
      expect(res).not.toBe(null);
      expect(res._isJSON()).toBe(true);
    });
  });

  describe("using express router, it should be able to get total amount of tickets", function () {
    it("should return a JSON object upon request", function () {
      // Arrange
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/tickets/total'
      });
  
      const res = httpMocks.createResponse();
  
      // Act
      router(req, res);
  
      // Assert
      expect(res).not.toBe(undefined);
      expect(res).not.toBe(null);
      expect(res._isJSON()).toBe(true);
    });
  });
});
