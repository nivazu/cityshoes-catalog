# Security Note - Supabase Anon Key

## Why is the Supabase Anon Key in the Code?

The Supabase anon (anonymous) key that appears in `/src/lib/supabase.js` is **intentionally public** and **safe to expose** in client-side code.

### Key Points:

1. **It's a Public Key**: The anon key is specifically designed to be used in browsers, mobile apps, and other client-side applications.

2. **Row Level Security (RLS)**: Your data is protected by RLS policies in Supabase, not by hiding the anon key.

3. **Limited Permissions**: The anon key only has the permissions you explicitly grant through RLS policies.

4. **Industry Standard**: This is the standard way to use Supabase (and similar services like Firebase) in client-side applications.

### What About the JWT Warning?

GitHub and other security scanners will flag any JWT token, but in this case:
- It's a false positive for the anon key
- The anon key is meant to be public
- Only the `service_role` key should be kept secret (never use it in client code)

### Best Practices:

1. **Use RLS**: Always implement proper Row Level Security policies (✅ Already done)
2. **Environment Variables**: For better organization, you can still use `.env` files
3. **Service Role Key**: Never expose the service role key in client-side code
4. **API Routes**: For sensitive operations, use server-side API routes

### Current Setup:

```javascript
// This is SAFE and CORRECT:
const supabaseAnonKey = 'eyJhbG...' // Public anon key
```

### References:
- [Supabase Docs - Client-side Auth](https://supabase.com/docs/guides/auth)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/security)