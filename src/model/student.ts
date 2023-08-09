import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { CourseRequest } from './request-course';
@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform(doc: DocumentType<Student>, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
})
class Student {
  @prop({ nullable: true })
  firstName: string;

  @prop({ nullable: true })
  lastName: string;

  @prop({ nullable: true })
  address: string;

  @prop({ nullable: true })
  email: string;

  @prop({ nullable: true })
  password: string;

  @prop({ nullable: true })
  token: string;

  @prop({ nullable: true })
  type: string;

  @prop({ ref: "CourseRequest", nullable: true })
  requests: Ref<CourseRequest>[];

  @prop({ default: new Date().toUTCString() })
  createdAt: Date;
}

const StudentModel = getModelForClass(Student);

export { Student, StudentModel };
