const CourseModel = require('../models/course');

class CourseService {

  async createCourse(course) {
    const newCourse = await CourseModel.create(course);
    return newCourse;
  }

  getCourses(searchQuery = {}) {
    return CourseModel.find(searchQuery);
  }

  getByCourseId(id) {
    return CourseModel.findById(id);
  }

  async updateById(id, course) {
    await CourseModel.updateOne({_id: id}, course, { new: true });
    return this.getByCourseId(id);
  };

  deleteByCourseId(id) {
    return CourseModel.deleteOne({ _id: id });
  }
}

const course = new CourseService();

module.exports = course;