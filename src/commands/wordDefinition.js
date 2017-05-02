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
  get: "help",
};

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
    else if (command === commands.list) {
      listWordDefinition();
    }
    else if (command === commands.get) {
      getWordDefinition(params);
    }
  }
});

function addWordDefinition(message) {
  // match word :: definition
  const extract = /(.*)\s+::\s+(.*)/m.exec(message);
  if(!isNil(extract) && extract.length === 3) {
    const word = extract[1];
    const definition = extract[2];
    wordDefinitionCtrl.saveWordDefinition(word, definition)
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

function getWordDefinition(word) {
  wordDefinitionCtrl.getWordDefinition(word)
  .then(wordDefinition => {
    logger.info(`Definition for ${wordDefinition.word} sent:  ${wordDefinition.definition}`);
    discord.sendCmdDefault(wordDefinition.definition);
  })
  .catch((err) => {
    logger.error(err);
    discord.sendCmdDefault(`Can't find a definition for the word ${word}`);
  });
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

function listWordDefinition() {
  wordDefinitionCtrl.listWordDefinition()
  .then(wordDefinitions => {
    const definitions = wordDefinitions.map((wordDefinition) => {
      return wordDefinition.word;
    });
    logger.info(definitions);
    discord.sendCmdDefault(definitions);
  })
  .catch((err) => {
    logger.error(err);
    discord.sendCmdDefault("Ho shit, something goes wrong");
  });
}
