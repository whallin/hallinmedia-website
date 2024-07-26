export async function onRequest({ env }) {
	// -- Measure time to fetch data
	let startTime = performance.now()

	const spotifyAccessToken = env.SPOTIFYACCESSTOKEN.get('spotifyAccessToken', { cacheTtl: 3600 })
	console.log(`Spotify access token KV: ${spotifyAccessToken}`)

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

	// -- Measure the end time for the second fetch and calculate the duration
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
