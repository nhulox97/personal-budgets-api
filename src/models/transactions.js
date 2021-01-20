const db = require('../config/db');

const TransactionSchema = new db.Schema({
    transaction_amount: {
        type: Number,
        required: true,
        validate
    }
});
