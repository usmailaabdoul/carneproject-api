const CourseModel = require('../models/course');

/**
 * course service contains methods for courses
 *
 * @class CourseService
 */
class CourseService {

  /**
   *
   *
   * @param {*} course
   * @return {*} 
   * @memberof CourseService
   */
  async createCourse(course) {
    const newCourse = await CourseModel.create(course);
    return newCourse;
  }

  /**
   *
   *
   * @param {*} [searchQuery={}]
   * @return {*} 
   * @memberof CourseService
   */
  getCourses(searchQuery = {}) {
    return CourseModel.find(searchQuery);
  }

  /**
   *
   *
   * @param {*} id
   * @return {*} 
   * @memberof CourseService
   */
  getByCourseId(id) {
    return CourseModel.findById(id);
  }

  /**
   *
   *
   * @param {*} id
   * @param {*} course
   * @return {*} 
   * @memberof CourseService
   */
  async updateById(id, course) {
    await CourseModel.updateOne({_id: id}, course, { new: true });
    return this.getByCourseId(id);
  };

  /**
   *
   *
   * @param {*} id
   * @return {*} 
   * @memberof CourseService
   */
  deleteByCourseId(id) {
    return CourseModel.deleteOne({ _id: id });
  }
}

const course = new CourseService();

module.exports = course;