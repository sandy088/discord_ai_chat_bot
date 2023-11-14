const { Client, GatewayIntentBits } = require('discord.js') ;
const { poemChat } = require('./services/discord/Chat');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageTyping] });

const express = require('express');
const app = express();

app.use(express.json());    

require('dotenv').config();



client.on('messageCreate', poemChat)

client.login(process.env.DISCORD_TOKEN);


app.get('/', (req, res) => {
    res.json({health: "Hey I am a Discord bot and running"})
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started")
})
