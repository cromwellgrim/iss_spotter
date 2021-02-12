const { nextISSTimesForMyLocation } = require('./iss');

const showMyDates = function(flyoverDates) {
  for (let flyoverDate of flyoverDates) {
    let datetime = new Date(0);
    datetime.setUTCSeconds(flyoverDate.risetime);
    let duration = flyoverDate.duration;
    console.log(`Next flyover at ${datetime} for ${duration} second!`)
  }
};

nextISSTimesForMyLocation((error, flyoverDates) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  console.log(flyoverDates);
  showMyDates(flyoverDates);

});

module.exports = { showMyDates };