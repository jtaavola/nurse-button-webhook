const express = require("express");
const bodyParser = require('body-parser');
const twilio = require("twilio");
const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const toNumbers = process.env.TWILIO_TO_NUMBERS.split(",");
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/reply", async (req, res) => {
  // filter out unrecognized "From" phone numbers
  if (!toNumbers.includes(req.body.From)) {
    res.status(403).send();
  }
  try {
    // send sms to each phone number
    for (const number of toNumbers) {
      const message = await client.messages.create({
        body: "A caregiver is attending to it",
        from: fromNumber,
        to: number,
      });
      console.log("Message sent:", message.sid);
    }
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = app;
