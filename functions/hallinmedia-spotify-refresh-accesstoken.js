export default {
	async scheduled(event, env, put) {
		// -- Measure time to fetch data
		let startTime = performance.now()

		// Refresh the Spotify access token
		const refreshAccess = await fetch(
			`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + env.SPOTIFY_CLIENT_IDSECRET_AUTH64
				},
				cf: {
					cacheTtl: 1800,
					cacheEverything: true
				}
			}
		).then((response) => response.json())

		console.log(refreshAccess)

		// -- Print measured time to fetch data
		let endTime = performance.now()
		console.log(`Refresh token fetch took ${endTime - startTime} ms`)

		// -- Measure time to store data
		startTime = performance.now()

		// Store the access token in KV store
		await env.SPOTIFYACCESSTOKEN.put('spotifyAccessToken', refreshAccess.access_token)

		// -- Print measured time to store data
		endTime = performance.now()
		console.log(`Save data took ${endTime - startTime} ms`)

		switch (event.cron) {
			case '0 */1 * * *': // Every 1 hour
				await refreshAccess()
				break
		}
	},

	async fetch(request, env, ctx) {
		return new Response('hallin.media')
	}
}
