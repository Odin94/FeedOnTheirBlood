
import { Button, Divider, Loader, Text } from "@mantine/core";

import { Group, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useSession, useSignInWithEmail, useSignInWithGithub, useSignOut } from "../api/user.type";

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
    const signInWithGithubMutation = useSignInWithGithub()
    const signOutMutation = useSignOut()

    if (sessionIsLoading) {
        return (
            <Loader color="grape" />
        )
    }

    return (
        <>
            {!!session
                ? <div>
                    <Text>You are already logged in</Text>
                    <Group position="right" mt="md">
                        <Button color="grape" onClick={() => signOutMutation.mutate()} type="submit">Logout</Button>
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
                            <Button color="grape" type="submit">Login</Button>
                        </Group>
                    </form>

                    <Divider my="md" />

                    <Group position="center">
                        <Button color="gray" onClick={() => signInWithGithubMutation.mutate()}>
                            SignIn with Github
                        </Button>
                    </Group>

                    {signInWithEmailMutation.isError
                        ? <Text color="red">Login Error: {(signInWithEmailMutation.error as Error).message}</Text>
                        : null
                    }
                    {signOutMutation.isError
                        ? <Text color="red">Logout Error: {(signOutMutation.error as Error).message}</Text>
                        : null
                    }

                    {(signInWithEmailMutation.isLoading || signOutMutation.isLoading) ? <Loader /> : null}
                </div>
            }
        </>
    );
}

export default Login;
