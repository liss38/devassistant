# DevAssistant 🚀 AI Coding Agent for React/Next.js

[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/YOUR_USERNAME/devassistant&project-name=devassistant)
[![GitHub Stars](https://img.shields.io/github/stars/YOUR_USERNAME/devassistant?style=social)](https://github.com/YOUR_USERNAME/devassistant)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-5.0-blue?logo=vercel)](https://sdk.vercel.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript&logoColor=white)](https://typescriptlang.org/)

<div align="center">
  <img src="https://via.placeholder.com/800x400/0f172a/ffffff?text=DevAssistant+Demo" width="800"/>
  <br><br>
  <strong>Автономный AI-агент генерирует production-ready React/Next.js код за минуты</strong>
</div>


## ✨ Что умеет DevAssistant

| Задача | Пример запроса | Результат |
|--------|----------------|-----------|
| **UI Компоненты** | `Создай DataTable shadcn + TanStack` | Полный компонент + стили |
| **API Routes** | `Next.js API с Supabase auth` | `/api/users/route.ts` + middleware |
| **Оптимизация** | `Почини hydration mismatch` | Refactored код + объяснения |
| **Архитектура** | `SaaS billing Stripe + Supabase` | Структура проекта + deploy |
| **AI Интеграции** | `Vercel AI SDK чат с tools` | Streaming UI + hooks |


## 🚀 Быстрый старт (5 минут)


```bash
# 1. Клонировать
git clone https://github.com/YOUR_USERNAME/devassistant.git
cd devassistant

# 2. Установить зависимости
npm install

# 3. Настроить .env.local
cp .env.local.example .env.local

# Добавить: YANDEXCLOUD_API_KEY, TAVILY_API_KEY, Supabase URL+KEY

# 4. Настроить Supabase
npm run db:setup

# 5. Локальный запуск
npm run dev
# http://localhost:3000/chat

# 6. Деплой на Vercel
npm run deploy
```