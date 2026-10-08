// логирование копирования. Отправляет в Discord и Telegram одновременно
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;
const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT = process.env.TG_CHAT;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const ip =
      event.headers['x-nf-client-connection-ip'] ||
      event.headers['client-ip'] ||
      'unknown';

    const lines = [
      '**Copy event**',
      'Action: `' + (data.action || 'unknown') + '`',
      'IP: `' + ip + '`',
      'Time: ' + new Date().toISOString(),
      'UA: ' + (data.ua || 'unknown'),
      'Referer: ' + (data.ref || 'unknown'),
      'Page: ' + (data.page || 'unknown')
    ];
    const text = lines.join('\n');

    const tasks = [];

    // Discord
    if (DISCORD_WEBHOOK) {
      tasks.push(
        fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({content: text})
        }).catch(function(){})
      );
    }

    // Telegram
    if (TG_TOKEN && TG_CHAT) {
      const tgText = [
        '*Copy event*',
        'Action: `' + (data.action || 'unknown') + '`',
        'IP: `' + ip + '`',
        'Time: ' + new Date().toISOString(),
        'UA: ' + (data.ua || 'unknown'),
        'Referer: ' + (data.ref || 'unknown'),
        'Page: ' + (data.page || 'unknown')
      ].join('\n');

      tasks.push(
        fetch('https://api.telegram.org/bot' + TG_TOKEN + '/sendMessage', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            chat_id: TG_CHAT,
            text: tgText,
            parse_mode: 'Markdown'
          })
        }).catch(function(){})
      );
    }

    await Promise.all(tasks);

    return { statusCode: 200, body: 'ok' };
  } catch (e) {
    return { statusCode: 500, body: 'err' };
  }
};