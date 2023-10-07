const HOST = 'http://127.0.0.1:5001';

function searchPlace () {
  $.post({
    url: `${HOST}/api/v1/places_search`,
    data: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    success: (data) => {
      $('section.places').empty(); // clear existing content, if you dont , it appends the amenities and so you will repeated amenities over and over
      data.forEach(place => $('section.places').append(
        `<article>
          <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
          ${place.description}
          </div>
          </article>`
      ));
    },
    dataType: 'json'
  });
}

$(function () {
  const amenities = {};
  $('li input[type=checkbox]').change(
    function () {
      if (this.checked) {
        amenities[this.dataset.name] = this.dataset.id;
      } else {
        delete amenities[this.dataset.name];
      }
      $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
    });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Bind the click event to the SearchPlace function
  $('.filters button').bind('click', searchPlace);

  // call the searchPlace function
  searchPlace();
});
