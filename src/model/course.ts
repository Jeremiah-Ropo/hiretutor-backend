import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { Tutor } from 'model';
@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform(doc: DocumentType<Course>, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
})
class Course {
  @prop({ nullable: true })
  courseCode: string;

  @prop({ nullable: true })
  courseTitle: string;

  @prop({ nullable: true })
  price: string;

  @prop({ nullable: true })
  description: string;

  @prop({ ref: "Tutor", nullable: true })
  tutor: Ref<Tutor>;

  @prop({ default: new Date().toUTCString() })
  createdAt: Date;
}

const CourseModel = getModelForClass(Course);

export { Course, CourseModel };
