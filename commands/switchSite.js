const fs = require("fs")
var stats = require("../stats.json")


function execute(msg,args,Discord){
    if (args[1] != null){
        try{
            var n = Number(args[1])
            if(n>=0 && n<stats.links.length){
                stats.link = n 
                fs.writeFileSync("./stats.json",JSON.stringify(stats))
                msg.channel.send("Switched Site to: "+ stats.links[n] )
                require("./reload.js").execute(msg,args,Discord)
            }
        }catch(err){

        }
    }else{
        var message = ""
        for( var n=0;n < stats.links.length;n++){
            if(n == stats.link ){
                message +=  n +": _"+stats.links[n]+"_ \n"
            }else {
                message += n+": "+stats.links[n]+"\n"
            }
        }
        
        msg.channel.send("```Markdown\n"+message+ "```")
    }
    fs.writeFileSync("./stats.json",JSON.stringify(stats))
}

    





module.exports = {execute}