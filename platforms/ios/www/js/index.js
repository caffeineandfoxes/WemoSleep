/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

app.initialize();

function getTimeRemaining(endTime) {
  var timeRemaining = Date.parse(endTime) - Date.parse(new Date);
  var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  var seconds = Math.floor((timeRemaining / 1000) % 60);
  return {
    'total': timeRemaining,
    'minutes': minutes,
    'seconds': seconds
  };
}

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}

function resetUI(resetTimer)  {
  location.reload();
}

function sleepTimer(duration) {
  var timerDuration = Math.round(duration);
  var endTime = new Date(Date.parse(new Date()) + timerDuration * 60 * 1000);
  var minutesSpan = $('#minutes');
  var secondsSpan = $('#seconds');
  $('#time-set-div').hide();
  $('#countdown-div').show();

  function updateCountdown() {
    var timeRemaining = getTimeRemaining(endTime);
    var seconds = pad(timeRemaining.seconds)
    minutesSpan.html(timeRemaining.minutes);
    secondsSpan.html(seconds);

    if (timeRemaining.total <= 0) {
      clearInterval(appTimer);
      $('#countdown-div h1').html('Goodnight!');
      var requestAddr = 'https://maker.ifttt.com/trigger/timer_expired/with/key/vAvhm5cEULr-XiOaCyZG1';
      $.get(requestAddr);
      var resetTimer = setInterval(resetUI, 5000, resetTimer);
    }
  }

  updateCountdown();
  var appTimer = setInterval(updateCountdown, 1000);
}

$(document).ready(function() {
  $('#countdown-div').hide();

  $('#submit-time').click(function(evt) {
    evt.preventDefault();
    var timerDuration = $('#number-minutes').val();
    sleepTimer(timerDuration);
  });
});
