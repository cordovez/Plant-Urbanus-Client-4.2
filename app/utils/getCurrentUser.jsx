export default async function getCurrentUser(request, token) {
  const BASE = process.env.BASE_URL;

  const response = fetch(`${BASE}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = (await response).json();
  return user;
}
