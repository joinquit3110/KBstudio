#!/usr/bin/env -S ts-node --script-mode

import { MathigonStudioApp } from "@mathigon/studio/server/app";
import MongoStore from "connect-mongo";           
import { COURSES } from "./utilities/utilities";

const PORT           = +(process.env.PORT || 5000);
const SESSION_SECRET = process.env.SESSION_SECRET || "khaBoom-local-dev";
const MONGODB_URI    = process.env.MONGODB_URI    || "mongodb+srv://…";

const mongoStore = MongoStore.create({
  mongoUrl   : MONGODB_URI,
  ttl        : 14 * 24 * 60 * 60,
  autoRemove : "native",
  touchAfter : 24 * 3600
});

new MathigonStudioApp()
  .secure()
  .setup({
    sessionSecret: SESSION_SECRET,
    sessionStore : mongoStore            
  })
  .accounts()
  .get("/",       (req, res) => res.render("home.pug",    { courses: COURSES }))
  .get("/courses",(req, res) => res.render("courses.pug", { courses: COURSES }))
  .course({})
  .errors()
  .listen(PORT);
