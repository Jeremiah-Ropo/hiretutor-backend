import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { Tutor, Course, Student } from 'model';
@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform(doc: DocumentType<Access>, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
})
class Access {
  
  @prop({ nullable: true })
  accessPaid: boolean;

  @prop({ nullable: true })
  paidTutor: boolean;

  @prop({ nullable: true })
  adminAmount: number;

  @prop({ nullable: true })
  tutorAmount: number;

  @prop({ ref: "Tutor", nullable: true })
  tutor: Ref<Tutor>;

  @prop({ ref: "Student", nullable: true })
  student: Ref<Student>;

  @prop({ ref: "Course", nullable: true })
  course: Ref<Course>;

  @prop({ default: new Date().toUTCString() })
  createdAt: Date;
}

const AccessModel = getModelForClass(Access);

export { Access, AccessModel };