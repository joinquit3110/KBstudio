#!/usr/bin/env -S ts-node --script-mode
import 'dotenv/config';
import { MathigonStudioApp } from "@mathigon/studio/server/app";
import MongoStore            from "connect-mongo";
import { COURSES }           from "./utilities/utilities";

const PORT           = +(process.env.PORT ?? 5000);
const SESSION_SECRET = process.env.SESSION_SECRET ?? "khaBoom-local-dev";
const MONGODB_URI    = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("⚠️  Missing MONGODB_URI env var.");

let mongoStore;
try {
  mongoStore = MongoStore.create({
    mongoUrl       : process.env.MONGODB_URI,
    dbName         : "khaBoom",  
    collectionName : "studio_sessions",
    ttl            : 14 * 24 * 60 * 60
  });
  mongoStore.on("connected", () =>
    console.log("✅  MongoStore connected"));
  mongoStore.on("error", err =>
    console.error("❌  MongoStore error (async):", err));
} catch (err) {
  console.error("❌  MongoStore create failed (sync):", err);
  console.log("Trying in‑memory Mongo DB…");
}

new MathigonStudioApp()
  .secure()
  .setup({ 
    sessionSecret: SESSION_SECRET, 
    sessionStore: mongoStore,
  })
  .use(async (req, res, next) => {
    res.locals.messages = res.locals.messages || {};
    res.locals.messages.page = res.locals.messages.page || [];
    next();
  })
  .get('/', (req, res) => res.render('home.pug', {
    courses: COURSES,
    page: { title: 'Home', sections: [] }
  }))
  .get('/courses', (req, res) => res.render('courses.pug', {
    courses: COURSES,
    page: { title: 'All Courses', sections: [] }
  }))
  .accounts()
  .course({})
  .errors()
  .listen(PORT);

console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
