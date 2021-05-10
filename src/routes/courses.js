const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const CourseService = require('../services/courses');
const { body, validationResult } = require('express-validator');
const authGuard = require('../middleware/auth-guard');

router.post('/course', [
  body('language').not().isEmpty().withMessage('Invalid language, language can not be left empty'),
  body('level').not().isEmpty().withMessage('Invalid level, level can not be left empty'),
  body('name').not().isEmpty().withMessage('Name can not be left empty'),
], authGuard, async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    let course = await CourseService.createCourse(req.body);
    
    return res.status(HttpStatus.StatusCodes.OK).json(course);
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json(`${e}`)
  }
})

router.get('/courses', async (req, res, next) => {
  try {
    let course = await CourseService.getCourses(req.query);
    return res.status(HttpStatus.StatusCodes.OK).json(course);
  } catch (e) {
    return next(e)
  }
})

router.get('/course/:id', async (req, res, next) => {
  try {
    let course = await CourseService.getByCourseId(req.params.id);

    return res.status(HttpStatus.StatusCodes.OK).json(course)
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to get course')
  }
})

router.delete('/course/:id', authGuard, async (req, res, next) => {
  try {
    await CourseService.deleteByCourseId(req.params.id);
    return res.status(HttpStatus.StatusCodes.OK).json('Succesfully deleted course')
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to delete course')
  }
})

router.put('/course/:id', authGuard, async (req, res, next) => {
  try {
    let course = await CourseService.updateById(req.params.id, req.body);
    return res.status(HttpStatus.StatusCodes.OK).json({message: 'Succesfully updated course', course})
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json('Unable to update course')
  }
})

module.exports = router;