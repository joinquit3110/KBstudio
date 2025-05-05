# Deploying KhaBoom Learning Platform

This guide provides step-by-step instructions to deploy the KhaBoom Learning Platform (based on Mathigon Studio) as a fully functional website for free.

## Prerequisites

- GitHub account
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier is sufficient)
- [Render.com](https://render.com/) account (free tier is sufficient)

## Step 1: MongoDB Setup

The MongoDB database has already been set up with the following connection string:
```
mongodb+srv://joinquit:31102004@kbcluster.wok68pc.mongodb.net/khaBoom?retryWrites=true&w=majority&appName=KBCluster
```

If you want to create a new database instead:

1. Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (select the free tier)
3. Set up a database user with a username and password
4. Configure network access (Allow access from anywhere for simplicity)
5. Get your connection string from the "Connect" button

## Step 2: Prepare Your Repository

1. Make sure you have all the necessary files:
   - `render.yaml`: Configuration for Render.com deployment
   - `package.json`: Updated with build and start scripts
   - `server/serve.ts`: Updated server entry point
   - `config.yaml`: Site configuration
   - Sample course in `content/sample/`

2. Create a `.env` file based on `.env.example`:
   ```
   PORT=10000
   NODE_ENV=production
   SESSION_SECRET=your-unique-secure-secret-string
   MONGODB_URI=mongodb+srv://joinquit:31102004@kbcluster.wok68pc.mongodb.net/khaBoom?retryWrites=true&w=majority&appName=KBCluster
   ```

## Step 3: Deploy to Render.com

1. Push your repository to GitHub if you haven't already
2. Sign up for [Render.com](https://render.com/)
3. Connect your GitHub repository
4. Create a new Web Service with these settings:
   - **Name**: KhaBoom
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add the following environment variables:
   - `NODE_ENV`: production
   - `PORT`: 10000
   - `SESSION_SECRET`: (generate a random secure string)
   - `MONGODB_URI`: mongodb+srv://joinquit:31102004@kbcluster.wok68pc.mongodb.net/khaBoom?retryWrites=true&w=majority&appName=KBCluster

6. Click "Create Web Service"

## Step 4: Verify Deployment

1. Render will provide a URL like `https://khaboom.onrender.com`
2. Visit this URL to confirm your site is working
3. Test the following:
   - Homepage loads correctly
   - Sample course is accessible
   - User registration works
   - Course progress is saved

## Free Tier Limitations

Be aware of these limitations when using free services:

1. **Render.com Free Tier:**
   - Services spin down after 15 minutes of inactivity
   - 512 MB RAM limit
   - 750 hours of runtime per month
   - No custom domains (without upgrading)

2. **MongoDB Atlas Free Tier:**
   - 512 MB storage limit
   - Shared computing resources
   - No auto-scaling

These limitations are suitable for demonstration purposes or sites with low traffic.

## Troubleshooting

If your deployment fails:

1. Check the Render.com logs for error messages
2. Verify MongoDB connection string and credentials
3. Ensure all npm dependencies are correctly listed in package.json
4. Check that build and start scripts are correctly configured

## Adding a Custom Domain (Optional)

If you want to use a custom domain (requires upgrading from free tier on Render):

1. Purchase a domain from a provider like Namecheap or GoDaddy
2. In Render.com, go to your web service settings
3. Click "Custom Domain" and follow the instructions
4. Add the required DNS records at your domain provider

## Future Enhancements

Once your basic site is running, consider these improvements:

1. Add more courses in the `content/` directory
2. Enable additional languages in `config.yaml`
3. Set up email services for account verification
4. Add analytics to track user engagement

## Regular Maintenance

For ongoing maintenance:

1. Regularly update npm packages to patch security vulnerabilities
2. Monitor MongoDB storage usage to stay within free tier limits
3. Consider using a service like UptimeRobot to ping your site regularly to prevent it from spinning down in the free tier