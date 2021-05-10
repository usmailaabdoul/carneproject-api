const CourseModel = require('../models/course');

class CourseService {

  async createCourse(book) {
    const newBook = await CourseModel.create(book);
    return newBook;
  }

  getCourses(searchQuery = {}) {
    return CourseModel.find(searchQuery);
  }

  getByCourseId(id) {
    return CourseModel.findById(id);
  }

  async updateById(id, book) {
    await CourseModel.updateOne({_id: id}, book, { new: true });
    return this.getByCourseId(id);
  };

  deleteByCourseId(id) {
    return CourseModel.deleteOne({ _id: id });
  }
}

const course = new CourseService();

module.exports = course;