import WordDefinition from "../models/wordDefinition";

function saveWordDefinition(word, definition) {
    return WordDefinition.create(word, definition);
}

function getWordDefinition(word) {
    return WordDefinition.get(word);
}

function deleteWordDefinition(word) {
  return WordDefinition.delete(word);
}

function listWordDefinition() {
    return WordDefinition.all();
}

export default { saveWordDefinition, getWordDefinition, listWordDefinition, deleteWordDefinition };
