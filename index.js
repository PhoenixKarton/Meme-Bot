const Discord = require("discord.js");
const fs = require('fs');
const TOKEN = require("./keys.json");
var stats = require("./stats.json");



var bot = new Discord.Client();
bot.createVoiceBroadcast(); 



//Ready
bot.on("ready", msg =>{
    console.log("Prefix: " + stats.prefix);
    require("./commands/reload.js").execute(null,null,bot)
    console.log("Ready");
});


//Commands

bot.on("message", msg =>{
    //Executes Msg-handler
    try{
        require("./handlers/msghandler.js").execute(msg, bot);
    }catch(err){
        console.error(err);
    }
});


//Login
try{
bot.login(TOKEN.TOKEN);
}catch(err){
    console.log(err);
}

