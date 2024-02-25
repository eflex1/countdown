function startCountdown(endTimestamp) {
  var daysElement = document.getElementById('daysValue');
  var hoursElement = document.getElementById('hoursValue');
  var minutesElement = document.getElementById('minutesValue');
  var secondsElement = document.getElementById('secondsValue');
  var endDateTimeElement = document.getElementById('endDateTime');

  function updateCountdown() {
    var currentTime = Math.floor(new Date().getTime() / 1000);
    var remainingTime = endTimestamp - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timer);
      daysElement.innerHTML = '00';
      hoursElement.innerHTML = '00';
      minutesElement.innerHTML = '00';
      secondsElement.innerHTML = '00';

      var endDate = new Date(endTimestamp * 1000);
      endDateTimeElement.innerHTML = "Time's up! " + formatDate(endDate);
    } else {
      var days = Math.floor(remainingTime / 86400); // 1 day = 86400 seconds
      var hours = Math.floor((remainingTime % 86400) / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = remainingTime % 60;

      days = (days < 10) ? '0' + days : days;
      hours = (hours < 10) ? '0' + hours : hours;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;

      daysElement.innerHTML = days;
      hoursElement.innerHTML = hours;
      minutesElement.innerHTML = minutes;
      secondsElement.innerHTML = seconds;

      var endDate = new Date(endTimestamp * 1000);
      endDateTimeElement.innerHTML = "Giveaway Ends On: " + formatDate(endDate) + ' ' + formatTime(endDate);
    }
  }

  function formatDate(date) {
    var options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  function formatTime(date) {
    var options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  updateCountdown(); // Call it once to update immediately

  var timer = setInterval(updateCountdown, 1000);
}

// Retrieve the stored end timestamp from localStorage
var storedEndTimestamp = localStorage.getItem('countdownEndTimestamp');

// If the end timestamp is stored, use it; otherwise, calculate it
if (storedEndTimestamp) {
  // Convert the stored string to a number
  var endTimestamp = parseInt(storedEndTimestamp);

  // Start the countdown with the stored end timestamp
  startCountdown(endTimestamp);
} else {
  // Calculate the end timestamp (current timestamp + 10 days)
  var endTimestamp = Math.floor(new Date().getTime() / 1000) + 10 * 24 * 60 * 60;

  // Save the end timestamp in localStorage
  localStorage.setItem('countdownEndTimestamp', endTimestamp);

  // Start the countdown with the calculated end timestamp
  startCountdown(endTimestamp);
}
