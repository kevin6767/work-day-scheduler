let hours = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
  };
  
  $(document).ready(function(){
    if(!localStorage.getItem('hours')) {
      update(hours);
    } else {
      update(JSON.parse(localStorage.getItem('hours')));
    }
  })
  
  $('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  
  let counter = 1;
  for(const property in hours) {
    let text = "#text-entry" + counter;
    $(text).text(hours[property]);
    let timeId = "#time" + counter;
    let presentHour = moment().hour();
    let timeString = $(timeId).text();
    let timeNumber = conversion(timeString);  
    if(timeNumber < presentHour) {
      $(text).addClass("past");
    } else if (timeNumber > presentHour) {
      $(text).addClass("future");
    } else {
      $(text).addClass("present");
    }
    counter ++;
  }
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saved(hourString, value);
  });
  
  function conversion(hourString) {
    switch(hourString) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }
  
  function load() {
    result = localStorage.getItem('hours')
    return (result ? result : hours);
  }
  
  function init() {
    localStorage.setItem('hours', JSON.stringify(hours));
  };
  
  function save(dayObj) {
    localStorage.setItem('hours', JSON.stringify(dayObj));
  }
  
  function saved(hourString, val) {
    if(!localStorage.getItem('hours')) {
      init();
    }
  
    let workHours = JSON.parse(localStorage.getItem('hours'));
    workHours[hourString] = val
  
    save(workHours);
  }
  
  function update(dayObject) {
    $(".time-list").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }