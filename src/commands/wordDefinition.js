import discord from "../server/discord";
import logger from "../server/logger";
import wordDefinitionCtrl from "../controllers/wordDefinition.js";

function isNil(obj) {
  return obj === undefined || obj === null;
}

const commands = {
  add: "helpAdd",
  delete: "helpDel",
  list: "helpList",
  listUnvalid: "helpUnvalid",
  get: "help",
};

discord.onMessageEverywhere(message => {
  if (message.content.startsWith("!help")) {
    const extract = /!(.\S+)\s*([\s\S]*)/m.exec(message.content);
    const command = extract[1];
    const params = extract.length > 1 ? extract[2] : "";
    if (command === commands.get) {
      getWordDefinition(message.channel, params);
    }
    else if (command === commands.list) {
      listWordDefinition(message.channel);
    }
  }
});

function getWordDefinition(channel, word) {
  wordDefinitionCtrl.getWordDefinition(word)
    .then(wordDefinition => {
      if (wordDefinition) {
        logger.info(`Definition for ${wordDefinition.word} sent:  ${wordDefinition.definition}`);
        channel.send(wordDefinition.definition);
      }
      else {
        channel.send(`Can't find a definition for the word ${word} (But we noted it!)`);

        return wordDefinitionCtrl.saveWordDefinition(word);
      }
    })
    .then(newWord => {
      const log = `Definition for ${newWord.word} has been added for later`;
      logger.info(log);
    })
    .catch((err) => {
      logger.error(err);
    });
}

function listWordDefinition(channel, valid) {
  wordDefinitionCtrl.listWordDefinition(valid)
    .then(wordDefinitions => {
      const definitions = wordDefinitions.map((wordDefinition) => {
        return wordDefinition.word;
      });
      logger.info(definitions);
      if (definitions.length > 0) {
        channel.send(definitions);
      }
    })
    .catch((err) => {
      logger.error(err);
      discord.sendCmdDefault("Ho shit, something goes wrong");
    });
}

/**
 * Extract command and params, and peform corresponding action.
 */
discord.onMessage(message => {
  if (message.content.startsWith("!help")) {
    // match !command params
    const extract = /!(.\S+)\s*([\s\S]*)/m.exec(message.content);
    const command = extract[1];
    const params = extract.length > 1 ? extract[2] : "";

    if (command === commands.add) {
      addWordDefinition(params);
    }
    else if (command === commands.delete) {
      deleteWordDefinition(params);
    }
    else if (command === commands.listUnvalid) {
      listWordDefinition(message.channel, false);
    }
  }
});

function addWordDefinition(message) {
  // match word :: definition
  const extract = /(.*)\s+::\s+(.*)/m.exec(message);
  if (!isNil(extract) && extract.length === 3) {
    const word = extract[1];
    const definition = extract[2];

    //Check if wordDefinition for non valid exists
    wordDefinitionCtrl.getWordDefinition(word, false)
      .then(wordDefinition => {
        if (isNil(wordDefinition)) {
          //Create a new one
          return wordDefinitionCtrl.saveWordDefinition(word, definition);
        }
        else {
          //Put the existing one
          return wordDefinitionCtrl.updateWordDefinition(wordDefinition, definition);
        }
      })
      .then(wordDefinition => {
        const log = `Definition for ${wordDefinition.word} has been added: \n${wordDefinition.definition}`;
        logger.info(log);
        discord.sendCmdDefault(log);
      })
      .catch((err) => {
        logger.error(err);
        discord.sendCmdDefault(`The word ${word} already exists`);
      });
  }
  else {
    const log = "Can't add the definition. use the format word :: definition.";
    logger.info(log);
    discord.sendCmdDefault(log);
  }
}

function deleteWordDefinition(word) {
  wordDefinitionCtrl.deleteWordDefinition(word)
    .then(word => {
      const log = `Definition ${word} has been deleted`;
      logger.info(log);
      discord.sendCmdDefault(log);
    })
    .catch((err) => {
      logger.error(err);
      discord.sendCmdDefault(`Can't find and delete the word ${word}`);
    });
}