export async function apiFetch(
  endpoint: string,
  options: RequestInit & { body?: any } = {},
  retry: boolean = true
): Promise<Response> {
  endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const fetchWithRetry = async (retry: boolean = true): Promise<Response> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/${endpoint}`, {
        ...options,
        body:
          options?.body && options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization:
            typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('access_token')}` : '',
          ...(options.headers || {}),
        },
        credentials: 'include', // * Important so that the refresh_token cookie is sent
      });

      if (res.status === 401 && retry) {
        // * Token expired, try to refresh the token
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          return await fetchWithRetry(false); // * Try requesting without retry a second time
        }
      }
      
      return res;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return fetchWithRetry(retry);
}

async function refreshAccessToken(): Promise<boolean> {
  const isBrowser = typeof window !== 'undefined';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include', // * Important so that the refresh_token cookie is sent
    });

    if (res.status === 401 || res.status === 403) {
      // * refreshTokenExpired —TriggerLogout
      if (isBrowser) {
        localStorage.removeItem('access_token');
        window.location.href = '/auth/login'; // * Redirect to the login page
      }
      return false;
    }

    const data: { access_token: string } = await res.json();

    if (isBrowser) localStorage.setItem('access_token', data.access_token);
    return true;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
}