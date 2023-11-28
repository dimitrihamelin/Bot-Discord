const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix, cmdBot, cmdBot2, cmdBot3, cmdBot4, welcome, farewell, logs } = require("/Users/dimitri/Desktop/Locarodix/Code/Bot/config.json");

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
];

const client = new Client({ intents });

client.on('ready', () => {
    console.log('Bot ON');
    console.log(`Connecté en tant que ${client.user.tag}`);

    const logsChannel = client.channels.cache.get(logs);

    if (logsChannel) {
        logsChannel.send('Bot en ligne');
    } else {
        console.log("Impossible de trouver le salon de logs dans le cache.");
    }

    // Enregistrez vos commandes slash ici
    client.guilds.cache.forEach(guild => {
        guild.commands.create({
            name: 'ping',
            description: 'Répondre par Pong!',
            defaultPermission: true,
        });

        guild.commands.create({
            name: 'help',
            description: "Affiche l''aide des commandes",
            defaultPermission: true,
        });

        // Ajoutez d'autres commandes slash si nécessaire
    });

    // Autres actions d'initialisation...
});

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.get(welcome);

    if (welcomeChannel) {
        welcomeChannel.send(`Hello, welcome on Locarodix, ${member}!`);
    } else {
        console.log("Impossible de trouver le salon de bienvenue dans le cache.");
    }
});

client.on('guildMemberRemove', member => {
    const farewellChannel = member.guild.channels.cache.get(farewell);

    if (farewellChannel) {
        farewellChannel.send(`Goodbye, ${member.user.tag} has left Locarodix.`);
    } else {
        console.log("Impossible de trouver le salon d'au revoir dans le cache.");
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const args = message.content.slice((prefix || '').length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === '/clear' && (message.member.roles.cache.some(role => role.id === 'id role 1') || message.member.roles.cache.some(role => role.id === 'id role 2'))) {
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply('Please provide a valid number of messages to delete (1-100).');
        }

        try {
            // Suppression du message de la commande
            await message.delete();

            // Utilisation d'une boucle pour supprimer les messages en lots
            let deletedMessages = 0;
            while (deletedMessages < amount) {
                const fetched = await message.channel.messages.fetch({ limit: Math.min(amount - deletedMessages, 100) });
                const messagesToDelete = fetched.filter(msg => !msg.pinned);

                if (messagesToDelete.size === 0) {
                    break;
                }

                await message.channel.bulkDelete(messagesToDelete, true);
                deletedMessages += messagesToDelete.size;
            }

            // Vérification avant de répondre au message
            if (message.reference && message.reference.messageId) {
                const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
                if (referencedMessage) {
                    message.reply(`Successfully deleted ${deletedMessages} message${deletedMessages > 1 ? 's' : ''}.`).then(msg => msg.delete({ timeout: 3000 }));
                }
            }
        } catch (error) {
            console.error('Error deleting messages:', error);

            if (error.code === 'REPLIES_UNKNOWN_MESSAGE') {
                message.reply('Error: The message you are trying to reply to no longer exists.');
            } else {
                message.reply('Error deleting messages. Please try again later.');
            }
        }
    }

    // Vérifie si le message est "hello" (insensible à la casse)
    if (message.content.toLowerCase() === 'hello') {
        // Réagit au message avec un emoji (par exemple, 👋)
        try {
            await message.react('👋');
            console.log('Réaction ajoutée au message "hello"');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réaction :', error);
            message.reply('Error adding reaction. Please try again later.');
        }
    }

    // Autres logiques de traitement des messages ici...
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction) return;

    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'help') {
        await interaction.reply('**Aide Joueur :** Aucune commande - **Aide Staff :** /clear (nombre de message)');
    }
    // Ajoutez d'autres conditions pour chaque commande slash supplémentaire ici...
});

client.login(token);
