import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import supabase from '../utils/supabase';

interface FormValues {
    email: string,
    password: string,
}

const SignUp = () => {
    const [signupStatus, setSignupStatus] = useState("")

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
        </Box>
    );
}

export default SignUp