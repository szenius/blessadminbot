const { isSameDate } = require("../utils/date_utils.js");

// Assumes that events are of unique dates
const getEvent = date => {
  return events.find(event => isSameDate(date, event.date));
};

// TODO: Populate with actual schedule
// TODO: Migrate to database
const events = [
  {
    date: new Date("September 8 2019 21:00 GMT+08:00"),
    eventName: "test event",
    dateString: "today 10PM",
    deadline: new Date("September 8 2019 22:00 GMT+08:00"),
  },
  {
    date: new Date("September 9 2019 21:00 GMT+08:00"),
    eventName: "test event",
    dateString: "today 10PM",
    deadline: new Date("September 9 2019 22:00 GMT+08:00"),
  },
  {
    date: new Date("September 10 2019 21:00 GMT+08:00"),
    eventName: "test event",
    dateString: "today 10PM",
    deadline: new Date("September 10 2019 22:00 GMT+08:00"),
  },
  {
    date: new Date("September 11 2019 21:00 GMT+08:00"),
    eventName: "test event",
    dateString: "today 10PM",
    deadline: new Date("September 11 2019 22:00 GMT+08:00"),
  },
  {
    date: new Date("September 12 2019 21:00 GMT+08:00"),
    eventName: "test event",
    dateString: "today 10PM",
    deadline: new Date("September 12 2019 22:00 GMT+08:00"),
  },
  {
    date: new Date("September 13 2019 21:00 GMT+08:00"),
    eventName: "test event",
    dateString: "today 10PM",
    deadline: new Date("September 13 2019 22:00 GMT+08:00"),
  },
  {
    date: new Date("September 14 2019 21:00 GMT+08:00"),
    eventName: "test event",
    dateString: "today 10PM",
    deadline: new Date("September 14 2019 22:00 GMT+08:00"),
  },
  {
    date: new Date("September 17 2019 10:00 GMT+08:00"),
    eventName: "recap session",
    dateString: "this Friday 20 Sept 7.50PM",
    deadline: new Date("September 20 2019 20:00 GMT+08:00"),
  },
  {
    date: new Date("October 8 2019 10:00 GMT+08:00"),
    eventName: "recap session",
    dateString: "this Friday 11 Oct 7.50PM",
    deadline: new Date("October 11 2019 20:00 GMT+08:00"),
  }
];

module.exports = {
  getEvent
};
