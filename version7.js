const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix, cmdBot, cmdBot2, cmdBot3, cmdBot4, welcome, farewell, logs } = require("/Users/dimitri/Desktop/Locarodix/Code/Bot/config.json");

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
];

const client = new Client({ intents });

const langMap = {
    [cmdBot]: "en",
    [cmdBot2]: "de",
    [cmdBot3]: "fr",
    [cmdBot4]: "fr",
};

client.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.get(welcome);

    if (welcomeChannel) {
        welcomeChannel.send(`Hello, welcome on Locarodix, ${member}!`);
    } else {
        console.log("Impossible de trouver le salon de bienvenue dans le cache.");
    }
});

client.on("guildMemberRemove", member => {
    const farewellChannel = member.guild.channels.cache.get(farewell);

    if (farewellChannel) {
        farewellChannel.send(`Goodbye, ${member.user.tag} has left Locarodix.`);
    } else {
        console.log("Impossible de trouver le salon d'au revoir dans le cache.");
    }
});

client.on("ready", () => {
    console.log("Bot ON");
    console.log(`Connecté en tant que ${client.user.tag}`);

    const logsChannel = client.channels.cache.get(logs);

    if (logsChannel) {
        logsChannel.send("Bot en ligne");
    } else {
        console.log("Impossible de trouver le salon de logs dans le cache.");
    }

    // sendContactMessages(); // La fonction sendContactMessages() n'est pas définie dans le code fourni.

    // Autres actions d'initialisation...
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const args = message.content.slice((prefix || '').length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === '/clear' && message.member.roles.cache.some(role => role.id === 'your id token for the role of your staff')) {
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please provide a valid number of messages to delete.');
        }

        try {
            await message.channel.bulkDelete(amount + 1);
            message.reply(`Successfully deleted ${amount} messages.`).then(msg => msg.delete({ timeout: 3000 }));
        } catch (error) {
            console.error('Error deleting messages:', error);
            message.reply('Error deleting messages. Please try again later.');
        }
    }

    // Vérifie si le message est "hello" (insensible à la casse)
    if (message.content.toLowerCase() === 'hello') {
        // Réagit au message avec un emoji (par exemple, 👋)
        message.react('👋')
            .then(() => console.log('Réaction ajoutée au message "hello"'))
            .catch((error) => console.error('Erreur lors de l\'ajout de la réaction :', error));
    }
    // Autres logiques de traitement des messages ici...
});

client.login(token);
