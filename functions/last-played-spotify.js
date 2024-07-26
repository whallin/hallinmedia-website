export default {
	async scheduled(event, env, ctx) {
		console.log('cron processed at ' + date.now())
	}
}

export async function onRequest({ env }) {
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
				cacheTtl: 3000,
				cacheEverything: true
			}
		}
	).then((response) => response.json())

	// -- Print measured time to fetch data
	let endTime = performance.now()
	console.log(`Refresh token fetch took ${endTime - startTime} ms`)

	// -- Measure time to fetch data
	startTime = performance.now()

	// Get data about the last played song
	const lastPlayed = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + refreshAccess.access_token
		},
		cf: {
			cacheTtl: 180,
			cacheEverything: true
		}
	}).then((response) => response.json())

	// -- Measure the end time for the second fetch and calculate the duration
	endTime = performance.now()
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
