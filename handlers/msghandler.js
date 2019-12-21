const stats = require("../stats.json"),
prefix = stats.prefix,
clist = require("../commands/Commandlist.json").commands;

module.exports = {
    execute: function(msg,client){
        //Search for prefix
        if(msg.content.substring(0,prefix.length) == prefix){
            console.log("Prefix found!");
            
            //Msg transformed to array
            var content = msg.content.substring(prefix.length).split(" "),
            args =[]; 
            content.forEach(element => {
                if(element != ""){
                    args.push(element);
                } 
            });
            console.log("Arguments: ",args,"\nLength: ",args.length);

            //Search for command
            var found = false;
            clist.forEach(element =>{
                if(element.name == args[0]){
                    found = true;
                    console.log("Command found!");
                    require("."+element.path).execute(msg,args,client);
                    
                }
            });
            
            console.log("----------------------------");
        }
    }
}