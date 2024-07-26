export async function onRequest({ env }) {
  // Refresh the Spotify access token
  const refreshAccess = await fetch(
    `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + env.SPOTIFY_CLIENT_AUTH64,
      },
    },
  );
  const refreshAccessJSON = await refreshAccess.json();

  // Get data about the last played song
  const lastPlayed = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + refreshAccessJSON.access_token,
      },
    },
  );
  const lastPlayedJSON = await lastPlayed.json();

  // Return data about the last played song
  return new Response(JSON.stringify(lastPlayedJSON), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
