# Orana
A bot for Discord servers doing events with time constraints and guests. Uses Discord.js.

## What she does:
Orana is designed to host parties.
* ~~She can assign a guest role to all people who join the server, that will allow interaction only during parties, in the party channel.~~
* When you `/open` or `/close` the party room, a text chat, she'll allow or disallow the roles of your choice from entering.
* She'll set the topic in the Announcements channel to the date and time of the next party.
* She will announce how much time is left in a party, and when the party is over.
* She can post links to new Jackbox games in the Announcements channel (but you'll have to clean them up when the game's done)
* She has options for dice rolling with `/roll`, including a verbose command `/vroll`.
* On connect, she sets her status to one of six random Kirkwall-themed actions.

## Setting this shit up:
I'm going to assume you can actually get her installed, because Node and I... *shrugs* In theory, if you `npm install` this thing, it *should* pull the dependencies. It's got a package.json. IDFK, it's my first time working with Node.

* Create a new Discord application: <https://discordapp.com/developers/applications/me/>
* Name it whatever you like! She's just Orana, for me, because I like the name.
	* Doesn't need to be public.
	* Doesn't need OAuth2.
	* Give her an icon and a description, if you like, then save.
* Get the Client ID and the Token from this page. You'll have to click to reveal the token, because DO NOT LET THE TOKEN GO PUBLIC.
* Copy `.env.example` to `.env` and fill in the blank. You'll need:
	* The bot token for the Discord API
* Copy `config.json.example` to `config.json` and start filling in the blanks. You'll need:
	* The ID number, name, and icon URL for your server.
	* URLs for the server's rules, channels list, and bot command help. (These can all be the same link, or you can remove the commands you don't want to use.)
	* The ID numbers of your Announcements, General Chat, Party, and Admin channels. (Right-click, 'Copy ID'.)
	* The ID numbers of your Guest, Patron (if you use Patreon and its bot), Inner Circle (if any), and regular member roles. (Set roles so they can be mentioned, then `\@rolename`.)
	* A name for your event.
	* The name of your timezone, in `Continent/City` format, ex. `America/New York`
	* The date for the next party in `Y, M, D, H, M, S` format, *in the timezone of the server*, for example: `2017, 3, 29, 14, 0, 0`, for 29 March, 2017 at 14:00:00. This can take a little bit of testing.
* Connect her to a server that you're an admin on. (It'll only work if you're an admin.) If you use the following link, after replacing `BOT_CLIENT_ID` with the client ID from the Discord developer application screen, it'll correctly set her permissions when she connects. https://discordapp.com/oauth2/authorize?client_id=BOT_CLIENT_ID&scope=bot&permissions=268504080
	* Manage Roles (to assign the guest role)
	* Manage Channels (to open and close the party channel and set the topic in Announcements)
	* Read Messages
	* Read Message History
	* Send Messages
* Open a console in the bot folder and `node deploy-commands.js`, to upload her slash commands.
* Now, `node bot.js`. You should see her go through a few checks and then start. Errors, if any, will show up in the console. (And she's kind of noisy, console-side. She announces connects, disconnects, errors, intentional shutdowns, and channel open/close commands.)
* At this point? Her functions should start working as intended in the server she's connected to.

Note that if you change anything in `config.json`, like the next party date, you will need to restart the bot. To do this, either CTRL-C at the console, or `/shutdown` in a channel (Admin permissions only), and then `node bot.js` again.

## Running the Bot As a Service
This dude knows what he's doing, and his directions work perfectly.
[Running a Node.js application using nvm as a systemd service](https://gist.github.com/joepie91/73ce30dd258296bd24af23e9c5f761aa)

## Stupid Problems
* Autostart for events is not yet added.
* Automatic guest roles have not been re-added.
* She's full of hardcoded references to the Kirkwall Gazette. I'm pretty sure I haven't found all of them, yet, but they'll change to `serverName`.
* Need to check for empty variables to keep the bot from exploding when hitting a non-critical null.

## Removing Stuff
If you're not interested in using certain functions, I've made them easy to remove.
* In most cases, just deleting the command from the `commands` directory will solve the problem.
* Poll and askbox: remove the marked section in `config.json` and delete `commands/polls.js`
* There are three help commands: `/help`, `/rules`, `/channels`. If you don't need all three, delete the corresponding command files.
* If there are more roles in the open/close commands than you want to use, edit `commands/open.js` and `commands/close.js` to remove the sections for the roles you're not using, so the bot doesn't throw an error and combust when it hits an empty snowflake.
* To cut down on log noise, remove `events/interactionCreate.js`, which is really only still in there so I can use it for debugging.
