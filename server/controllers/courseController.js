import Course from '../models/courseModel.js';

export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const course = new Course({
      title,
      description,
      category,
      price,
      instructor: req.user._id,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};