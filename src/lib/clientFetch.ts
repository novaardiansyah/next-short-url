export async function clientFetch(
  endpoint: string,
  options: RequestInit & { body?: any } = {},
  retry: boolean = true
): Promise<Response> {
  endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  const fetchWithRetry = async (retry: boolean = true): Promise<Response> => {
    try {
      const res = await fetch(`api/${endpoint}`, {
        ...options,
        body:
          options?.body && options.body instanceof FormData
            ? options.body
            : typeof options.body === 'string'
              ? options.body
              : JSON.stringify(options.body),        
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
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
  const logoutEvent = new Event("logout");

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'refresh' }),
      credentials: 'include', // * Important so that the refresh_token cookie is sent
    });
    
    if (res.status === 401 || res.status === 403) {
      // * refreshTokenExpired —TriggerLogout
      throw new Error('Refresh token expired');
    }

    const data: { access_token: string } = await res.json();

    localStorage.setItem('access_token', data.access_token);
    return true;
  } catch (error) {
    window.dispatchEvent(logoutEvent);
    return false;
  }
}