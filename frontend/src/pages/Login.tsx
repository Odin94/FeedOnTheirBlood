
import { Button, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user.type";

import { Box, Group, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { Session } from "@supabase/supabase-js";
import supabase from "../utils/supabase";

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

const Login = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
            setLoading(false)
        }
        getSession()
    }, [])

    const signInWithEmail = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email, password,
        })

        console.log({ data, error })

        if (data) {
            setSession(data.session)
        }

        return { data, error }
    }

    const signout = async () => {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            setSession(null)
        }

        return { error }
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

    if (loading) {
        return (
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <Loader />
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            {session == null ? <div>
                <form onSubmit={form.onSubmit(({ email, password }) => signInWithEmail(email, password))}>
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
                        <Button type="submit">Login</Button>
                    </Group>
                </form>

                <hr />

                <Button color="gray" onClick={signInWithGitHub}>
                    SignIn with Github
                </Button>
            </div>
                : <div>
                    <Text>You are already logged in</Text>
                    <Group position="right" mt="md">
                        <Button onClick={() => { signout() }} type="submit">Logout</Button>
                    </Group>
                </div>}
        </Box>
    );
}

export default Login;
