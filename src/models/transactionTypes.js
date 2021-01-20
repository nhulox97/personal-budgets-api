const db = require('../config/db');
const {findRegisterByField} = require('../utils/mongooseQueryHandler');

const TransactionTypeSchema = new db.Schema({
    transaction_type_name: {
        type: String,
        required: true,
        minlength: 5,
        validate: {
            validator: async function(value) {
                const transactionTypeExists = await findRegisterByField(
                    TransactionType,
                    'transaction_type_name',
                    value
                );
                return !transactionTypeExists;
            }
        }
    },
    transaction_type_status: {
        type: Boolean,
        default: true
    },
    transaction_type_created_at: { type: Date, default: Date.now() }
});

const TransactionType = db.mongoose.model(
    'transaction-types', 
    TransactionTypeSchema
);

module.exports = TransactionType;
