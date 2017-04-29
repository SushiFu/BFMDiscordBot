import mongoose from "../server/mongo";

export const TwitterUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userTag: {
        type: String,
        required: true,
        unique: true
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
TwitterUserSchema.statics = {
    /**
     * Save twitter user
     * @param {String} userId - Twitter valid user id
     * @param {String} userTag - Twitter user tag
     * @returns {Promise}
     */
    create(userId, userTag) {
        const user = new this();
        user.userId = userId;
        user.userTag = userTag;
        return user.save();
    },
    /**
     * Delete twitter user
     * @param {String} userTag - Twitter user tag
     */
    delete(userTag) {
        return this.deleteOne({ userTag: userTag }).then(() => userTag);
    },
    /**
     * Get all twitter users
     * @returns {Promise}
     */
    all() {
        return this.find({});
    }
};

/**
 * @typedef TwitterUser
 */
export default mongoose.model("TwitterUser", TwitterUserSchema);