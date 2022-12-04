import { useState } from "react"
import { useForm } from '@mantine/form';

const CreateVampire = () => {
    const [name, setName] = useState('')
    const [formError, setFormError] = useState(null)

    const form = useForm({
        initialValues: {
            email: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (<div></div>)
}

export default CreateVampire