let { GatewayIntentBits , Client , Collection, InteractionType ,ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder,TextInputStyle, ButtonBuilder, ChannelType, PermissionsBitField} = require("discord.js")
let { readdirSync } = require("fs")
let IncludedIntents = Object.entries(GatewayIntentBits).reduce((t, [, V]) => t | V, 0)
let client = new Client({ intents: IncludedIntents })
let {Token, log, roleStaff, welcome, farewell, STATUS} = require("./config.json")
let db = require("croxydb")

client.login(Token).then(console.log("Support FR qui marche")).catch((err) => {consle.log("Problème FR")})



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
					welcomeChannel.send(`Hello, welcome on Locarodix, ${member} !`);
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
			
			client.on('messageCreate', message => {
				if (message.content === '!rejoindre') {
					// Vérifie si l'auteur du message est dans un salon vocal
					if (message.member.voice.channel) {
						message.member.voice.channel.join()
							.then(connection => {
								message.reply('Connecté au salon vocal!');
							})
							.catch(error => {
								console.error(error);
							});
					} else {
						message.reply('Vous devez être dans un salon vocal pour utiliser cette commande.');
					}
				}
			});

					




             
