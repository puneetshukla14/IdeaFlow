// lib/getCurrentUser.ts

export async function getCurrentUser() {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch (err) {
    return null;
  }
}
