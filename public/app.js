window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1'
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.onload = function(){
    if(request.status === 200) {
      console.log("got the data");
/*****SELECTOR*****/
      var countries = JSON.parse( request.responseText );
      var form = document.getElementById('countries-form');
      var selectList = document.createElement("select");
      /*By assigning the id of ‘countries-select’, this variable can later be called*/
      selectList.id = 'countries-select';
      form.appendChild(selectList);

      /*work in progress*/
      // var placeholder = document.createElement('placeholder');
      // placeholder.value = 'None';
      // placeholder.innerText = 'Choose';
      // selectList.appendChild(placeholder);

      for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.value = JSON.stringify(countries[i]);
        option.text = countries[i].name;
        selectList.appendChild(option);
      }

      var button = document.createElement('input');
      button.id = 'countries-submit'
      button.type = 'button';
      button.value = 'Go';
      form.appendChild(button);

      button.onclick = function() {
        /*As the 'countries-select' id was assigned above, it can now be called upon, .value extracts the value that has been selected*/
       var country = JSON.parse(document.getElementById('countries-select').value);
       /*view for the country is created by the cunstructor function script*/
       var view = new CountryView(country);
       /*A home for that view is created*/
       var div = document.getElementById('country-div');
       /*If there are already residents, they get evicted*/
        while (div.firstChild) {
        div.removeChild(div.firstChild);
        }
        /*The view is then rendered*/
        view.render(div);

       /*****PERSISTING DATA*****/ 

       var countryAppList = JSON.parse( localStorage.getItem('countryAppList') ) || [];

       /*To avoid duplicate data, the if statement maps a new array from the countryAppList array. A function is passed into the map method which returns the country name. Therefore an array of the country names is created in this instance. The ! at the start means that we are asking if this array does not include the country name we want to pass in. If this returns true, the country is pushed to the countryAppList array and then set in the localStorage.*/ /**This is instead of using a loop.**/
       if (!countryAppList.map(function(country){
        return country.name;
       }).includes(country.name)){
       countryAppList.push(country);
       localStorage.setItem('countryAppList', JSON.stringify(countryAppList) );
      }

     /* Find bordering countries */
     var alphaCodes = country.borders;
     console.log(country.borders);
     var borderingCountries = [];
     /*Looping over all countries checking to see if their alpha3Code matches any of those in the selected country's borders array*/
     for (var i = 0; i < countries.length; i++) {
      if (alphaCodes.includes(countries[i].alpha3Code)) {
        borderingCountries.push(countries[i]);
      }
     };

     if(alphaCodes.length > 0) {
       var div = document.getElementById('country-div');
       var border = document.createElement('h3');
       border.innerText = 'Bordering Countries';
       div.appendChild(border);

       for (country of borderingCountries) {
        var view = new CountryView(country);
        view.render(div);
       }
      };
    };
  }
};
  request.send(null);
};
