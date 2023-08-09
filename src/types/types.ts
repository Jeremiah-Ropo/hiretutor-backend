export type Role = 'admin' | 'student' | 'tutor';

export type Tutor = {
  id: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};


export type Student = {
  id: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type Currency = "NGN" | "USD"
