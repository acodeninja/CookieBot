const fs = require('fs');
const path = require('path');
const Discord = require('discord.js')
const client = new Discord.Client()

var isPlaying = false

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
    client.user.setActivity('Les Animations D\'Joseph!', { type: 'WATCHING' });
})
client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.includes("caca") || receivedMessage.content.includes("Caca")) {
        receivedMessage.channel.send("💩")
    }
    if (receivedMessage.content.includes("pewdiepie") || receivedMessage.content.includes("Pewdiepie")) {
        receivedMessage.channel.send("Moi, je préfère T-Series, " + receivedMessage.author)
    }
    if (receivedMessage.content.includes(client.user)) {
        receivedMessage.channel.send("Mmh? Tais toi, j'essaie de dormir!")
    }
    if (receivedMessage.content.startsWith("j!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove the leading exclamation mark
    var splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    var arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: (" + receivedMessage.author.client + ") " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments


    if (primaryCommand == "cat") {
        catCommand(arguments, receivedMessage)
    } else if (primaryCommand == "8ball") {
        eballCommand(arguments, receivedMessage)
    } else if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "ping") {
        pingCommand(arguments, receivedMessage)
    } else if (primaryCommand == "8type") {
        etypeCommand(arguments, receivedMessage)
    } else if (primaryCommand == "8someone") {
        esomeoneCommand(arguments, receivedMessage)
    }

    else if (primaryCommand == "hymne") {
        hymneCommand(arguments, receivedMessage)
    } else if (primaryCommand == "bitch") {
        bitchCommand(arguments, receivedMessage)
    } else if (primaryCommand == "bruh") {
        bruhCommand(arguments, receivedMessage)
    }

    else if (primaryCommand == " ") {
        receivedMessage.channel.send("Je comprends pas ta commande.")
    }
}
function catCommand(arguments, receivedMessage) {
    var files = fs.readdirSync(path.join('img', 'cat'))
    /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
    let chosenFile = files[Math.floor(Math.random() * files.length)]
    const localFileAttachment = new Discord.Attachment(path.join('img', 'cat', chosenFile))
    receivedMessage.channel.send(localFileAttachment)
    receivedMessage.channel.send("Miaou! :D")
}
function eballCommand(arguments, receivedMessage){
    var min=0; 
    var max=100;  
    var awnser = Math.floor(Math.random() * (max - min + 1)) + min;
    if (awnser < 33) {
        receivedMessage.channel.send("Oui, j'en suis sûr!");
    }
    else if (awnser >= 33 && awnser < 66) {
        receivedMessage.channel.send("Euh, je ne sais pas...")
    }
    else if (awnser >= 66) {
        receivedMessage.channel.send("Non, je suis sûr que non.")
    }
}
function etypeCommand(arguments, receivedMessage) {
    var min = 0;
    var max = 100;
    var awnser = Math.floor(Math.random() * (max - min + 1)) + min;
    if (arguments.length > 1) {
        receivedMessage.channel.send("Trop d'arguments. L'usage correct est: \"?8type [quelqun]\"")
    } else {
        if (awnser < 33) {
            receivedMessage.channel.send("Jezu");
        }
        else if (awnser >= 33 && awnser < 66) {
            receivedMessage.channel.send("Moyen")
        }
        else if (awnser >= 66) {
            receivedMessage.channel.send("Fdp de sa mer.")
        }
    }
}
function esomeoneCommand(arguments, receivedMessage) {
    //bot role: 539476995830972426
    let chosenUser
    while (receivedMessage.member.bot === false) {
        chosenUser = receivedMessage.guild.members.random()
    }
    receivedMessage.channel.send("Ah, j'ai trouvé! C'est " + receivedMessage.guild.members.random() + "!")
}
function helpCommand(arguments, receivedMessage) {
    receivedMessage.channel.send(":thumbsup: Et voilà, tout ce que tu as besoin de savoir sur moi t'a été envoyé en message privé!")
    receivedMessage.author.send("Coucou " + receivedMessage.author + " :wave: ! Je suis Cookie Bot V1. Voici comment je fonctionne :wrench: :\n\n**Commandes**\n-j!cat: Donne une image de chat aléatoire :cat: \n-j!8ball [question]: Répond à votre question :8ball: \n-j!8someone [question]: Répond par une personne aléatoire du serveur :point_right: \n-j!ping: Vous donne votre ping :ping_pong: \n\n**Commandes Musicales**\n-j!hymne: L'hymne de la mère paterie... :flag_ru:\n-j!bitch: I don't like you, T-Series...  \n\n**Chaîne Youtube** :heart: : https://www.youtube.com/channel/UCWFbHsReGZMVRqg39eUQMwA \n\n**Serveur Discord** :purple_heart: : https://discord.gg/sN6gpCx \n\nVoilà c'est tout. Amuse toi bien, bisous :kissing_heart:")
}
function pingCommand(arguments, receivedMessage) {
    receivedMessage.channel.send(":ping_pong: Pong!")
    receivedMessage.channel.send("Tu fais " + ((new Date().getTime() - receivedMessage.createdTimestamp) * -1) + "ms " + receivedMessage.author)
}
function hymneCommand(arguments, receivedMessage) {
    if (!receivedMessage.guild) return;

    // Only try to join the sender's voice channel if they are in one themselves
    if (receivedMessage.member.voiceChannel) {
        receivedMessage.member.voiceChannel.join()
             .then(connection => { // Connection is an instance of VoiceConnection
                 receivedMessage.channel.send('Tout le monde, levez vous...');
                 receivedMessage.channel.send('...voici l\'hymne de la mère patrie!')
                 receivedMessage.channel.send('Souka bliat!')
                 const dispatcher = connection.playFile(path.join('sons', 'hymneSouka.mp3'));
                 isPlaying = true;

                 client.on('message', (receivedMessage) => {
                     // Prevent bot from responding to its own messages
                     if (receivedMessage.author == client.user) {
                         return
                     }

                     let fullCommand = receivedMessage.content.substr(9) // Remove the leading exclamation mark
                     var splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
                     let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
                     var arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

                     console.log("Command received: (" + receivedMessage.author.client + ") " + primaryCommand)
                     console.log("Arguments: " + arguments) // There may not be any arguments

                     if (receivedMessage.content.startsWith("j!svolume")) {
                         if (isPlaying) {
                             if (arguments.length > 1) {
                                 receivedMessage.channel.send(":x: L'usage correct est: ?svolume [nombre ente 0 et 1]")
                             } else {
                                 try {
                                     var volume = Number(arguments);
                                     receivedMessage.channel.send(":thumbsup: Le volume sera mis à " + volume + "/1.")
                                     dispatcher.setVolume(volume); // Set the volume
                                 } catch (error) {
                                     receivedMessage.channel.send(":x: Une erreur est survenue: {" + error.toString() + "}")
                                 }
                             }
                         } else {
                             receivedMessage.channel.send(":x:  Aucune musique ne se joue en ce moment.")
                         }
                     }
                     else if (receivedMessage.content.startsWith("j!spauses")) {
                         dispatcher.pause();
                     } else if (receivedMessage.content.startsWith("j!sresume")) {
                         dispatcher.resume();
                     }
                 })

                 dispatcher.on('end', () => {
                     // The song has finished
                     receivedMessage.channel.send('Et voilà, c\'est fini');
                     receivedMessage.channel.send('J\'espère que ca vous a plu! :thumbsup:')
                     receivedMessage.guild.voiceConnection.disconnect();
                 });

                 dispatcher.on('error', e => {
                     // Catch any errors that may arise
                     console.log(e);
                 });
                 
                 //console.log(dispatcher.time); // The time in milliseconds that the stream dispatcher has been playing for

                 //dispatcher.pause(); // Pause the stream
                 //dispatcher.resume(); // Carry on playing

                 //dispatcher.end(); // End the dispatcher, emits 'end' event
          })
          .catch(console.log);
    } else {
        receivedMessage.reply(':no_entry: Tu dois être dans un salon vocal en premier!');
    }
}
function bitchCommand(arguments, receivedMessage) {
    if (!receivedMessage.guild) return;

    // Only try to join the sender's voice channel if they are in one themselves
    if (receivedMessage.member.voiceChannel) {
        receivedMessage.member.voiceChannel.join()
             .then(connection => { // Connection is an instance of VoiceConnection
                 receivedMessage.channel.send('... lasagna!')
                 const dispatcher = connection.playFile(path.join('sons', 'lasagna.mp3'));
                 isPlaying = true;

                 client.on('message', (receivedMessage) => {
                     // Prevent bot from responding to its own messages
                     if (receivedMessage.author == client.user) {
                         return
                     }

                     let fullCommand = receivedMessage.content.substr(9) // Remove the leading exclamation mark
                     var splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
                     let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
                     var arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

                     console.log("Command received: (" + receivedMessage.author.client + ") " + primaryCommand)
                     console.log("Arguments: " + arguments) // There may not be any arguments

                     if (receivedMessage.content.startsWith("j!svolume")) {
                         if (isPlaying) {
                             if (arguments.length > 1) {
                                 receivedMessage.channel.send("L'usage correct est: ?svolume [nombre ente 0 et 1]")
                             } else {
                                 try {
                                     var volume = Number(arguments);
                                     receivedMessage.channel.send("Le volume sera mis à " + volume + "/1.")
                                     dispatcher.setVolume(volume); // Set the volume
                                 } catch (error) {
                                     receivedMessage.channel.send("Une erreur est survenue: {" + error.toString() + "}")
                                 }
                             }
                         } else {
                             receivedMessage.channel.send("Aucune musique ne se joue en ce moment.")
                         }
                     }
                     else if (receivedMessage.content.startsWith("j!spauses")) {
                         dispatcher.pause();
                     } else if (receivedMessage.content.startsWith("j!sresume")) {
                         dispatcher.resume();
                     }
                 })

                 dispatcher.on('end', () => {
                     // The song has finished
                     receivedMessage.channel.send('Et voilà, c\'est fini');
                     receivedMessage.channel.send('J\'espère que ca vous a plu!')
                     receivedMessage.guild.voiceConnection.disconnect();
                 });

                 dispatcher.on('error', e => {
                     // Catch any errors that may arise
                     console.log(e);
                 });

                 //console.log(dispatcher.time); // The time in milliseconds that the stream dispatcher has been playing for

                 //dispatcher.pause(); // Pause the stream
                 //dispatcher.resume(); // Carry on playing

                 //dispatcher.end(); // End the dispatcher, emits 'end' event
             })
          .catch(console.log);
    } else {
        receivedMessage.channel.send('... lasagna!');
        receivedMessage.channel.send("Tu dois être dans un vocal pour faire cette commmande.")
    }
}
function bruhCommand(arguments, receivedMessage) {
    if (!receivedMessage.guild) return;

    // Only try to join the sender's voice channel if they are in one themselves
    if (receivedMessage.member.voiceChannel) {
        receivedMessage.member.voiceChannel.join()
             .then(connection => { // Connection is an instance of VoiceConnection
                 receivedMessage.channel.send('...')
                 const dispatcher = connection.playFile(path.join('sons', 'bruh.mp3'));
                 isPlaying = true;

                 dispatcher.on('end', () => {
                     // The song has finished
                     receivedMessage.guild.voiceConnection.disconnect();
                 });

                 dispatcher.on('error', e => {
                     // Catch any errors that may arise
                     console.log(e);
                 });

                 //console.log(dispatcher.time); // The time in milliseconds that the stream dispatcher has been playing for

                 //dispatcher.pause(); // Pause the stream
                 //dispatcher.resume(); // Carry on playing

                 //dispatcher.end(); // End the dispatcher, emits 'end' event
             })
          .catch(console.log);
    } else {
        receivedMessage.channel.send("Tu dois être dans un vocal pour faire cette commmande.")
    }
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = process.env.BOT_TOKEN

client.login(bot_secret_token)
