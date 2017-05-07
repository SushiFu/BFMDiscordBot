import mongoose from "../server/mongo";

export const WordDefinitionSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
    },
    definition: {
        type: String,
        unique: false,
    },
    valid: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
        timestamps: {}
    });

/**
 * Virtuals fields
 */

/**
 * Pre-save hooks
 */

/**
 * Methods
 */

/**
 * Statics
 */
WordDefinitionSchema.statics = {
    /**
     * Save WordDefinition
     * @param {String} word - Word to define
     * @param {String} definition - Word definition
     * @returns {Promise}
     */
    create(word, definition) {
        const wordDefinition = new this();
        wordDefinition.word = word;
        wordDefinition.definition = definition;
        wordDefinition.valid = definition !== undefined;
        return wordDefinition.save();
    },

    /**
     * Update WordDefinition
     * @param {String} wordDefinition - WordDefinition to be updated
     * @param {String} newDefinition - word definition to update
     * @return {Promise}
     */
    update(wordDefinition, newDefinition) {
        wordDefinition.definition = newDefinition;
        wordDefinition.valid = newDefinition !== undefined;
        return wordDefinition.save();
    },

    /**
     * Get WordDefinition
     * @param {String} word - Word defined
     */
    get(word, valid = true) {
        return this.findOne({ word: word, valid: valid });
    },
    /**
     * Delete WordDefinition
     * @param {String} word - Word defined
     */
    delete(word) {
        return this.deleteOne({ word: word }).then(() => word);
    },
    /**
     * Get all WordDefinition
     * @param {Boolean} valid - Find the valid or not definition
     * @returns {Promise}
     */
    all(valid = true) {
        return this.find({valid: valid});
    }
};

/**
 * @typedef WordDefinition
 */
export default mongoose.model("WordDefinition", WordDefinitionSchema);
