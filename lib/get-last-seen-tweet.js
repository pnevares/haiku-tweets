module.exports = () => 
  new Promise((resolve, reject) => {
    console.log("get-last-seen-tweet");
    
    resolve(1234567890);
  });