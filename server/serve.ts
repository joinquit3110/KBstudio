#!/usr/bin/env -S ts-node --script-mode
import 'dotenv/config';

import { MathigonStudioApp } from '@mathigon/studio/server/app';
import MongoStore            from 'connect-mongo';
import { COURSES }           from './utilities/utilities';
import type { Request, Response, NextFunction } from 'express';

// ────────────────────── ENV ────────────────────────────────────────────────
const PORT           = +(process.env.PORT ?? 5000);
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'khaBoom-local-dev';
const MONGODB_URI    = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');

// ───────────── SESSION STORE (connect‑mongo) ───────────────────────────────
const mongoStore = MongoStore.create({
  mongoUrl       : MONGODB_URI,
  dbName         : 'khaBoom',
  collectionName : 'studio_sessions',
  ttl            : 14 * 24 * 60 * 60,   // 14 days
  touchAfter     : 24 * 3600            // update at most once a day
});
mongoStore.on('connected', () => console.log('✅  MongoStore connected'));
mongoStore.on('error', err  => console.error('❌  MongoStore error:', err));

// ────────────────────── APP SETUP ──────────────────────────────────────────
const studio = new MathigonStudioApp()
  .secure()
  .setup({ sessionSecret: SESSION_SECRET, sessionStore: mongoStore })
  .accounts()                                   // bind account routes first

  // custom middleware (must return Promise<void>)
  .use(async (req, res, next) => {
    // ensure res.locals.messages always has these three arrays
    res.locals.messages        = res.locals.messages || {};
    res.locals.messages.page   = res.locals.messages.page   || [];
    res.locals.messages.success = res.locals.messages.success || [];
    res.locals.messages.errors  = res.locals.messages.errors  || [];
    res.locals.messages.info    = res.locals.messages.info    || [];
    next();
  })

  // ---------- custom pages ----------
  .get('/', (req: Request, res: Response) =>
    res.render('home.pug', {
      courses: COURSES,
      page   : { title: 'Home', sections: [] }   // provide sections to avoid TypeError
    }))

  .get('/courses', (req: Request, res: Response) =>
    res.render('courses.pug', {
      courses: COURSES,
      page   : { title: 'All Courses', sections: [] }
    }))

  // courses + error routes
  .course({})
  .errors()
  .listen(PORT);

console.log(`🚀  Server started on port ${PORT} (${process.env.NODE_ENV || 'dev'})`);
