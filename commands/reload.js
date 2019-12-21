const fs = require("fs")
const tr = require("tinyreq")
var stats = require("../stats.json")


function execute(msg,args,Discord){
    var subreddit = 'https://www.reddit.com/'+ stats.links[stats.link]+'/.json?sort=top&t=day&limit=500'
    tr(subreddit,(err,body)=>{
        if(err == null){
            fs.writeFile("./reddit.json",JSON.stringify(body),(err) =>{
                stats.number = 0
                fs.writeFileSync("./stats.json",JSON.stringify(stats))
                try {delete require.cache[require.resolve('../reddit.json')]} catch(err){throw err}
                try{ msg.channel.send("Reloaded: "+ stats.links[stats.link]) } catch (err){ console.log("Reloaded")}
            } );

       }
    })
}

module.exports = {execute}