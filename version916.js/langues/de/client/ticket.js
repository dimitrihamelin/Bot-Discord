let { Channel } = require("../config.json");
let { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const channelID = Channel;
        const channel = client.channels.cache.get(channelID);

        // Check if the channel exists
        if (!channel) {
            console.error("Kanal nicht gefunden. Überprüfen Sie die Kanal-ID.");
            return;
        }

        try {
            // Fetch messages in the channel
            const messages = await channel.messages.fetch();

            // Delete all fetched messages
            await channel.bulkDelete(messages);

            // Send the new message
            const embed = new EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: `Ticket-system`, iconURL: channel.guild.iconURL({ dynamic: true }) })
                .setDescription("Verwenden Sie diese Schaltfläche für Hilfe.")
                .setThumbnail(channel.guild.iconURL({ dynamic: true }))
                .setFooter({ text: "Verwenden Sie diese Schaltfläche, wenn Sie ein Problem haben.", iconURL: channel.guild.iconURL({ dynamic: true }) });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId("support")
                        .setEmoji("🎫")
                );

            await channel.send({ embeds: [embed], components: [row] });
            console.log("Das Ticket wurde in den Raum geschickt.");
        } catch (error) {
            console.error('Erreur lors de la suppression ou de l\'envoi du message:', error);
        }
    }
};



    
