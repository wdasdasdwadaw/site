// /api/status — состояние сервиса
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      ts: new Date().toISOString()
    })
  };
};