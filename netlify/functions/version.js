// /api/version — текущая версия движка
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      version: '3.2.1',
      build: '2026.10',
      ts: new Date().toISOString()
    })
  };
};