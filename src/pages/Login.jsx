import { React, useRef } from "react";
import { useLogin } from "@/contexts/LoginContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function validateInputs(email, password) {
  const errors = [];
  // No checks for a valid email (i.e. user@email.domain) since dummy email "demouser" has to work.
  if (!email) errors.push("Email address not provided");
  if (!password) errors.push("Password not provided");

  return errors;
}

function Login() {
  const { authenticateUser } = useLogin();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const errorTextRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const inputEmail = emailInputRef.current.value;
    const inputPassword = passwordInputRef.current.value;

    // Reset error messages
    if (!errorTextRef.current) return; // If errorTextRef is not set up yet.
    errorTextRef.current.innerText = "";

    // Input validation
    const errors = validateInputs(inputEmail, inputPassword);
    if (errors.length > 0) {
      for (let error of errors) {
        errorTextRef.current.innerText += error + "\n";
      }
      return;
    }
    else errorTextRef.current.innerText = "";

    // Authentication (Currently using dummy authentication)
    if (!authenticateUser(inputEmail, inputPassword)) {
      errorTextRef.current.innerText = "Wrong email or password";
      return
    }
  }

  return (
    <form className="flex w-[100%] h-vh items-center justify-center flex-col">
      <div className="flex w-full max-w-sm items-center space-x-2 flex-col gap-4">
        <h1 className="text-2xl">AI Lesson Planner</h1>

        <Input type="email" placeholder="Email" ref={emailInputRef} />
        <Input type="password" placeholder="Password" ref={passwordInputRef} />

        <span ref={errorTextRef} className="text-sm text-destructive text-center "></span>

        <Button className="w-full cursor-pointer" type="submit" onClick={handleLogin}>Login</Button>
      </div>
    </form>
  )
}

export default Login;