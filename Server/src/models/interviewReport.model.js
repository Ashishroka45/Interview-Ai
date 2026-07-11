import mongoose from "mongoose";

const technicalQuestionsSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  intention: {
    type: String,
    required: [true, "Intention is required"],
  },
},{
    _id:false
})
const behaviouralQuestionsSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  intention: {
    type: String,
    required: [true, "Intention is required"],
  },
},{
    _id:false
})
const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},{
    _id:false
})
const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        require:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    task:[{
        type:String,
        required:[true,"Topics are required"]
    }]

})
const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required."],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  title:{
    type:String,
    required:[true,"Title is required"]
  },
  technicalQuestions: [technicalQuestionsSchema],
  behaviouralQuestions: [behaviouralQuestionsSchema],
  skillGap:[skillGapSchema],
  preparationPlan:[preparationPlanSchema],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
},{
    timestamps:true
});

const InterviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

export default InterviewReportModel;
