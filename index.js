const Discord = require('discord.js');
const fs = require('fs');
const { TOKEN } = require('./keys.json');
const stats = require('./stats.json');

if (!stats) {
	//fallback
	stats = { prefix: '-' };
}

const bot = new Discord.Client();

//Ready
bot.on('ready', (msg) => {
	console.log('Prefix: ' + stats.prefix);
	console.log('Ready');
});

//Commands
bot.on('message', (msg) => {
	//Executes Msg-handler
	try {
		require('./handlers/msghandler.js')(msg, bot, stats);
	} catch (err) {
		console.error(err);
	}
});

//Login
try {
	if (!TOKEN) return console.log('Please provide a TOKEN in keys.json');
	bot.login(TOKEN);
} catch (err) {
	console.log(err);
}
