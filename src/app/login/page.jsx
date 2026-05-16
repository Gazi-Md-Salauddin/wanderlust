"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@heroui/react";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password
        });
        if (data) {
            alert("Login Successfully");
            router.push("/");
        }
        if (error) {
            alert("Login Failed", error.message);
        }
    };
    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <Form
                className="flex w-full mx-auto flex-col gap-4 px-4"
                onSubmit={onSubmit}
            >
                <h2 className="text-2xl font-bold">Login</h2>
                <p>Start your adventure with Wanderlust</p>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={value => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value
                            )
                        ) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={value => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }

                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1
                        number
                    </Description>
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit">
                        Login
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
            <div className="flex justify-center items-center gap-3">
                <Separator />
                <div className="whitespace-nowrap my-6"> Or sign up with </div>
                <Separator />
            </div>
            <div>
                <Button
                    onClick={handleGoogleSignin}
                    variant="outline"
                    className={"w-full rounded-none"}
                >
                    <FcGoogle /> Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
