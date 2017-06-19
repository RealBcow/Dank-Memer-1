exports.run = function (client, msg, args, config) {

	if (!msg.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) {
		return msg.author.send('I don\'t have permission to send pictures in #' + msg.channel.name)
	}
	if (!config.donor10.includes(msg.author.id))
		return msg.reply('to access this command, you must donate at the $10 tier here: <https://www.patreon.com/melmsie>')

	msg.channel.send({
		files: ['http://www.stickpng.com/assets/thumbs/5845e69dfb0b0755fa99d7ef.png']
	})
}