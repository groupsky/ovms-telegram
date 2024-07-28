# ovms-telegram
OVMS plugin to send telegram messages using bot api

## Installation

### Obtain Telegram Bot Token

1. Open the Telegram app
2. Search for the `BotFather` user
3. Start a chat with the `BotFather` user
4. Send the `/newbot` command
5. Follow the instructions to create a new bot
6. Copy the token provided by the `BotFather` user

### Get the chat ID

1. Create a new group in the Telegram app
2. Add the bot you created earlier to the group
3. Send a message to the group
4. Open a new browser tab and go to `https://api.telegram.org/bot<YourBOTToken>/getUpdates` (replace `<YourBOTToken>` with the token you copied earlier)
5. Look for the `chat` object and copy the `id` value

    ```json
    ...
    "chat": {
        "id": -123456789,
        "title": "Hello bot",
        "type": "group",
    ...
    ```

6. Done! You have the chat ID

### Install the plugin on OVMS

1. Open the OVMS web interface
2. Go to the **Tools** -> **Editor** menu item
3. Create `/lib` directory in `/store/scripts` if it doesn't exist
4. Create `telegram.js` file in `/store/scripts/lib` directory
5. Copy the content of the [lib/telegram.js](https://raw.githubusercontent.com/groupsky/ovms-telegram/main/lib/telegram.js) file to the `telegram.js` file you created
6. Save the file
7. Create `ovmsmain.js` file in `/store/scripts` directory if it doesn't exist
8. Copy the content of the [ovmsmain.js](https://raw.githubusercontent.com/groupsky/ovms-telegram/main/ovmsmain.js) file to the `ovmsmain.js` file you created
9. Save the file

### Configure the plugin

1. Go to the **Tools** -> **Shell** menu item in the OVMS web interface
2. Run the following command to set the bot token

    ```text
    config set usr telegram.bot_token <YourBOTToken>
    ```
    Replace `<YourBOTToken>` with the token you copied earlier
3. Run the following command to set the chat ID

    ```text
    config set usr telegram.chat_id <YourChatID>
    ```
    Replace `<YourChatID>` with the chat ID you copied earlier
4. Done! The plugin is now configured

### Reload the JS Engine

1. Go to the **Tools** -> **Editor** menu item in the OVMS web interface
2. Click the **Reload JS Engine** button
3. You should receive a message in the Telegram group you created earlier

### OVMS Shell Commands

- `script eval "telegram.sendMessage('<message>')"` - send a message to the chat group
- `script eval telegram.resetConfig()` - reset the bot token and chat ID
