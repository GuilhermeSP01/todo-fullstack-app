export async function fetchToken(username: string, password: string) {
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch token');
  }

  return response.json() as Promise<{ token: string }>;
}
