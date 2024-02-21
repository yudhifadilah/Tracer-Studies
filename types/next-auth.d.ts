import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id_user: number;
      username: string;
      nisn: string;
      name: string;
      email: string;
      roles: string;
      token: string;
      Firstname: string;
      Lastname: string;
      status: string;
      SurveyStatus: string;
      Status_perkawinan: string;
      NoHP: string;
      Nisn: string;
      Tempat_tinggal: string;
      name: string;
      id: string;
      image: string;
      picture: string;
      emailVerified: date;
      sub: string;
    };
  }
}
