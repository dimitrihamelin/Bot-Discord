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
            console.error("Canal introuvable. Vérifiez l'ID du canal.");
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
                .setAuthor({ name: `Ticket system`, iconURL: channel.guild.iconURL({ dynamic: true }) })
                .setDescription("Use this button for help !")
                .setThumbnail(channel.guild.iconURL({ dynamic: true }))
                .setFooter({ text: "Use this button if you have a problem.", iconURL: channel.guild.iconURL({ dynamic: true }) });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId("support")
                        .setEmoji("🎫")
                );

            await channel.send({ embeds: [embed], components: [row] });
            console.log("The ticket was send in the room");
        } catch (error) {
            console.error('Erreur lors de la suppression ou de l\'envoi du message:', error);
        }
    }
};



    
