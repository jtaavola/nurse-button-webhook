# nurse-button-webhook

[![Node.js](https://img.shields.io/badge/Node.js-000000?logo=nodedotjs&style=for-the-badge)](https://nodejs.org/en)
[![Twilio](https://img.shields.io/badge/Twilio-000000?logo=twilio&style=for-the-badge)](https://www.twilio.com)
[![Vercel](https://img.shields.io/badge/vercel-000000?logo=vercel&style=for-the-badge)](https://vercel.com)

This is a [Twilio webhook](https://www.twilio.com/docs/usage/webhooks), hosted on vercel as a [serverless function](https://vercel.com/docs/concepts/functions/serverless-functions). It works together with the [nurse-button-diy](https://github.com/jtaavola/nurse-button-diy) project. Any replies to the "nurse button has been pressed" Twilio message will trigger this webhook. It will message all designated recipients, letting everyone know that someone has acted upon the nurse button event.

The Twilio webhook is configured on the Twilio Console https://console.twilio.com

```mermaid
sequenceDiagram
    participant Patient
    participant nurse-button-diy
    participant Twilio Number
    participant Caregiver 1
    participant Caregiver 2
    Patient->>nurse-button-diy: Presses button
    nurse-button-diy->>Twilio Number: Send messages
    Note over Twilio Number,Caregiver 2: Message sent to all caregivers
    Twilio Number->>Caregiver 1: SMS "The nurse button has been pressed"
    Twilio Number->>Caregiver 2: SMS "The nurse button has been pressed"
    Note over Twilio Number,Caregiver 2: A caregiver replies that they are attending to it
    Caregiver 2-->>Twilio Number: SMS "On it" (or anything)
    Note over Twilio Number,Caregiver 2: Update message sent to all caregivers (this webhook!)
    Twilio Number->>Caregiver 1: SMS "A caregiver is attending to it"
    Twilio Number->>Caregiver 2: SMS "A caregiver is attending to it"
```

## Development

### `npm install -g vercel`

Installs the vercel CLI.

### `npm install`

Installs the necessary packages.

### Configure environment variables

Create a `.env` file at the root of the project to set the environment variables
```sh
# sid and auth token from https://console.twilio.com/
TWILIO_ACCOUNT_SID=<account_sid>
TWILIO_AUTH_TOKEN=<auth_token>
# phone numbers must be in E.164 format
TWILIO_FROM_NUMBER=+1234567890
# comma separate list of phone numbers to send the SMS to
TWILIO_TO_NUMBERS=+12345678901,+13456789012
```

> **Note**: You can also set development environment variables using the [vercel dashboard](https://vercel.com/docs/concepts/projects/environment-variables).

### `vercel dev`

The `vercel` cli is used to run the serverless functions locally. You will need to login to vercel and setup/link a vercel project. The `vercel dev` command will walk you through these steps.
