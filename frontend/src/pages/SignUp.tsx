import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSignUpWithEmail } from '../api/user.type';

interface FormValues {
    email: string,
    password: string,
}

const SignUp = () => {
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
    const signUpWithEmailMutation = useSignUpWithEmail(form.values.email, form.values.password)


    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit((_values) => signUpWithEmailMutation.mutate())}>
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