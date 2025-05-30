# Supabase Authentication Usage Examples

## Using the useAuth Hook

The `useAuth` hook provides easy access to user session data, JWT tokens, and authentication state.

```tsx
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { 
    user,           // User object with profile data
    session,        // Full session object
    loading,        // Loading state
    isAuthenticated, // Boolean authentication status
    accessToken,    // JWT access token (use for API calls)
    refreshToken,   // Refresh token
    signOut,        // Function to sign out user
    refreshSession  // Function to refresh the session
  } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user?.email}!</h1>
      <p>User ID: {user?.id}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

## Making Authenticated API Calls

### Using the useAxios Hook (Recommended)

The `useAxios` hook automatically integrates with `useAuth` and includes the JWT token in all requests:

```tsx
import useAxios from '../hooks/useAxios';

const MyComponent = () => {
  const { execute, loading, error, data } = useAxios();

  const fetchUserData = async () => {
    const response = await execute('/api/user/profile');
    console.log(response); // Response data
  };

  const createPost = async () => {
    const response = await execute('/api/posts', {
      method: 'POST',
      data: { title: 'My Post', content: 'Post content' }
    });
    console.log(response);
  };

  return (
    <div>
      <button onClick={fetchUserData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch User Data'}
      </button>
      <button onClick={createPost} disabled={loading}>
        Create Post
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
```

### Manual Token Usage (Alternative)

If you need to use the token manually with other HTTP libraries:

```tsx
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const MyComponent = () => {
  const { accessToken } = useAuth();

  const makeCustomApiCall = async () => {
    if (accessToken) {
      const response = await axios.get('/api/data', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    }
  };

  // ...
};
```

## Protecting Routes

You can use the `isAuthenticated` state to protect components:

```tsx
const ProtectedComponent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    return <div>Access denied. Please log in.</div>;
  }

  return <div>Protected content here</div>;
};
```

## Accessing User Metadata

```tsx
const ProfileComponent = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user?.email}</p>
      <p>Created: {user?.created_at}</p>
      <p>Email Verified: {user?.email_confirmed_at ? 'Yes' : 'No'}</p>
      
      {/* User metadata (profile data) */}
      <h3>Profile Data:</h3>
      <pre>{JSON.stringify(user?.user_metadata, null, 2)}</pre>
      
      {/* App metadata (roles, permissions, etc.) */}
      <h3>App Data:</h3>
      <pre>{JSON.stringify(user?.app_metadata, null, 2)}</pre>
    </div>
  );
};
```

## Complete Example: Data Fetching Component

```tsx
import { useAuth } from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { useEffect } from 'react';

interface UserPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const UserPosts = () => {
  const { isAuthenticated } = useAuth();
  const { execute, loading, error, data } = useAxios<UserPost[]>();

  useEffect(() => {
    if (isAuthenticated) {
      execute('/api/user/posts');
    }
  }, [isAuthenticated, execute]);

  if (!isAuthenticated) {
    return <div>Please log in to view your posts</div>;
  }

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Your Posts</h2>
      {data?.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};
```

## Session Management

```tsx
const SessionManager = () => {
  const { session, refreshSession } = useAuth();

  const checkTokenExpiry = () => {
    if (session?.expires_at) {
      const expiryTime = new Date(session.expires_at * 1000);
      const now = new Date();
      const timeUntilExpiry = expiryTime.getTime() - now.getTime();
      
      if (timeUntilExpiry < 300000) { // 5 minutes
        console.log('Token expires soon, consider refreshing');
        refreshSession();
      }
    }
  };

  return (
    <div>
      <button onClick={checkTokenExpiry}>Check Token Expiry</button>
      <button onClick={refreshSession}>Refresh Session</button>
    </div>
  );
};
``` 