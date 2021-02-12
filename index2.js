const { nextISSTimesForMyLocation } = require("./iss_promised")
const { showMyDates } = require("./index");


nextISSTimesForMyLocation()
  .then((flyoverTimes) => {
    showMyDates(flyoverTimes);
  })
  .catch((error) => {
    console.log("No flyover for you: ", error.message);
  });
  