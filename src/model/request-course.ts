import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { Student } from './student';
@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform(doc: DocumentType<CourseRequest>, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
})
class CourseRequest {
  @prop({ nullable: true })
  courseCode: string;

  @prop({ nullable: true })
  courseTitle: string;

  @prop({ ref: "Student", nullable: true })
  student: Ref<Student>;

  @prop({ default: new Date().toUTCString() })
  createdAt: Date;
}

const CourseRequestModel = getModelForClass(CourseRequest);

export { CourseRequest, CourseRequestModel };