const {main} = require('../ai_chat_response');

const { Client, GatewayIntentBits } = require('discord.js') ;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageTyping] });


exports.poemChat = async(message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

     

    if (message.content) {
        console.log(message.content)
        message.channel.sendTyping()
        const response = await main(message.content);
        
        console.log(response)
        if(response.length < 2000) {
            message.reply(response);
        }else {
            message.reply("Sorry, I can't send messages longer than 2000 characters");
        }
        
    }
}

