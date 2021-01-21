const db = require('../config/db');

const TransactionSchema = new db.Schema({
    transaction_amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                if (value <= 0)
                    return false;
                return true;
            }
        }
    },
    transaction_desc: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 140
    },
    transaction_created_at: { type: Date, default: Date.now() },
    transaction_type: {
        type: db.Schema.Types.ObjectId,
        ref: 'transaction-types',
        required: true,
        autopopulate: true
    }
});

// plugins
TransactionSchema.plugin(require('mongoose-autopopulate'));

const Transaction = db.mongoose.model('transactions', TransactionSchema);

module.exports = Transaction;
