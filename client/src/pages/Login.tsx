
import { Button } from "@mantine/core";
import { useState } from "react";
import { getCurrentUser } from "../api/user.type";

import { Box, Group, TextInput } from '@mantine/core';
import supabase from "../utils/supabase";
import { useForm } from "@mantine/form";

interface FormValues {
    email: string,
    password: string,
}

const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })

    const user = await getCurrentUser()
    console.log(`${JSON.stringify(user)}`)

    console.log(`${JSON.stringify({ data, error })}`)
}

const signout = async () => {
    const { error } = await supabase.auth.signOut()
}

const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password,
    })
}

const Login = () => {
    const [loginStatus, setLoginStatus] = useState("")

    const signUpWithEmail = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email, password,
        })

        console.log({ data, error })
    }

    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length >= 8 ? null : 'Password too short',
        },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(({ email, password }) => signUpWithEmail(email, password))}>
                <TextInput
                    type={"email"}
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <TextInput
                    type={"password"}
                    withAsterisk
                    label="Password"
                    placeholder="your@email.com"
                    {...form.getInputProps('password')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

            <hr />

            <Button color="gray" onClick={signInWithGitHub}>
                SignIn with Github
            </Button>
        </Box>
    );
}

export default Login;
