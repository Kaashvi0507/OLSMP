import mongoose from 'mongoose';


const lessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  videoUrl: { 
    type: String 
  },
  content: { 
    type: String 
  },
  duration: { 
    type: Number, 
    default: 0 
  }
});

// 
const sectionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  lessons: [lessonSchema] 
});

const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    default: 0
  },
  thumbnail: { 
    type: String, 
    default: '' 
  },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sections: [sectionSchema], 
  isPublished: { 
    type: Boolean, 
    default: false 
  },
  averageRating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true 
});

const Course = mongoose.model('Course', courseSchema);

export default Course;