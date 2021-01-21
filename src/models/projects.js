const db = require('../config/db');
const { findRegisterByField } = require('../utils/mongooseQueryHandler');

const ProjectSchema = new db.Schema({
    project_title: {
        type: String,
        required: true,
        minlength: 4,
        validate: {
            validator: async function(value) {
                const projectExists = await findRegisterByField(
                    Project,
                    'project_title',
                    value
                );
                return !projectExists;
            }
        }
    },
    project_status: {
        type: Boolean,
        default: true
    },
    project_desc: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 140
    },
    project_created_at: { type: Date, default: Date.now() }
});

const Project = db.mongoose.model('projects', ProjectSchema);

module.exports = Project;
