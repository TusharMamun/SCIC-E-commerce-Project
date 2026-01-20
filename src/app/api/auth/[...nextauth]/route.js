import { dbConnect } from "@/lib/dbconnection";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Ruthie } from "next/font/google";


// const userList=[
//     {name:"tushar", password:"12345"},
//     {name:"mamun", password:"8888"},
// ]


export const authOptions = {
// sing in wiht button
  providers:[
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
// From input
    credentials: {
      email: { label: "Email", type: "email", placeholder: "Enter You Email" },
      password: { label: "Password", type: "password", placeholder:"Password" },
 
    },

    async authorize(credentials, req) {
    const {email,password}=credentials;

const user =await dbConnect("users").findOne({email})

if(!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
          
          // If password doesn't match
          if (isPasswordValid) {
            return user;
          }


// const user = userList.find(u=>u.name ==username)
// if(!user) return null;




return null


    }
  })
],
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  // async redirect({ url, baseUrl }) {
  //   return baseUrl
  // },
  async session({ session, token, user }) {
    if(token){
      session.role=token.role;
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if(user){
      token.email = user.email
      token.role =user.role
    }
    return token
  }
}






}
  const handler=NextAuth(authOptions)
export { handler as GET, handler as POST };

