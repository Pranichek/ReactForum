import { useForm } from "react-hook-form"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useRegisterMutation } from "../api/baseApi"

interface RegisterValues {
    email: string
    password: string
}

export function RegisterForm() {
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<RegisterValues>({
        mode: "onChange"
    })
    const [registerUser] = useRegisterMutation()

    async function onSubmit(data: RegisterValues) {
        try {
            const user = await registerUser(data).unwrap()
            alert(`Реєстрація успішна: ${user.email}`)

            reset()
        } catch (error) {
            const apiError = error as FetchBaseQueryError
            let message = "Щось пішло не так, спробуйте ще раз"

            if (apiError.status === 409) {
                message = "Користувач з таким email вже існує"
            }

            if (apiError.status === 422) {
                message = "Некоректний email або пароль"
            }

            if (apiError.status === "FETCH_ERROR") {
                message = "Немає зв'язку з сервером, спробуйте ще раз"
            }

            setError("root", { message: message })
        }
    }

    return (
        <div className="form-block">
            <h2 className="form-title">Реєстрація</h2>
            <form noValidate className="form-data" onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="email" {...register("email", {
                    required: "Введіть email",
                    maxLength: { value: 25, message: "Email занадто довгий" },
                    validate: (value) => {
                        if (!value.includes("@") || !value.includes(".")) {
                            return "Некоректний email"
                        }
                    }
                })}/>
                {errors.email && <p className="form-error">{errors.email.message}</p>}

                <input type="password" placeholder="password" {...register("password", {
                    required: "Введіть пароль",
                    minLength: { value: 6, message: "Пароль має бути мінімум 6 символів" }
                })}/>
                {errors.password && <p className="form-error">{errors.password.message}</p>}

                <button type="submit" className="send-btn">register</button>

                {errors.root && <p className="form-error">{errors.root.message}</p>}
            </form>
        </div>
    )
}