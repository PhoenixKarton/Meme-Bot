var stats = require("../stats.json");
var fs = require("fs");

module.exports=  {
    execute: function(msg,args,Discord){
        if (args.length <= 1){
            try{
                msg.channel.send("No Argument");
            }catch(err){

            }
        }else{
            stats.prefix = args[1];

            //Save
            fs.writeFile("../Meme-Bot/stats.json",JSON.stringify(stats),(err)=>{
                if(err) throw err;
                console.log(JSON.stringify(stats));
                console.log("Stats saved");
            });
            msg.channel.send("Prefix is now: "+stats.prefix);
        }
    }
}