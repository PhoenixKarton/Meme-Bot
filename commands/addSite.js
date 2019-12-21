var stats = require("../stats.json")
var links = stats.links
const fs = require("fs")
const tr = require("tinyreq")

var execute = (msg,args,Discord)=>{
    if(stats.banned.indexOf(args[1]) ==! -1){
        msg.channel.send("Kys")
    }else if (args[1] != null){
        var l = 'https://www.reddit.com/'+ args[1] + "/.json"
        if(args[1].substring(0,2) == "r/"){

            tr(l,(err,body)=>{

                if(err == null && links.indexOf(args[1]) === -1 && JSON.parse(body).message != "Not Found" && JSON.parse(body).message != "Forbidden" ){
                    let nPosts = JSON.parse(body).data.children.length
                    if(nPosts> 3){
                        links.push(args[1])
                        msg.channel.send("Link saved!")
                    }else{
                        msg.channel.send("No Posts!")
                    }
                }else if(links.indexOf(args[1]) ==! -1){
                    msg.channel.send("Already added!") 
                }else if(JSON.parse(body).message == "Forbidden"){
                    msg.channel.send(JSON.parse(body).reason)
                }
                else {
                    msg.channel.send("Site doesn't exist!") 
                }
            })

        }else{
            msg.channel.send("Try \"r/\" infront!") 
        }
    }else{
        var message = ""
        for( var n=0;n < links.length;n++){
            if(n == stats.link ){
                message +=  n +": _"+links[n]+"_ \n"
            }else {
                message += n+": "+links[n]+"\n"
            }
        }

        msg.channel.send("```Markdown\n"+message+ "```")
    }
    fs.writeFileSync("./stats.json",JSON.stringify(stats))
}



module.exports = {execute}

/*var embed = {
    
      title: JSON.parse(body).data.children[0].subreddit,
      description: "description",
      url: "subreddit url",
      color: 9922000,
      
      thumbnail: {
        url: "subreddit pic"
      },
  
      fields: [
        {
            name: "Number of posts:",
            value: "10"
        },
        {
            name: "Number of subscriber:",
            value: JSON.parse(body).data.children[0].subreddit_subscribers
        }
      ]
    }*/
  