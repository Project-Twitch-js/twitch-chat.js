module.exports = {
	oauth: "https://id.twitch.tv/oauth2/token",
	base: "https://api.twitch.tv/helix/",
	endpoints: {
		users: {
			login: "users?",
			send_whispers: 'whispers?',
			block: 'users/blocks?'
		},
		channels: {
			channel: "channels?broadcaster_id=",
			query: "search/channels?query=",
			streams: 'streams?',
			commercial: "channels/commercial",
			clips: "clips?broadcaster_id=",
			points: {
				rewards: {
					custom: "channel_points/custom_rewards?broadcaster_id="
				}
			}
		},
		moderation: {
			bans: 'moderation/bans?',
			moderators: 'moderation/moderators?',
			chat: 'moderation/chat?'
		},
		eventsub: {
			subscriptions: 'eventsub/subscriptions'
		}
	}
}