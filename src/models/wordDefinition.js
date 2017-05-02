import mongoose from "../server/mongo";

export const WordDefinitionSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
    },
    definition: {
        type: String,
        required: true,
        unique: false,
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
        return wordDefinition.save();
    },
    /**
     * Get WordDefinition
     * @param {String} word - Word defined
     */
    get(word) {
        return this.findOne({ word: word });
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
     * @returns {Promise}
     */
    all() {
        return this.find({});
    }
};

/**
 * @typedef WordDefinition
 */
export default mongoose.model("WordDefinition", WordDefinitionSchema);
