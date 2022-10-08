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
			query: "search/channels?query=",
			commercial: "channels/commercial",
			clips: "clips?broadcaster_id=",
			points: {
				rewards: {
					custom: "channel_points/custom_rewards?broadcaster_id="
				}
			}
		}
	}
}