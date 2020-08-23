// var axios = require('axios');

// require('dotenv').config();

// module.exports = async function() {
//     let url = 'https://www.googleapis.com/calendar/v3/calendars/hs2ph75jmdfaaoaq2c1pg4mtbg@group.calendar.google.com/events?key=AIzaSyBdnlvDuGuoiZ-nTYqaoIw57KCF27V-y9M'
//     let urlmasked = 'https://www.googleapis.com/calendar/v3/calendars/${process.env.googleCalendar_ID}/events?key=${process.env.googleCalendar_KEY}'

//     return axios.get(url)
//     .then(function(response) {
//         return response.data.items;
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// }