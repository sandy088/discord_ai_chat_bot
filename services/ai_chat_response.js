const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

require('dotenv').config();

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;

const clientAi = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

exports.main = async(prompt)=> {

    try {
        const result = await clientAi.generateMessage({
            model: MODEL_NAME, // Required. The model to use to generate the result.
            temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
            candidateCount: 1, // Optional. The number of candidate results to generate.
            prompt: {
              // optional, preamble context to prime responses
              context: process.env.CONTEXT,
              // Optional. Examples for further fine-tuning of responses.
            //   examples: [
            //     {
            //       input: { content: process.env.EXAMPLE_INPUT },
            //       output: {
            //         content:
            //           process.env.EXAMPLE_OUTPUT,
            //       },
            //     },
            //   ],
              // Required. Alternating prompt/response messages.
              messages: [{ content: prompt }],
            },
          });

          return result[0].candidates[0].content;
    } catch (error) {
        console.log(error)
        return "Some errro occured from myside🧐, You can try again later or you can try to send me shorter messages";
    }
  
}


exports.replyForImage = async(prompt="This is the text in the and explain about this image", imageData="")=> {

  try {
      const result = await clientAi.generateMessage({
          model: MODEL_NAME, // Required. The model to use to generate the result.
          temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
          candidateCount: 1, // Optional. The number of candidate results to generate.
          prompt: {
            // optional, preamble context to prime responses
            context: "This is the text in the image and Now explain about this image and its content",
            // Optional. Examples for further fine-tuning of responses.
          //   examples: [
          //     {
          //       input: { content: process.env.EXAMPLE_INPUT },
          //       output: {
          //         content:
          //           process.env.EXAMPLE_OUTPUT,
          //       },
          //     },
          //   ],
            // Required. Alternating prompt/response messages.
            messages: [{ content: prompt+imageData }],
          },
        });

        return result[0].candidates[0].content;
  } catch (error) {
      console.log(error)
      return "Some errro occured from myside🧐, You can try again later or you can try to send me shorter messages";
  }

}
