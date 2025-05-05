#!/usr/bin/env -S ts-node --script-mode

import {MathigonStudioApp} from './app';
import {COURSES} from './utilities/utilities';

// Use environment variables for production deployment
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'khaBoom-local-dev';

// MongoDB configuration from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://joinquit:31102004@kbcluster.wok68pc.mongodb.net/khaBoom?retryWrites=true&w=majority&appName=KBCluster';

new MathigonStudioApp()
    .secure()
    .setup({
      sessionSecret: SESSION_SECRET,
      mongodb: MONGODB_URI
    })
    .accounts()  // Enable user accounts
    .get('/', (req, res) => res.render('home.pug', {courses: COURSES}))
    .get('/courses', (req, res) => res.render('courses.pug', {courses: COURSES}))
    .course({})
    .errors()
    .listen(PORT);

console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
