export async function apiFetch(
  endpoint: string,
  options: RequestInit & { body?: any } = {},
): Promise<Response> {
  endpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const fetchWithRetry = async (): Promise<Response> => {
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
          ...(options.headers || {}),
        },
        credentials: 'include', // * Important so that the refresh_token cookie is sent
      });
      
      return res;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return fetchWithRetry();
}