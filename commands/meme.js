
const tr = require("tinyreq");
const fs = require("fs");
var stats = require("../stats.json");


function execute(msg,args,Discord){
  const body = JSON.parse(require("../reddit.json"))
  var post = body.data.children;
  console.log("Post Created");
  try{
    msg.channel.send({ 
      embed: {
        title: post[stats.number].data.title,
        color: 6780159,
        url: post[stats.number].data.url,
        image: { url: post[stats.number].data.url },
        description: post[stats.number].data.url,
        footer: { text: `posted by ${post[stats.number].data.author} on ${post[stats.number].data.subreddit}` }
      }
    })
          
  }catch(err){
    console.log(err);
  }
  stats.number += 1
  if(stats.number >= 100){
    stats.number = 0;
  }
  //Save
  fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
    if (err) throw err;
    console.log('Stats saved');
  });
}

module.exports = {execute}
