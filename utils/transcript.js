const fs = require('fs');
const path = require('path');

async function generateTranscript(channel) {
    const messages = [];
    let lastId;

    // fetch all messages
    while (true) {
        const batch = await channel.messages.fetch({
            limit: 100,
            ...(lastId ? { before: lastId } : {})
        });
        if (batch.size === 0) break;
        messages.push(...batch.values());
        lastId = batch.last().id;
    }

    messages.reverse();

    // build html
    let html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ticket Transcript - #${channel.name}</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #36393f; color: #dcddde; padding: 20px; }
        .message { display: flex; gap: 12px; padding: 8px 16px; }
        .message:hover { background: #32353b; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; }
        .author { font-weight: 600; color: #fff; }
        .timestamp { color: #72767d; font-size: 12px; margin-left: 8px; }
        .content { margin-top: 4px; line-height: 1.4; }
        h2 { color: #fff; border-bottom: 1px solid #4f545c; padding-bottom: 10px; }
    </style>
</head>
<body>
    <h2>Transcript: #${channel.name}</h2>
    <p style="color:#72767d">Generated on ${new Date().toLocaleString()}</p>`;

    for (const msg of messages) {
        const time = msg.createdAt.toLocaleString();
        html += `
    <div class="message">
        <img class="avatar" src="${msg.author.displayAvatarURL({ size: 64 })}" alt="">
        <div>
            <span class="author">${msg.author.tag}</span>
            <span class="timestamp">${time}</span>
            <div class="content">${escapeHtml(msg.content)}</div>
        </div>
    </div>`;
    }

    html += '</body></html>';

    const filePath = path.join(__dirname, '..', 'transcripts', `${channel.name}.html`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);

    return filePath;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

module.exports = { generateTranscript };
