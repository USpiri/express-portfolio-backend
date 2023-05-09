import { Schema, model } from 'mongoose'
import { Skill } from '@interface'

const SkillShema = new Schema<Skill>(
  {
    name: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    iconFamily: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const SkillModel = model('skills', SkillShema)
export default SkillModel
