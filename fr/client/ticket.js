let { Channel } = require("/Users/dimitri/Desktop/Locarodix/Code/Bot/fr/config.json")
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
                .setAuthor({ name: `Système de tickets`, iconURL: channel.guild.iconURL({ dynamic: true }) })
                .setDescription("Utilisez le bouton ci-dessous pour obtenir de l'aide !")
                .setThumbnail(channel.guild.iconURL({ dynamic: true }))
                .setFooter({ text: "Utilisez le bouton pour une action de support", iconURL: channel.guild.iconURL({ dynamic: true }) });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(2)
                        .setCustomId("support")
                        .setEmoji("🎫")
                );

            await channel.send({ embeds: [embed], components: [row] });
            console.log("Ticket envoyé sur le canal de messages");
        } catch (error) {
            console.error('Erreur lors de la suppression ou de l\'envoi du message:', error);
        }
    }
};



    
