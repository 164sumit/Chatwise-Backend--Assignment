"use server";

import { Backend_Url } from "@/constants";

interface Signup {
  username: string;
  email: string;
  password: string;
}
export const RegisterUser = async (data: Signup) => {
  const response = await fetch(`${Backend_Url}/api/v1/user/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if(response.ok){
    // console.log(response);
    
    return await response.json();
  }
  else{
    const error = await response.json();
    throw new Error(`Error registering user: ${error.message}`);
    return `${error.message}`;
  }
};

interface Login {
  email: string;
  password: string;
}

export const LoginUser = async (data: Login) => {
    const response = await fetch(`${Backend_Url}/api/v1/user/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if(response.ok){
    // const data = await response.json();
    console.log(data);
    // const token = response.headers.get("Authorization")?.split(" ")[1];
    // localStorage.setItem("token", token as string);
    if(response.ok){
      return await response.json();
    }
    else{
      throw new Error("Failed to authenticate user");
    }
    // return await response.json();
  }
  else{
    const error = await response.json();
    throw new Error(`Error logging in user: ${error.message}`);
    return `${error.message}`;
  }
};
