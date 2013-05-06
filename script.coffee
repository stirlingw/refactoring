class Movie
  @CHILDRENS = 2
  @REGULAR = 0
  @NEW_RELEASE = 1
  constructor: (title, priceCode) ->
    @_title = title;
    @setPriceCode(priceCode)
  getPriceCode: ->
    @price.getPriceCode();
  getCharge: (daysRented) ->
    @price.getCharge(daysRented);
  getFrequentRenterPoints: (daysRented) ->
    @price.getFrequentRenterPoints(daysRented);
  getTitle: ->
    @_title
  setPriceCode: (priceCode) ->
    switch (priceCode)
      when Movie.REGULAR
        @price = new RegularPrice(); 
      when Movie.NEW_RELEASE
        @price = new NewReleasePrice();
      when Movie.CHILDREN
        @price = new ChildrensPrice();

class Rental
  constructor: (movie, daysRented) ->
    @_movie = movie
    @_daysRented = daysRented
  getDaysRented: ->
    @_daysRented
  getMovie: ->
    @_movie
  getCharge: ->
    @_movie.getCharge(@_daysRented);
  getFrequentRenterPoints: () ->
    @_movie.getFrequentRenterPoints(@_daysRented);
    

class Customer
  constructor: (name) ->
    @_name = name;
    @_rentals = [];
  addRental: (rental) ->
    @_rentals.push(rental)
  getName: -> 
    @_name
  statement: () ->
    result = "Rental Record for " + @getName() + "\n"
    for rental in @_rentals  
      # show figures for this rental
      result += "\t" + rental.getMovie().getTitle() + "\t" + rental.getCharge() + "\n"
    result += "Amount owed is " + @getTotalCharge() + "\n"
    result += "You earned " + @getTotalFrequentRenterPoints() + " frequent renter points"
    result
  htmlStatement: () ->
    result = "<h1>Rental record for <b>" + @getName() + "</b></h1>" + "\n";
    for rental in @_rentals
      result += "<p>" + rental.getMovie().getTitle() + "\t" + rental.getCharge() + "\n"
    result += "Amount owed is " + @getTotalCharge() + "\n"
    result += "You earned " + @getTotalFrequentRenterPoints() + " frequent renter points"
    result
  getTotalCharge: () ->
    total = 0;
    for rental in @_rentals
      total += rental.getCharge();
    total
  getTotalFrequentRenterPoints: () -> 
    total = 0;
    for rental in @_rentals
      total += rental.getFrequentRenterPoints();
    total  
  
class Price
  getPriceCode: () ->
    @_priceCode
  getdaysRented: (daysRented) ->
    @_daysRented
  getFrequentRenterPoints: (daysRented)->
    return 1;
    
class ChildrensPrice extends Price
  getPriceCode: ()->
    return Movie.CHILDRENS;
  getCharge: (daysRented) ->
    amount = 1.50
    if (daysRented > 3)
      amount += (daysRented - 3) * 1.50
    return amount;
    
class NewReleasePrice extends Price
  getPriceCode: () ->
    return Movie.NEW_RELEASE;
  getCharge: (daysRented) ->
    return daysRented * 3
  getFrequentRenterPoints: (daysRented)->
    if (daysRented > 1)
      return 2;
    return 1;
    
class RegularPrice extends Price
  getPriceCode: () ->
    return Movie.REGULAR;
  getCharge: (daysRented) ->
    amount = 2.00;
    if (daysRented > 2)
      amount += (daysRented - 2) * 1.50;
    return amount;   
$ ->    
	customer = new Customer("Stirling")
	hot_shots = new Movie("Hot Shots Two", Movie.NEW_RELEASE)
	finding_nemo = new Movie("Finding Nemo", Movie.CHILDREN)
	where_art_there = new Movie("Oh Brother, Where art though", Movie.REGULAR)
	rental1 = new Rental(hot_shots, 5)
	rental2 = new Rental(where_art_there, 3)
	rental3 = new Rental(finding_nemo, 2)
	customer.addRental(rental1)
	customer.addRental(rental2)
	customer.addRental(rental3)
	$("pre#textoutput").text(customer.statement())
	$("div#htmloutput").html(customer.htmlStatement())
