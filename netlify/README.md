# CheckForCheats

Веб-сервис для проверки системы на сторонний софт. Статический фронтенд на чистом HTML/CSS/JS + serverless-функции Netlify.

## Стек

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Netlify Functions (Node.js)
- **Хостинг:** Netlify
- **PWA:** manifest.json

## Структура

```
.
├── index.html
├── pages/
│   ├── commands.html
│   ├── faq.html
│   ├── docs.html
│   ├── changelog.html
│   └── status.html
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── pages.css
├── js/
│   ├── main.js
│   ├── vault.js
│   ├── copy.js
│   ├── faq.js
│   └── api.js
├── assets/
│   ├── icons/
│   │   └── favicon.ico
│   └── manifest.json
├── netlify/
│   └── functions/
│       ├── log.js
│       ├── status.js
│       └── version.js
├── netlify.toml
├── _redirects
└── README.md
```

## Деплой

1. Залить репу на GitHub.
2. Netlify → **Add new site** → **Import from Git** → выбрать репу.
3. Build settings:
   - Branch: `main`
   - Build command: *(пусто)*
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
4. Environment variables (опционально для логирования):
   - `DISCORD_WEBHOOK` = URL вебхука Discord.
5. Trigger deploy.

## Функции API

| Endpoint | Метод | Описание |
|---|---|---|
| `/.netlify/functions/log` | POST | Логирование событий копирования |
| `/.netlify/functions/status` | GET | Статус сервиса |
| `/.netlify/functions/version` | GET | Текущая версия движка |

## Лицензия

MIT