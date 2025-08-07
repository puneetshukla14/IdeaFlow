// lib/getCurrentUser.ts

export async function getCurrentUser() {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    const user = await res.json(); // direct object
    return user;
  } catch (err) {
    return null;
  }
}
