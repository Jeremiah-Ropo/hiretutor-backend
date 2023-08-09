import { Request, Response, NextFunction } from "express";
import { StudentModel, TutorModel, CourseRequestModel, AccessModel,CourseModel } from "../model";
import { Service } from "typedi";
import axios from 'axios';
import { PRICE } from '../config';


import { CustomError } from "../utils/response/custom-error/CustomError";
import { createUserJwtToken, createAdminJwtToken } from "../utils/createJwtToken";

@Service()
class UserService {
    constructor(
        private readonly studentModel = StudentModel,
        private readonly tutorModel = TutorModel,
        private readonly request = CourseRequestModel,
        private readonly access = AccessModel,
        private readonly course = CourseModel
    ) { }

    async register(payload: any, next: NextFunction) {
        try {
            let student = await this.studentModel.findOne({ email: payload.email });
            if (student) {
                return next(new CustomError(400, "General", "User already exist"))
            };
            let tutor = await this.tutorModel.findOne({ email: payload.email });
            if (tutor) {
                return next(new CustomError(400, "General", "User already exist"))
            };

            if (payload.type === "tutor") {

                const newUser = await this.tutorModel.create({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    address: payload.streetAddress,
                    email: payload.email,
                    type: payload.type,
                    password: payload.password
                });

                let token = createUserJwtToken({ id: newUser.id, email: payload.email, type: "Tutor" });
                newUser.token = token;
                delete newUser.password;
                await newUser.save();
                return newUser;

            };

            const newUser = await this.studentModel.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                address: payload.streetAddress,
                email: payload.email,
                type: payload.type,
                password: payload.password
            });
            let token = createUserJwtToken({ id: newUser.id, email: payload.email, type: "Student" });
            newUser.token = token;
            delete newUser.password;
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log(error)
            return next(new CustomError(500, "Raw", "Can't create a user", null, error))
        }
    }

    async update(id: any, payload: any, next: NextFunction) {
        try {
            let user = await this.studentModel.findById(id);

            if (!user) {
                return next(new CustomError(400, "General", "User not allowed"))
            }

            const update = await this.studentModel.findByIdAndUpdate({ _id: user._id }, payload, { new: true });
            delete update.token;
            return update;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't update", null, error))
        }
    }

    async login(payload: any, next: NextFunction) {
        try {
            if(payload.type === "tutor"){
                let tutor = await this.tutorModel.findOne({ email: payload.email});
                if (!tutor) {
                    return next(new CustomError(400, "General", "User not found"))
                };
                if(tutor.password !== payload.password){
                    return next(new CustomError(400, "General", "Invalid email or password"))
                };
                let payloadJwt = {
                    id: tutor.id,
                    email: tutor.email,
                    type: tutor.type
                }
    
                let token = createUserJwtToken(payloadJwt);
                tutor.token = token;
                await tutor.save();
                return token; 
            };
            let student = await this.studentModel.findOne({ email: payload.email});
            if (!student) {
                return next(new CustomError(400, "General", "User not found"))
            };
            if(student.password !== payload.password){
                return next(new CustomError(400, "General", "Invalid email or password"))
            };
            let payloadJwt = {
                id: student.id,
                email: student.email,
                type: student.type
            }

            let token = createUserJwtToken(payloadJwt);
            student.token = token;
            await student.save();
            return token;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Login in", null, error))
        }
    };


    async logOut(id: any, next: NextFunction) {
        try {
            let user = await this.studentModel.findById({ _id: id });
            if (!(user)) {
                return next(new CustomError(403, "General", "Forbidden"))
            }

            user.token = `${user.token}+logout`;
            await user.save();

            return { message: "Logout Successfully" };
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Login out", null, error))
        }
    };

    async findOneStudent(id: any, next: NextFunction) {
        try {
            let student = await this.studentModel.findById({ _id: id });
            if (!(student)) {
                return next(new CustomError(403, "General", "Forbidden"))
            }
            return student;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Login out", null, error))
        }
    };

    async findOneTutor(id: any, next: NextFunction) {
        try {
            let tutor = await this.tutorModel.findById({ _id: id });
            if (!(tutor)) {
                return next(new CustomError(403, "General", "Forbidden"))
            }
            return tutor;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Login out", null, error))
        }
    };

    async loginAdmin(payload: any, next: NextFunction) {
        try {
            let user = await this.studentModel.findOne({ email: payload.email, passsword: payload.password });
            if (!(user)) {
                return next(new CustomError(400, "General", "Invalid email or password"))
            }
            let payloadJwt = {
                id: user.id,
                email: user.email,
                type: "Admin"
            }

            let token = createAdminJwtToken(payloadJwt);
            user.token = token;
            await user.save();

            return { message: "Successful login admin", token: token };
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Login in", null, error))
        }
    };

    async pay({ id }, tutorId: any, next: NextFunction) {
        try {
            const student = await this.studentModel.findById(id);
            if (!student) {
                return next(new CustomError(400, "General", "User don't exist"));
            };
            const tutor = await this.tutorModel.findById(tutorId);
            if (!tutor) {
                return next(new CustomError(400, "General", "Tutor don't exist"));
            }

            let total = (parseInt(PRICE) * 100);
            const { data } = await axios.post(`https://api.paystack.co/transaction/initialize`,
                {
                    amount: total,
                    email: student.email,
                    metadata : {
                        custom_fields : tutor.id,
                        tutor_pay : true
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        "Content-Type": 'application/json'
                    }
                })

            return data.data.authorization_url;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't generate link", null, error))
        }
    };

    async payTutor({ id }, courseId: any, next: NextFunction) {
        try {
            const student = await this.studentModel.findById(id);
            if (!student) {
                return next(new CustomError(400, "General", "User don't exist"));
            };

            const course = await this.course.findById(courseId);
            if (!course) {
                return next(new CustomError(400, "General", "Course don't exist"));
            };

            const access = await this.access.findOne({ course: course._id, student: student._id });
            if (!access) {
                return next(new CustomError(400, "General", "You've not yet paid for access to this tutor"));
            };

            const tutor = await this.tutorModel.findById(course.tutor);
            if (!tutor) {
                return next(new CustomError(400, "General", "Tutor don't exist"));
            };

            let total = (parseInt(course.price) * 100);
            const { data } = await axios.post(`https://api.paystack.co/transaction/initialize`,
                {
                    amount: total,
                    email: student.email,
                    metadata : {
                        custom_fields : course.id,
                        course_pay : true
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        "Content-Type": 'application/json'
                    }
                })

            return data.data.authorization_url;
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't generate link", null, error))
        }
    };

    async requestCourse(id: any, payload: any, next: NextFunction) {
        try {
            const student = await this.studentModel.findOne(id);
            if(student){
                return next(new CustomError(400, "General", "User don't exist"));
            };
            const request = await this.request.create({
                student: student._id,
                courseTitle: payload.courseTitle,
                courseCode: payload.courseCode
            });
            student.requests.push(request);
            await student.save();
            return student;

        } catch (error) {
            return next(new CustomError(500, "Raw", "Can't create course", null, error))
        }
    };

    async all(next: NextFunction) {
        try {
            let user = await this.studentModel.find({});

            return { data: user };
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't Fetch", null, error))
        }
    }

    async delete(id: any, next: NextFunction) {
        try {
            let user = await this.studentModel.findById(id);
            if (!user) {
                return next(new CustomError(400, "General", "User not allowed"))
            }

            await this.studentModel.findByIdAndDelete({ _id: user._id });
            return { message: "deleted" };
        } catch (error) {
            return next(new CustomError(400, "Raw", "Can't delete", null, error))
        }
    };

    async webhook(payload, next: NextFunction) {
    try {
      console.log(payload)
      if (payload.event === 'charge.success') {

        if (payload.data.metadata.tutor_pay) {
          const student = await this.studentModel.findOne({ email: payload.data.customer.email })
          const tutor = await this.tutorModel.findById(payload.data.metadata.custom_fields);
          const amount = payload.data.amount / 100;

          await this.access.create({
            accessPaid: true,
            tutor: tutor._id,
            student: student._id,
            ref: payload.data.reference,
            adminAmount: amount,
          });
          return {};
        }else{

            const student = await this.studentModel.findOne({ email: payload.data.customer.email })
            const tutor = await this.tutorModel.findById(payload.data.metadata.custom_fields);
            const access = await this.access.findOne({ tutor: tutor._id, student: student._id });
            const amount = payload.data.amount / 100;

            access.tutorAmount = amount;
            access.paidTutor = true;
            await access.save();
            return {};
        }

      } else {
        console.log(payload);
      };
    } catch (error) {
      console.log(error)
      return next(new CustomError(400, 'Raw', 'Error', null, error));
    }
  }
}

export default UserService;