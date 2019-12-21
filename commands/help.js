const list = require("./Commandlist");

module.exports = {
    execute : function(msg,args,Discord){
        var text = ""
        for(var i=0;i<list.commands.length;i++){
            text+= list.commands[i].name+": "+list.commands[i].description+"\n"
        }
        msg.channel.send("```"+text+"```")
    }
}