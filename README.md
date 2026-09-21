# ticket-system

A Discord bot for handling support tickets. Supports categories, claim system, and HTML transcripts.

I originally wrote this in Arabic for a community server, then cleaned it up and made it reusable.

## Features

- Ticket creation via button or command
- Multiple categories (support, reports, applications)
- Staff can claim, close, and reopen tickets
- Auto-generates HTML transcripts on close
- Configurable permissions per category
- Cooldown to prevent spam

## Setup

```bash
git clone https://github.com/1Dhyaa/ticket-system.git
cd ticket-system
npm install
```

Rename `.env.example` to `.env` and fill in:

```
BOT_TOKEN=your_bot_token
GUILD_ID=your_server_id
TRANSCRIPT_CHANNEL=channel_id_for_transcripts
STAFF_ROLE=role_id_for_staff
```

Then run:

```bash
node index.js
```

## Commands

| Command | Description |
|---------|-------------|
| `/ticket-setup` | Send the ticket creation panel to a channel |
| `/close` | Close the current ticket |
| `/claim` | Claim a ticket as your own |
| `/add <user>` | Add someone to the ticket |
| `/remove <user>` | Remove someone from the ticket |

## Structure

```
ticket-system/
├── index.js
├── commands/
│   ├── setup.js
│   ├── close.js
│   ├── claim.js
│   └── manage.js
├── events/
│   ├── interactionCreate.js
│   └── ready.js
├── utils/
│   ├── transcript.js
│   └── config.js
├── .env.example
└── package.json
```

## License

MIT
