import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../api/baseApi"

interface RegisterValues {
    email: string
    password: string
}

export function RegisterForm() {
    const { register, handleSubmit } = useForm<RegisterValues>()
    const [registerUser] = useRegisterMutation()

    async function onSubmit(data: RegisterValues) {
        const result = await registerUser(data)

        if (result.data) {
            alert(`Реєстрація успішна: ${result.data.email}`)
        } else {
            alert("Помилка реєстрації")
        }
    }

    return (
        <div className="form-block">
            <h2 className="form-title">Реєстрація</h2>
            <form className="form-data" onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="email" {...register("email")}/>
                <input type="password" placeholder="password" {...register("password")}/>
                <button type="submit" className="send-btn">register</button>
            </form>
        </div>
    )
}