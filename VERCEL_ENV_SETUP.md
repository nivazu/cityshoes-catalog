# Setting Up Environment Variables in Vercel

To satisfy GitGuardian and keep the tokens out of the code, follow these steps:

## 1. Add Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

### Required Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `REACT_APP_SUPABASE_URL` | `https://xdfsuynadmnvkyhsxbhi.supabase.co` | Production, Preview, Development |
| `REACT_APP_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZnN1eW5hZG1udmt5aHN4YmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk4MzUsImV4cCI6MjA3MDQwNTgzNX0.-SP9CXpjuljrrrq5W8Vd9tF6n2nfeUq9zV-WlmTTKO0` | Production, Preview, Development |

## 2. Create Vercel Secret (Optional)

For better organization, you can create secrets:

```bash
vercel secrets add supabase-url https://xdfsuynadmnvkyhsxbhi.supabase.co
vercel secrets add supabase-anon-key eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZnN1eW5hZG1udmt5aHN4YmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk4MzUsImV4cCI6MjA3MDQwNTgzNX0.-SP9CXpjuljrrrq5W8Vd9tF6n2nfeUq9zV-WlmTTKO0
```

## 3. Redeploy

After adding the environment variables:
1. Go to **Deployments**
2. Find the latest deployment
3. Click the **...** menu → **Redeploy**

## Important Notes

- These are PUBLIC keys meant for client-side use
- The anon key is safe to be in environment variables
- RLS policies protect your data, not hiding the anon key
- This setup satisfies GitGuardian's security scan requirements

## Local Development

For local development, create a `.env.local` file:

```env
REACT_APP_SUPABASE_URL=https://xdfsuynadmnvkyhsxbhi.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZnN1eW5hZG1udmt5aHN4YmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk4MzUsImV4cCI6MjA3MDQwNTgzNX0.-SP9CXpjuljrrrq5W8Vd9tF6n2nfeUq9zV-WlmTTKO0
```