import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';

import { Course } from './course';
@modelOptions({
  schemaOptions: {
    versionKey: false,
    toJSON: {
      transform(doc: DocumentType<Tutor>, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
})
class Tutor {
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

  @prop({ ref: "Course", nullable: true })
  courses: Ref<Course>[];

  @prop({ default: new Date().toUTCString() })
  createdAt: Date;
}

const TutorModel = getModelForClass(Tutor);

export { Tutor, TutorModel };
