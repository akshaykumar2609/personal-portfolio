import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  // Adjust sample rate for production (0.1 = 10% of transactions).
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 1.0,
});
