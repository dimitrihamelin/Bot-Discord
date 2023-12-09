const { ActivityType, Client, Intents, Collection } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        // Update the activities array with the game you want to play
        let activities = [`locarodix.com`,], i = 0;

        setInterval(() => {
            // Set the bot's activity to play "Joue à Locarodix.com"
            client.user.setActivity({
                name: `${activities[i++ % activities.length]}`,
                type: ActivityType.Playing,
            });
        }, 22000);
    },
};