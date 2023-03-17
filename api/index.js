const express = require("express");
const twilio = require("twilio");
const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const toNumber = process.env.TWILIO_TO_NUMBER;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const client = twilio(accountSid, authToken);

app.post("/api/reply", async (req, res) => {
  try {
    const message = await client.messages.create({
      body: "Done",
      from: fromNumber,
      to: toNumber,
    });
    console.log("Message sent:", message.sid);
    res.send();
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
