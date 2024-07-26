export async function onRequest({env}) {
  // Refresh the Spotify access token
  const refreshAccess = await fetch(`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}`,{
    method: 'POST',
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':`Basic ${env.SPOTIFY_ACCESS_TOKEN}`,
    },
  })

  // Get data about the last played song
  const lastPlayed = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1",{
    method: 'GET',
    headers: {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${refreshAccess.json().access_token}`,
    }
  })

  // Return data about the last played song
  return new Response(JSON.stringify(lastPlayed.json()), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
  });
}