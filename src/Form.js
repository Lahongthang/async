import {useForm} from 'react-hook-form'

const Input = ({label, register, required}) => (
    <>
        <label>{label}</label>
        <input {...register(label, {required})}/>
    </>
)

const Form = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = data => console.log('data: ', data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign Up</h2>
            <Input label='firstName' register={register} required/>
            <Input label='lastName' register={register} required/>
            <button type="submit">Sign In</button>
        </form>
    )
}

export default Form