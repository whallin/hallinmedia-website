/*
  This script fetches the last played song from the Spotify API.
  The script is scheduled to run every hour to refresh the Spotify access token. The access token is saved in Cloudflare KV.

  The script uses the following environment variables:
  - SPOTIFY_CLIENT_IDSECRET_AUTH64: Base64 encoded string of Spotify client ID and client secret (client_id:secret)
  - SPOTIFY_REFRESH_TOKEN: Spotify refresh token
*/

export default {
	/**
	 * Scheduled function to refresh the Spotify access token and fetch the last played song.
	 *
	 * @param {Object} event - The event object.
	 * @param {Object} env - The environment object.
	 * @param {Object} ctx - The context object.
	 */
	async scheduled(event, env, ctx) {
		// Measure time to refresh Spotify access token
		let startTime = performance.now()

		// Refresh Spotify access token
		const refreshAccess = async () => {
			const response = await fetch(
				`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: 'Basic ' + env.SPOTIFY_CLIENT_IDSECRET_AUTH64
					},
					cf: { cacheTtl: 3600, cacheEverything: true }
				}
			)
			return response.json()
		}
		const refreshAccessToken = await refreshAccess()

		// Print measured time to refresh Spotify access token
		let endTime = performance.now()
		console.log(`Refresh Spotify access token fetch took ${endTime - startTime} ms`)

		// Measure time to save Spotify access token
		startTime = performance.now()

		// Save Spotify access token in KV
		await env.SPOTIFYACCESSTOKEN.put('spotifyAccessToken', refreshAccessToken.access_token)

		// Print measured time to save Spotify access token
		endTime = performance.now()
		console.log(`Save Spotify access token to KV took ${endTime - startTime} ms`)

		// Measure time to fetch last played song
		startTime = performance.now()

		// Get Spotify access token from KV
		const spotifyAccessToken = await env.SPOTIFYACCESSTOKEN.get('spotifyAccessToken', {
			cacheTtl: 3600
		})

		// Get data about the last played song
		const lastPlayed = async () => {
			const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${spotifyAccessToken}`
				},
				cf: { cacheTtl: 600, cacheEverything: true }
			})
			return response.json()
		}
		const lastPlayedJSON = await lastPlayed()

		// Print measured time to fetch last played song
		endTime = performance.now()
		console.log(`Last played song fetch took ${endTime - startTime} ms`)

		// Measure time to save last played song JSON
		startTime = performance.now()

		// Save last played song JSON in KV
		await env.LASTPLAYEDJSON.put('lastPlayedJSON', JSON.stringify(lastPlayedJSON))

		// Print measured time to save last played song JSON
		endTime = performance.now()
		console.log(`Save last played song to KV took ${endTime - startTime} ms`)

		// Perform the scheduled action based on the cron expression
		switch (event.cron) {
			case '0 */1 * * *': // Every hour
				await refreshAccess()
				break
			case '*/10 * * * *': // Every 10 minutes
				await lastPlayed()
				break
		}
		console.log(`Cron processed ${event.scheduledTime}`)
	},

	/**
	 * Fetch function to return data about the last played song.
	 *
	 * @param {Request} request - The request object.
	 * @param {Env} env - The environment object.
	 * @param {Context} ctx - The context object.
	 * @return {Response} The response object containing the last played JSON.
	 */
	async fetch(request, env, ctx) {
		// Get the last played JSON from the environment KV
		const lastPlayed = await env.LASTPLAYEDJSON.get('lastPlayedJSON', { cacheTtl: 600 })

		// Return the last played JSON as a response with appropriate headers
		return new Response(lastPlayed, {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=600',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type'
			}
		})
	}
}
