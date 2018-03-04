module.exports = () => 
  new Promise((resolve, reject) => {
    console.log("get-last-seen-tweet");
    
    // start here to catch danielle's haiku 969262538650202113
    // danielle's haiku is at 970025608095911936
    resolve(969262538650202113);
  });