import { useForm } from "react-hook-form"
import { useLoginMutation } from "../api/baseApi"

interface LoginValues {
    email: string
    password: string
}

export function LoginForm() {
    const { register, handleSubmit } = useForm<LoginValues>()
    const [loginUser] = useLoginMutation()

    async function onSubmit(data: LoginValues) {
        const result = await loginUser(data)

        if (result.data) {
            alert(`Вхід успішний: ${result.data.email}`)
        } else {
            alert("Помилка входу")
        }
    }

    return (
        <div className="form-block">
            <h2 className="form-title">Вхід</h2>
            <form className="form-data" onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="email" {...register("email")}/>
                <input type="password" placeholder="password" {...register("password")}/>
                <button type="submit" className="send-btn">login</button>
            </form>
        </div>
    )
}