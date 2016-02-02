var CountryView = function(country){
  this.name = document.createElement('h2');
  this.name.innerText = country.name;

  this.capital = document.createElement('p');
  this.capital.innerText = 'Capital ' + country.capital;

  this.population = document.createElement('p');
  this.population.innerText = 'Population ' + country.population;
};

CountryView.prototype = {
  render: function(parent) {
  parent.appendChild(this.name);
  parent.appendChild(this.capital);
  parent.appendChild(this.population);
  }
};