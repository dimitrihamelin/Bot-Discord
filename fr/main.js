let { GatewayIntentBits , Client , Collection, InteractionType ,ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder,TextInputStyle, ButtonBuilder, ChannelType, PermissionsBitField} = require("discord.js")
let { readdirSync } = require("fs")
let IncludedIntents = Object.entries(GatewayIntentBits).reduce((t, [, V]) => t | V, 0)
let client = new Client({ intents: IncludedIntents })
let {log, roleStaff, welcome, farewell, STATUS, Token} = require("./config.json")
let db = require("croxydb")
const ffmpegStatic = require('ffmpeg-static');
const play = require('play-dl');
const https = require('https');
const fs = require('fs');
const { StreamType } = require('@discordjs/voice');
require('dotenv').config();
const FFmpeg = require('/Users/dimitri/Desktop/Locarodix/Code/Bot/fr/node_modules/prism-media/src/core/FFmpeg.js'); // Adjust the path accordingly

client.login(Token).then(console.log("Support FR qui marche")).catch((err) => {console.log("Problème FR")})



let eventFiles = readdirSync('./Client').filter(file => file.endsWith('.js'));

for (let file of eventFiles) {
	let event = require(`./Client/${file}`);
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
					parent: "1132312112056782908",
			
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
					  }
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
			
				if (command === '/clear' && (message.member.roles.cache.some(role => role.id === '1128408743646871715') || message.member.roles.cache.some(role => role.id === '1128411176963940503'))) {
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

			let prefix= "!"
    
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
				  'raadio2': 'https://icecast.err.ee/raadio2madal.mp3',
				  'viker': 'https://icecast.err.ee/vikerraadiomadal.mp3',
				  'kuku': 'https://le08.euddn.net/79b78be4e1816bef40e0908f8c2f9a90155ae56b748c3dee2332caf36204d6af17dafbf788e38cb194b274ef1ef30b1815488419930462f9f93e00cb86934efd0072e2bb0505b74ab2511be0f27b9f12799c1aa7fd6d95f6a3bb8d4aa6c275bb39807245e30e6e9747be619be448c339b1495016e93a3b26a4f5628f306d58b48a5785392db6862191c8cf94f3b45b5c8d0bf9463478531d7773a8530139623a7896af20acd286504dc8003ad43c5b58/kuku_low.mp3',
				  'skyplus': 'https://edge03.cdn.bitflip.ee:8888/SKYPLUS?_i=c1283824',
				  'elmar': 'https://le08.euddn.net/c1ea79029e3f6c126ea59b8e54d9eddec0b9a60e889060bffcfd373a5ee3afc81881f30782fd3d0580e7c0941c6a08d63dba1f5696e01048627e537db0661918a6103996b249df90ecae951f9341b2332893afe0dd1e1d62e12ac0e236276b1d593228e98f8e06dc91d712e9d490731010509ea4599b4fda7a86ea6d03c00a5d003f27b47c34ed2b075382cfd37c11621acd489749d4018c3db1d9fcb8b3e907c3dfe681832423d540786f3bd4173248/elmar_low.mp3',
				  'retro': 'https://edge02.cdn.bitflip.ee:8888/RETRO',
				  'power': 'https://ice.leviracloud.eu/phr96-aac',
				  'rock': 'https://edge03.cdn.bitflip.ee:8888/rck?_i=c1283824',
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
				  const channelOne = serverOne.channels.cache.get('1128741348095295648');
				  channelOne.setName(`📊｜Membres - ` + serverOne.memberCount, 'AutoMemberCount')
				}, 10000);
			  })
		  
		  
