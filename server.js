const { Client, GatewayIntentBits } = require('discord.js') ;
const { poemChat } = require('./services/discord/Chat');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageTyping] });



require('dotenv').config();



client.on('messageCreate', poemChat)

client.login(process.env.DISCORD_TOKEN);
