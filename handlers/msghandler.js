const {readdirSync} = require("fs");

const COMMANDPATH = "./commands";

module.exports = function (msg, client, stats) {
    const { prefix } = stats;

    //Search for prefix
    if (msg.content.substring(0, prefix.length) !== prefix) {
      return;
    }
    console.log("Prefix found!");

    //Msg transformed to array
    const args = msg.content
      .substring(prefix.length)
      .split(" ")
      .filter(e => e !== "");

    console.log("Arguments: ", args, "\nLength: ", args.length);

    const command = getCommand(args[0]) 
    if(!command) return console.log("Not a valid command:", args[0]);

    //execute command
    command.execute(msg, args, client);

    console.log("----------------------------");
};

function getCommand(input) { 
    const dir = readdirSync(COMMANDPATH).filter(e => e.endsWith(".js"));
    console.log(dir);

    const fileName = dir.find(e => e === `${input}.js`);

    return require(`.${COMMANDPATH}/${fileName}`);
}
