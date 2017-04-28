import mongoose from "../server/mongo";

export const ExampleSchema = new mongoose.Schema({
    data: String
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
ExampleSchema.statics = {

};

/**
 * @typedef Example
 */
export default mongoose.model("Example", ExampleSchema);