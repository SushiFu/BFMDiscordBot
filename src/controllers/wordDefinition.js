import WordDefinition from "../models/wordDefinition";

function saveWordDefinition(word, definition) {
    return WordDefinition.create(word, definition);
}

function updateWordDefinition(wordDefinition, definition) {
    return WordDefinition.update(wordDefinition, definition);
}

function getWordDefinition(word, valid) {
    return WordDefinition.get(word, valid);
}

function deleteWordDefinition(word) {
  return WordDefinition.delete(word);
}

function listWordDefinition(valid) {
    return WordDefinition.all(valid);
}

export default { saveWordDefinition, updateWordDefinition, getWordDefinition, listWordDefinition, deleteWordDefinition };
