# KhaBoom Learning Platform

Welcome to KhaBoom Learning – an interactive educational platform featuring a comprehensive collection of mathematics courses!

This platform is built on Mathigon Studio, an award-winning framework for creating interactive, online educational content.

## Deployment

This repository is configured for easy deployment to free hosting services. See the [DEPLOYMENT.md](DEPLOYMENT.md) file for complete instructions on deploying this platform.

### Quick Deployment Guide

1. Push this repository to GitHub
2. Sign up for [Render.com](https://render.com/) (free tier)
3. Create a new Web Service and connect to your GitHub repository
4. Use the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - NODE_ENV: production
     - PORT: 10000
     - SESSION_SECRET: (generate a random secure string)
     - MONGODB_URI: mongodb+srv://joinquit:31102004@kbcluster.wok68pc.mongodb.net/khaBoom?retryWrites=true&w=majority&appName=KBCluster

## Features

- Interactive mathematics courses across various topics
- Dynamic content with step-by-step progression
- User accounts with progress tracking
- Mobile-friendly responsive design
- Beautiful visualizations and interactive elements

## Course Categories

The platform includes courses in:

- **Geometry**: Circles, Polygons, Triangles, Euclidean Geometry, Non-Euclidean Geometry
- **Probability & Statistics**: Basic Probability, Statistics, Combinatorics, Data Analysis
- **Algebra & Functions**: Functions, Linear Functions, Quadratics, Matrices, Vectors
- **Discrete Mathematics**: Graph Theory, Game Theory, Logic, Divisibility, Coding Theory

## Development

If you want to run the platform locally for development:

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build assets
4. Run `npm run dev` to start a development server

For more details on creating and customizing courses, see the documentation files in the [docs/](docs/) directory.

---

Based on Mathigon Studio © Mathigon 2016–2022  
KhaBoom Learning Platform © 2025
