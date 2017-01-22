export function getDateString(dateStr) {
  var d = new Date(dateStr);
  var month = d.getUTCMonth(); // 0-11
  var day = d.getUTCDate(); // 1-31
  var dayName = d.getUTCDay();  // 0-6
  var year = d.getUTCFullYear(); // 2017

  var dayNames = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
  ];
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  var currentDay = dayNames[dayName];
  var currentMonth = monthNames[month];

  var newDateString = `${currentDay} ${currentMonth} ${day}, ${year}`;
  return newDateString;


};
