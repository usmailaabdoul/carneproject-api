const mongoose = require('mongoose');

/** @type {*} */
const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  strict: true
});

CourseSchema.set('toJSON', {
  virtuals: true
});

const Course = mongoose.model('Course', CourseSchema, 'course');

module.exports = Course;