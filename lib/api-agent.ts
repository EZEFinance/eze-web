let baseURL = process.env.NEXT_PUBLIC_API_AGENT_URL || '';
if (baseURL && !baseURL.endsWith('/')) {
  baseURL += '/';
}

const request = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const apiAgent = {
  get: (endpoint: string) => request(endpoint, { method: 'GET' }),

  post: (endpoint: string, body?: Record<string, unknown>) =>
    request(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
};

export default apiAgent;
