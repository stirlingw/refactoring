// Generated by CoffeeScript 1.6.2
(function() {
  var ChildrensPrice, Customer, Movie, NewReleasePrice, Price, RegularPrice, Rental, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Movie = (function() {
    Movie.CHILDRENS = 2;

    Movie.REGULAR = 0;

    Movie.NEW_RELEASE = 1;

    function Movie(title, priceCode) {
      this._title = title;
      this.setPriceCode(priceCode);
    }

    Movie.prototype.getPriceCode = function() {
      return this.price.getPriceCode();
    };

    Movie.prototype.getCharge = function(daysRented) {
      return this.price.getCharge(daysRented);
    };

    Movie.prototype.getFrequentRenterPoints = function(daysRented) {
      return this.price.getFrequentRenterPoints(daysRented);
    };

    Movie.prototype.getTitle = function() {
      return this._title;
    };

    Movie.prototype.setPriceCode = function(priceCode) {
      switch (priceCode) {
        case Movie.REGULAR:
          return this.price = new RegularPrice();
        case Movie.NEW_RELEASE:
          return this.price = new NewReleasePrice();
        case Movie.CHILDREN:
          return this.price = new ChildrensPrice();
      }
    };

    return Movie;

  })();

  Rental = (function() {
    function Rental(movie, daysRented) {
      this._movie = movie;
      this._daysRented = daysRented;
    }

    Rental.prototype.getDaysRented = function() {
      return this._daysRented;
    };

    Rental.prototype.getMovie = function() {
      return this._movie;
    };

    Rental.prototype.getCharge = function() {
      return this._movie.getCharge(this._daysRented);
    };

    Rental.prototype.getFrequentRenterPoints = function() {
      return this._movie.getFrequentRenterPoints(this._daysRented);
    };

    return Rental;

  })();

  Customer = (function() {
    function Customer(name) {
      this._name = name;
      this._rentals = [];
    }

    Customer.prototype.addRental = function(rental) {
      return this._rentals.push(rental);
    };

    Customer.prototype.getName = function() {
      return this._name;
    };

    Customer.prototype.statement = function() {
      var rental, result, _i, _len, _ref;

      result = "Rental Record for " + this.getName() + "\n";
      _ref = this._rentals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rental = _ref[_i];
        result += "\t" + rental.getMovie().getTitle() + "\t" + rental.getCharge() + "\n";
      }
      result += "Amount owed is " + this.getTotalCharge() + "\n";
      result += "You earned " + this.getTotalFrequentRenterPoints() + " frequent renter points";
      return result;
    };

    Customer.prototype.htmlStatement = function() {
      var rental, result, _i, _len, _ref;

      result = "<h1>Rental record for <b>" + this.getName() + "</b></h1>" + "\n";
      _ref = this._rentals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rental = _ref[_i];
        result += "<p>" + rental.getMovie().getTitle() + "\t" + rental.getCharge() + "\n";
      }
      result += "Amount owed is " + this.getTotalCharge() + "\n";
      result += "You earned " + this.getTotalFrequentRenterPoints() + " frequent renter points";
      return result;
    };

    Customer.prototype.getTotalCharge = function() {
      var rental, total, _i, _len, _ref;

      total = 0;
      _ref = this._rentals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rental = _ref[_i];
        total += rental.getCharge();
      }
      return total;
    };

    Customer.prototype.getTotalFrequentRenterPoints = function() {
      var rental, total, _i, _len, _ref;

      total = 0;
      _ref = this._rentals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rental = _ref[_i];
        total += rental.getFrequentRenterPoints();
      }
      return total;
    };

    return Customer;

  })();

  Price = (function() {
    function Price() {}

    Price.prototype.getPriceCode = function() {
      return this._priceCode;
    };

    Price.prototype.getdaysRented = function(daysRented) {
      return this._daysRented;
    };

    Price.prototype.getFrequentRenterPoints = function(daysRented) {
      return 1;
    };

    return Price;

  })();

  ChildrensPrice = (function(_super) {
    __extends(ChildrensPrice, _super);

    function ChildrensPrice() {
      _ref = ChildrensPrice.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ChildrensPrice.prototype.getPriceCode = function() {
      return Movie.CHILDRENS;
    };

    ChildrensPrice.prototype.getCharge = function(daysRented) {
      var amount;

      amount = 1.50;
      if (daysRented > 3) {
        amount += (daysRented - 3) * 1.50;
      }
      return amount;
    };

    return ChildrensPrice;

  })(Price);

  NewReleasePrice = (function(_super) {
    __extends(NewReleasePrice, _super);

    function NewReleasePrice() {
      _ref1 = NewReleasePrice.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    NewReleasePrice.prototype.getPriceCode = function() {
      return Movie.NEW_RELEASE;
    };

    NewReleasePrice.prototype.getCharge = function(daysRented) {
      return daysRented * 3;
    };

    NewReleasePrice.prototype.getFrequentRenterPoints = function(daysRented) {
      if (daysRented > 1) {
        return 2;
      }
      return 1;
    };

    return NewReleasePrice;

  })(Price);

  RegularPrice = (function(_super) {
    __extends(RegularPrice, _super);

    function RegularPrice() {
      _ref2 = RegularPrice.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    RegularPrice.prototype.getPriceCode = function() {
      return Movie.REGULAR;
    };

    RegularPrice.prototype.getCharge = function(daysRented) {
      var amount;

      amount = 2.00;
      if (daysRented > 2) {
        amount += (daysRented - 2) * 1.50;
      }
      return amount;
    };

    return RegularPrice;

  })(Price);

  $(function() {
    var customer, finding_nemo, hot_shots, rental1, rental2, rental3, where_art_there;

    customer = new Customer("Stirling");
    hot_shots = new Movie("Hot Shots Two", Movie.NEW_RELEASE);
    finding_nemo = new Movie("Finding Nemo", Movie.CHILDREN);
    where_art_there = new Movie("Oh Brother, Where art though", Movie.REGULAR);
    rental1 = new Rental(hot_shots, 5);
    rental2 = new Rental(where_art_there, 3);
    rental3 = new Rental(finding_nemo, 2);
    customer.addRental(rental1);
    customer.addRental(rental2);
    customer.addRental(rental3);
    $("pre#textoutput").text(customer.statement());
    return $("div#htmloutput").html(customer.htmlStatement());
  });

}).call(this);
