let { GatewayIntentBits , Client , Collection, InteractionType ,ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder,TextInputStyle, ButtonBuilder, ChannelType, PermissionsBitField} = require("discord.js")
let { readdirSync } = require("fs")
let IncludedIntents = Object.entries(GatewayIntentBits).reduce((t, [, V]) => t | V, 0)
let client = new Client({ intents: IncludedIntents })
let {log, roleStaff, rolebot, welcome, farewell, STATUS, Token} = require("./config.json")
let db = require("croxydb")
const ffmpegStatic = require('ffmpeg-static');
const play = require('play-dl');
const https = require('https');
const fs = require('fs');
const { StreamType } = require('@discordjs/voice');
require('dotenv').config();
const FFmpeg = require('/Users/dimitrihamelin/github/Bot-Discord/node_modules/prism-media/src/core/FFmpeg.js'); // Adjust the path accordingly

client.login(Token).then(console.log("Support EN qui marche")).catch((err) => {console.log("Problème EN")})



let eventFiles = readdirSync('/Users/dimitrihamelin/github/Bot-Discord/fr/config.json').filter(file => file.endsWith('.js'));

for (let file of eventFiles) {
	let event = require(`en/croxydb/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



const modal = new ModalBuilder()
	.setCustomId('form')
	.setTitle('Support | Locarodix Team')
	  const a1 = new TextInputBuilder()
	  .setCustomId("reason")
	  .setLabel('Ouvrir un ticket')
	  .setStyle(TextInputStyle.Paragraph) 
	
	  .setMinLength(2)
	  .setPlaceholder('Pourquoi vouloir créer un ticket ?')
	  .setRequired(true)
	  const row = new ActionRowBuilder().addComponents(a1);
	  
	  modal.addComponents(row);
	client.on('interactionCreate', async (interaction) => {
	
	  if(interaction.customId === "support"){
		await interaction.showModal(modal);
	  }
	})  


    const mod = new ModalBuilder()
	.setCustomId('addmenu1')
	.setTitle('Ticket System!')
	  const e = new TextInputBuilder()
	  .setCustomId('uyeid')
	  .setLabel('User ID')
	  .setStyle(TextInputStyle.Paragraph) 
	  .setMinLength(10)
	  .setPlaceholder('Enter the user ID you want to add.')
	  .setRequired(true)
	  const row2 = new ActionRowBuilder().addComponents(e);
	  
	  mod.addComponents(row2);
	client.on('interactionCreate', async (interaction) => {
	
	  if(interaction.customId === "add"){
		await interaction.showModal(mod);
	  }
	})  
	
	const mod2 = new ModalBuilder()
	.setCustomId('addmenu2')
	.setTitle(' Ticket System!')
	  const a = new TextInputBuilder()
	  .setCustomId('interestid')
	  .setLabel('User ID')
	  .setStyle(TextInputStyle.Paragraph) 
	  .setMinLength(10)
	  .setPlaceholder('Enter the user ID you want to remove.')
	  .setRequired(true)
	  const row3 = new ActionRowBuilder().addComponents(a);
	  
	  mod2.addComponents(row3);
	client.on('interactionCreate', async (interaction) => {
	
	  if(interaction.customId === "interest"){
		await interaction.showModal(mod2);
	  }
	})  

    client.on('interactionCreate', async interaction => {
        if (interaction.type !== InteractionType.ModalSubmit) return;
        if (interaction.customId === 'form') {
          const Reason = interaction.fields.getTextInputValue("reason")
        
      const row = new ActionRowBuilder()
      .addComponents( 
        new StringSelectMenuBuilder()
        .setCustomId('del')
      .setPlaceholder('Ticket Menu!')
      .addOptions([
      {
      label: 'Supprimer le Ticket',
      description: 'Supprime le canal.',
      emoji: "🗑",
      value: 'delete',
      },
      {
      label: "Panel",
      description: "Ajouter ou enlever des membres au salon.",
      emoji: "👤",
      value: "panel"
      
     },
]))

      
      let data = db.get(`ticket_${interaction.guild.id}`) || +1
      let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
				  if (DejaUnChannel) return interaction.reply({content: '**Vous avez déjà un support sur le serveur .**', ephemeral: true})
				  interaction.guild.channels.create({
				  name: `ticket-${interaction.user.username}-${data}`,
					type: ChannelType.GuildText,
					parent: "1182798249199943851",
			
					permissionOverwrites: [
					  {   
						  id: interaction.guild.id,
						  deny: [PermissionsBitField.Flags.ViewChannel]
					  },
					  {
						  id: interaction.user.id,
						  allow: [PermissionsBitField.Flags.ViewChannel]
					  },
					  {
						  id: roleStaff,
						  allow: [PermissionsBitField.Flags.ViewChannel]
					  },
					  {
					  	 id: rolebot,
					  		allow: [PermissionsBitField.Flags.ViewChannel]
					  },
				  ]

				})
				
					  
					  .then((c)=>{
					 
						  const i1 = new EmbedBuilder()
						  .setTitle('Gestionnaire de ticket')
						  .setDescription(`**Un utilisateur a créé une salle pour la raison : ** \`${Reason}\` \n\n **Fait par :** ${interaction.user}`)
						  .setColor("Gold")
						  c.send({embeds: [i1], content: `<@&${roleStaff}> | ${interaction.user}`, components: [row]})
						  interaction.reply({content: `Votre ticket est ouvert dans le canal <#${c.id}>.`, ephemeral: true})
					  })
			  
			  }
			})
			client.on('interactionCreate', async interaction => {
			  if (!interaction.isStringSelectMenu()) return;
			  if(interaction.customId === "del") {
				if (interaction.values[0] == "panel") {
				  await interaction.deferUpdate()
	const row2 = new ActionRowBuilder()
	.addComponents(
	new ButtonBuilder()
	.setLabel("Add")
	.setStyle(ButtonStyle.Success)
	.setEmoji("➕")
	.setCustomId("add"),
	new ButtonBuilder()
	.setLabel("Enlever")
	.setStyle(ButtonStyle.Danger)
	.setEmoji("➖")
	.setCustomId("interest"),
	new ButtonBuilder()
	.setLabel("Supprimer")
	.setStyle(ButtonStyle.Secondary)
	.setEmoji("🗑️")
	.setCustomId("sil")
	)
	const embed = new EmbedBuilder()
	.setTitle("Vue : Membre")
	.setDescription("**Vous pouvez enlever ou rajouter des membres avec les intéractions des émoticônes !**")
	.setColor("Random")
	let message = await interaction.channel.messages.fetch(interaction.message.id)
	await message.edit({embeds: [embed], components: [row2]})
			  }
			}
			})
			client.on('interactionCreate', async interaction => {
			  if (interaction.type !== InteractionType.ModalSubmit) return;
			  if (interaction.customId === 'addmenu1') {
				const id = interaction.fields.getTextInputValue('uyeid')
				const channel = interaction.channel
					channel.permissionOverwrites.create(
					  id, {ViewChannel: true}
					  
					  )
					  interaction.reply({content: `🔔 <@${id}> ajoute un ticket !`})
					} else {
					
			  }
			})
			client.on('interactionCreate', async interaction => {
			  if (interaction.type !== InteractionType.ModalSubmit) return;
			  if (interaction.customId === 'addmenu2') {
				const id = interaction.fields.getTextInputValue('interestid')
				const channel = interaction.channel
					channel.permissionOverwrites.create(
					  id, {ViewChannel: false}
					  
					  )
					  interaction.reply({content: `🔔 <@${id}> a supprimé le ticket !`})
					} else {
				   
			  }
			})
			client.on('interactionCreate', async interaction => {
			if (!interaction.isStringSelectMenu()) return;
			if(interaction.customId === "del") {
			  if (interaction.values[0] == "delete") {
				
				  const channel = interaction.channel
				  channel.delete();
				  client.channels.cache.get(log).send(`🔔 <@${interaction.user.id}> à terminé le support : **${interaction.channel.name}** !`)
				
			  }
			}
			})
			client.on('interactionCreate', async interaction => {
			  if (!interaction.isButton()) return;
			  if(interaction.customId === "sil") {
				 
					const channel = interaction.channel
					channel.delete();
					client.channels.cache.get(log).send(`🔔 <@${interaction.user.id}> à terminé le support : **${interaction.channel.name}** !`)
				  
				
			  }
			  })

			  client.on('messageCreate', async (message) => {
				if (message.author.bot) return;
			
				const args = message.content.slice(('' || '').length).trim().split(/ +/);
				const command = args.shift().toLowerCase();
			
				// Définir les ID des salons autorisés
				const allowedChannels = ['1128728125845557360', '1128824487656300546', '1128836553020559491']; // Remplacez ces ID par les ID de vos salons autorisés
			
				// Vérifier si la commande est exécutée dans un salon autorisé
				if (command === '/clear' && allowedChannels.includes(message.channel.id) && (message.member.roles.cache.some(role => role.id === '1128408743646871715') || message.member.roles.cache.some(role => role.id === '1128411176963940503'))) {
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
					} catch (error) {
						console.error('Erreur lors de l\'ajout de la réaction :', error);
						message.reply('Error adding reaction. Please try again later.');
					}
				}  
				if (message.content.toLowerCase() === 'bonjour') {
					// Réagit au message avec un emoji (par exemple, 👋)
					try {
						await message.react('👋');
					} catch (error) {
						console.error('Erreur lors de l\'ajout de la réaction :', error);
						message.reply('Error adding reaction. Please try again later.');
					}
				}      
				if (message.content.toLowerCase() === 'tg' || message.content.toLowerCase() === 'ftg' || message.content.toLowerCase() === 'ta geule') {
					try {
						await message.delete(); // Ajoutez les parenthèses ici
						await message.author.send('Alerte : Soyez gentil !'); 
					} catch (error) {
						console.error('Erreur lors de l\'ajout de la réaction :', error);
						message.reply('Error adding reaction. Please try again later.');
					}
				}
				if (message.content.toLowerCase() === 'caca' ) {
					try {
						await message.delete(); // Ajoutez les parenthèses ici
						await message.author.send('Alerte : Soyez Respectueux !'); 
					} catch (error) {
						console.error('Erreur lors de l\'ajout de la réaction :', error);
						message.reply('Error adding reaction. Please try again later.');
					}
				}
				   
			
			});

			client.on('guildMemberAdd', member => {
				const welcomeChannel = member.guild.channels.cache.get(welcome);
			
				if (welcomeChannel) {
					welcomeChannel.send(`Bienvenue sur locarodix ${member} !`);
				} else {
					console.log("Impossible de trouver le salon de bienvenue dans le cache.");
				}
			});
			
			client.on('guildMemberRemove', member => {
				const farewellChannel = member.guild.channels.cache.get(farewell);
			
				if (farewellChannel) {
					farewellChannel.send(`bye, ${member.user.tag}.`);
				} else {
					console.log("Impossible de trouver le salon d'au revoir dans le cache.");
				}
			});

			let prefix= "/"
    
			client.on('messageCreate', (message) => {
				// Check if the message starts with the command and the user has the specified role
				if (message.content.startsWith(`${prefix}yourCommand`)) {
					// Check if the user has the specified role
					if (message.member.roles.cache.has('1128408743646871715')) {
						// User has the role, allow the command
						// Your command logic here
					} else {
						// User doesn't have the role, send a message indicating the restriction
						message.reply("You don't have the required role to use this command.");
					}
				}
			});


			client.on('messageCreate', async (message) => {
				if (message.author.bot) return;
				if (!message.content.startsWith(prefix)) return;
			  
				const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
				const command = args.shift().toLowerCase();
			  
				const radioChannels = {
				  'raadio2': 'https://falixradio.fr.nf:8000/radio.mp3',
				};
			  
				if (command === 'raadio') {
				  const channelNames = Object.keys(radioChannels);
				  const randomChannelName = channelNames[Math.floor(Math.random() * channelNames.length)];
			  
				  let playedChannel = args[0] in radioChannels ? radioChannels[args[0]] : radioChannels[randomChannelName];
				  message.reply('Mängib: ' + (args[0] || randomChannelName));
			  
				  const voiceChannel = message.member.voice.channel;
				  if (!voiceChannel) {
					return message.reply('Mine häälekanalisse.');
				  }
			  
				  try {
					const connection = await joinVoiceChannel({
					  channelId: voiceChannel.id,
					  guildId: message.guild.id,
					  adapterCreator: message.guild.voiceAdapterCreator,
					});
			  
					const player = createAudioPlayer();
					connection.subscribe(player);
			  
					  https.get(playedChannel, (res) => {
						const resource = createAudioResource(res);
						player.play(resource);
						player.on(AudioPlayerStatus.Idle, () => {
						  connection.destroy();
						});
					  }).on('error', (err) => {
						console.error(err);
						connection.destroy();
					  });
				  } catch (err) {
					console.error(err);
					message.reply('Player error');
				  }
				} else if (command === 'youtube') {
				  const voiceChannel = message.member.voice.channel;
				  if (!voiceChannel) {
					return message.reply('Mine häälekanalisse.');
				  }
			  
				  const connection = await joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: message.guild.id,
					adapterCreator: message.guild.voiceAdapterCreator,
				  });
			  
				  const query = args.join(' ');
				  await playYouTubeVideo(query, connection, message);
				} else if (command === 'local') {
					const voiceChannel = message.member.voice.channel;
					if (!voiceChannel) {
						return message.reply('Rejoins d\'abord un canal vocal.');
					}
				
					const connection = await joinVoiceChannel({
						channelId: voiceChannel.id,
						guildId: message.guild.id,
						adapterCreator: message.guild.voiceAdapterCreator,
					});
				
					try {
						const filePath = '/Users/dimitri/Desktop/Locarodix/Code/Bot/test.mp3'; // Remplacez cela par le chemin de votre fichier audio local
						const stream = fs.createReadStream(filePath);
						const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
					
						const player = createAudioPlayer();
						const connection = joinVoiceChannel({
							channelId: message.member.voice.channel.id,
							guildId: message.guild.id,
							adapterCreator: message.guild.voiceAdapterCreator,
						});
					
						player.play(resource);
					
						player.on(AudioPlayerStatus.Idle, () => {
							// Quand la lecture est terminée, relancez le fichier audio
							player.play(resource);
						});
					
						connection.subscribe(player);
						message.reply('Lecture du fichier audio local.');
					} catch (err) {
						console.error(err);
						message.reply('Erreur lors de la lecture du fichier audio local.');
					}
					
				}	

			  });
			  
			  async function playYouTubeVideo(query, connection, message) {
				try {
				  const videos = await play.search(query, { limit: 1 });
			  
				  if (!videos || videos.length === 0) {
					return message.reply('Video en lectrure.');
				  }
			  
				  const video = videos[0];
				  const stream = await play.stream(video.url);
				  const resource = createAudioResource(stream.stream, { inputType: stream.type });
				  const player = createAudioPlayer();
				  player.play(resource);
				  player.on(AudioPlayerStatus.Idle, () => {
					connection.destroy();
				  });
			  
				  connection.subscribe(player);
				} catch (err) {
				  console.error(err);
				  message.reply('Réagit :(');
				}
			  }		
			  
			  const { createAudioPlayer, AudioPlayerStatus, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
			  const { pipeline } = require('stream');
			  const { promisify } = require('util');
			  const { spawn } = require('child_process');
			  const pipelineAsync = promisify(pipeline);
			  
			  async function playYouTubeVideo(query, connection, message) {
				  try {
					  const videos = await play.search(query, { limit: 1 });
			  
					  if (!videos || videos.length === 0) {
						  return message.reply('Video éteinte.');
					  }
			  
					  const video = videos[0];
					  const ffmpegProcess = spawn('ffmpeg', [
						  '-i', video.url,
						  '-f', 's16le',
						  '-ar', '48000',
						  '-ac', '2',
						  'pipe:1',
					  ]);
			  
					  const resource = createAudioResource(ffmpegProcess.stdout, { inputType: ffmpegProcess.stderr });
					  const player = createAudioPlayer();
			  
					  player.play(resource);
					  connection.subscribe(player);
			  
					  player.on(AudioPlayerStatus.Idle, () => {
						  connection.destroy();
					  });
				  } catch (err) {
					  console.error(err);
					  message.reply('Bot musique actif :(');
				  }
			  }

			  client.on('ready', () => {
				setInterval(() => {
				  const serverOne = client.guilds.cache.get('834895609622167592');
				  const channelOne = serverOne.channels.cache.get('1181732852849709220');
				  channelOne.setName(`📊｜Members - ` + serverOne.memberCount, 'AutoMemberCount')
				}, 10000);
			  })

			  const clientId = '1182805140202344579';
			  const guildId = '834895609622167592';

			  const { REST } = require('@discordjs/rest');
			  const { Routes } = require('discord-api-types/v9');
			  const commands = require('./commands');

			  const rest = new REST({ version: '9' }).setToken('Your Token');
			  
			  (async () => {
				  try {
					  console.log('Started refreshing application (/) commands.');
			  
					  await rest.put(
						  Routes.applicationGuildCommands(clientId, guildId),
						  { body: commands },
					  );
			  
					  console.log('Successfully reloaded application (/) commands.');
				  } catch (error) {
					  console.error(error);
				  }
			  })();
			  
			  client.on('interactionCreate', async interaction => {
				// Vérifie si l'interaction est une commande
				if (!interaction.isCommand()) return;
			
				// Récupère le nom de la commande
				const { commandName } = interaction;
			
				// Vérifie si la commande est 'help'
				if (commandName === 'help') {
					// Répond à l'interaction avec un message plus élaboré
					await interaction.reply({
						content: '🚀 ***Bienvenue sur le centre d\'aide*** 🚀\n\n' +
								 ''+
								 '** 🥁 Commandes disponibles pour tous les membres ** 🥁\n' +
								 ''+
								 '\n**/help** - Aides\n' +
								 // Ajoute d'autres commandes et descriptions si nécessaire
			
								 '\n**🛡️ Commandes disponibles pour le personnel** 🛡️\n' +
								 ''+
								 '\n**/raadio** - Lance la radio (utiliser que dans le salon radio)\n' +
								 '\n**/clear (nombre de messages)** - Enlève les messages dans certains salons.\n' +
								 '\n**/ban** - Bannir un membre\n' +
								 // Ajoute d'autres commandes et descriptions pour le personnel si nécessaire
			
								 '***\nMerci pour votre patiente.***',
						ephemeral: true // Rend la réponse visible uniquement pour l'utilisateur qui a déclenché la commande
					});
				}
			});
			
			
					

					
						
