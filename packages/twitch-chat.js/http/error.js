module.exports = class TwitchError extends Error {
	constructor(message, req) {
		super(message ?? `TwitchAPIError[${req.raw.status}]: ${req.raw.error}: ${req.raw.message}`)
		if(req) {
			this.requestBody = req
			Error.captureStackTrace?.(this, TwitchError);
		}
	}
}