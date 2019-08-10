import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'question';

/**
 * User model.
 */
class Question extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }

    /**
     * Table has timestamps.
     */
    get hasTimestamps() {
        return true;
    }
 
}

export default Question;