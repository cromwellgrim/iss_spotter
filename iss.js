const request = require("request");

const fetchMyIp = function(callback) {
 
  request('https://api.ipify.org?format=json', function(error, response, body) {
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      return callback(Error(msg), null);
    }
    if (error) {
      return callback(error, null);
    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });

};

const fetchCoordsByIp = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    
    if (response.statusCode !== 200) {
      msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      return callback(Error(msg), null);
    }
    if (error) {
      return callback(error, null);
    }
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
    
    if (response.statusCode !== 200) {
      msg = `Status Code ${response.statusCode} when fetching ISS flyover times: ${body}`;
      return callback(Error(msg), null);
    }
    if (error) {
      return callback(error, null);
    }
    const flyovers = JSON.parse(body).response;
    return callback(null, flyovers);
  });

};

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIp((error, ip) => {
    
    if (error) {
      return callback(error, null);
    }
    
    fetchCoordsByIp(ip, (error, coordinates) => {
      
      if (error) {
        return callback(error, null);
      } 
      
      fetchISSFlyOverTimes(coordinates, (error, passOver) => {
        if (error) {
          return callback(error, null);
        }
        
        return callback(null, passOver);
      })
    })
  })
};

module.exports = { nextISSTimesForMyLocation };