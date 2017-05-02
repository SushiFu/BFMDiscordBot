import mongoose from "../server/mongo";

export const ImageSchema = new mongoose.Schema({
    command: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
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
ImageSchema.statics = {
    create(command, url) {
        const img = new this();
        img.command = command;
        img.url = url;
        return img.save();
    },
    delete(command) {
        return this.deleteOne({ command: command }).then(() => command);
    },
    get(command) {
        return this.findOne({ command: command });
    },
    all() {
        return this.find({});
    }
};

/**
 * @typedef Image
 */
export default mongoose.model("Image", ImageSchema);