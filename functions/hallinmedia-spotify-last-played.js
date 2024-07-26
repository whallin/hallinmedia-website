/*
  This script fetches the last played song from the Spotify API.
  The script is scheduled to run every hour to refresh the Spotify access token. The access token is saved in Cloudflare KV.

  The script uses the following environment variables:
  - SPOTIFY_CLIENT_IDSECRET_AUTH64: Base64 encoded string of Spotify client ID and client secret (client_id:secret)
  - SPOTIFY_REFRESH_TOKEN: Spotify refresh token
*/

export default {
	async scheduled(request, env, ctx) {
		// -- Measure time to refresh spotifyAccessToken
		let startTime = performance.now()

		// Refresh spotifyAccessToken
		const refreshAccess = await fetch(
			`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + env.SPOTIFY_CLIENT_IDSECRET_AUTH64
				},
				cf: {
					cacheTtl: 3600,
					cacheEverything: true
				}
			}
		).then((response) => response.json())

		console.log(refreshAccess)

		// -- Print measured time to refresh spotifyAccessToken
		let endTime = performance.now()
		console.log(`Refresh token fetch took ${endTime - startTime} ms`)

		// -- Measure time to save spotifyAccessToken
		startTime = performance.now()

		// Save spotifyAccessToken in KV
		await env.SPOTIFYACCESSTOKEN.put('spotifyAccessToken', refreshAccess.access_token)

		// -- Print measured time to save spotifyAccessToken
		endTime = performance.now()
		console.log(`Save token to KV took ${endTime - startTime} ms`)
	},

	async fetch(request, env, ctx) {
		// -- Measure time to fetch lastPlayed
		let startTime = performance.now()

		const spotifyAccessToken = await env.SPOTIFYACCESSTOKEN.get('spotifyAccessToken', {
			cacheTtl: 3600
		})

		// Get data about the last played song
		const lastPlayed = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${spotifyAccessToken}`
			},
			cf: {
				cacheTtl: 180,
				cacheEverything: true
			}
		}).then((response) => response.json())

		// -- Print measured time to fetch lastPlayed
		let endTime = performance.now()
		console.log(`Last played song fetch took ${endTime - startTime} ms`)

		// Return data about the last played song
		return new Response(JSON.stringify(lastPlayed), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=180'
			}
		})
	}
}
