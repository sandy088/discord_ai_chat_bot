const { default: axios } = require('axios');
const { main, replyForImage } = require('../ai_chat_response');

const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const { downloadImage } = require('../Images/DownloadImages');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageTyping] });


exports.poemChat = async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    if (message.attachments.size > 0) {
        this.imageReply(message)
    } else {
        if (message.content) {
            console.log(message.content)
            message.channel.sendTyping()
            const response = await main(message.content);

            console.log(response)
            if (response.length < 2000) {
                message.reply(response);
            } else {
                message.reply("Sorry, I can't send messages longer than 2000 characters");
            }

        }
    }



}



exports.imageReply = async (message) => {


    // Check if the message has an attachment and is an image

    if (message.attachments.size > 0) {
        try {

            // console.log("Here is the URL:", message.attachments.first().url)

            const data = {
                imageURL: message.attachments.first().url,
                token: "sandyv3456"
            }
            
            let resData = ''
            await axios.post('https://coral-app-w7sdy.ondigitalocean.app/api/image/recognize', data).then((res) => {
                
                resData = res.data.text

                    ; (async () => {
                        if (message.content !="") {

                            message.channel.sendTyping()
                            const replyText = await replyForImage(message.content, resData)
                            if (replyText.length < 2000) {
                                message.reply(replyText);
                            } else {
                                message.reply("Sorry, I can't send messages longer than 2000 characters");
                            }
                        } else {
                           
                            message.channel.sendTyping()
                            const replyText = await replyForImage(imageData = resData)
                            if (replyText.length < 2000) {
                                message.reply(replyText);
                            } else {
                                message.reply("Sorry, I can't send messages longer than 2000 characters");
                            }
                        }
                    })()
            }).catch((err) => {
                console.log(err)
            }

            );

            // console.log('Image read successfully:', apiResponse);
        } catch (error) {
            console.error('This error occured while reading image data', error);
        }
    }
};


