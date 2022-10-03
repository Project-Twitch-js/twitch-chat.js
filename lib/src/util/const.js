module.exports = {
	oauth: "https://id.twitch.tv/oauth2/token",
	base: "https://api.twitch.tv/helix/",
	endpoints: {
		users: {
			login: "users?login=",
			send_whispers: 'whispers?'
		},
		channels: {
			channel: "channels?broadcaster_id=",
			query: "search/channels?query="
		}
	}
}