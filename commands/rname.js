const tr = require("tinyreq");
const fs = require("fs");
const xml = require("xml2js");
const parser = new xml.Parser()
const Api = require("../keys.json").ApiBTN;

var zahl = Math.random();
if (zahl <= 0.5){
    var usage = "eng"
}else{
    var usage = "ger"
}

module.exports=  {
    execute: function(msg,args,Discord){
        var link = "https://www.behindthename.com/api/random.php?usage="+ usage +"&number=1&key=" + Api
        if(args[1] != null){
            try{
                console.log(args[1]);
                let id = args[1].substring(3,args[1].length-1);
                var member = msg.guild.members.get(id);
                console.log(id);
            }catch(err){
                msg.channel.send("This user dosen't exist!");
                console.error(err);
            }
        }else{
            var member = msg.member;
        }
        tr(link,function(err,body){
            if(err | member == null){
                console.log(err);
            }else{
                parser.parseString(body,function (err, result){
                    var name = result.response.names[0].name[0],
                        mention1 = "<@!"+msg.author.id+">",
                        mention2 = member.nickname;
                    member.setNickname(name).catch(console.error);
                    msg.channel.send(mention1 + " changed the name from "+mention2+" to: "+name).catch(console.error);;
                });
            }
        });
    }
}
// console.log(JSON.stringify(result.response.names[0].name[0]));
// Api use from www.behindthename.com