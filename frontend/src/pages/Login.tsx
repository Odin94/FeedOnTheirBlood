
import { Button, Loader, Text } from "@mantine/core";

import { Box, Group, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { signInWithGithub, useSession, useSignInWithEmail, useSignOut } from "../api/user.type";

interface FormValues {
    email: string,
    password: string,
}

const Login = () => {
    const { data: session, isLoading: sessionIsLoading } = useSession()

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

    const signInWithEmailMutation = useSignInWithEmail(form.values.email, form.values.password)
    const signOutMutation = useSignOut()

    if (sessionIsLoading) {
        return (
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <Loader />
            </Box>
        )
    }

    if (signInWithEmailMutation.isError) {
        return (
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <Text color="red">Error: {(signInWithEmailMutation.error as Error).message}</Text>
            </Box >
        )
    }
    if (signOutMutation.isError) {
        return (
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <Text color="red">Error: {(signOutMutation.error as Error).message}</Text>
            </Box >
        )
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            {!!session
                ? <div>
                    <Text>You are already logged in</Text>
                    <Group position="right" mt="md">
                        <Button onClick={() => signOutMutation.mutate()} type="submit">Logout</Button>
                    </Group>
                </div>
                : <div>
                    <form onSubmit={form.onSubmit((_values) => signInWithEmailMutation.mutate())}>
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

                    <Button color="gray" onClick={signInWithGithub}>
                        SignIn with Github
                    </Button>
                    {(signInWithEmailMutation.isLoading || signOutMutation.isLoading) ? <Loader /> : null}
                </div>
            }
        </Box>
    );
}

export default Login;
