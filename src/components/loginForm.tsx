import { useForm } from "react-hook-form"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useLoginMutation } from "../api/baseApi"

interface LoginValues {
    email: string
    password: string
}

export function LoginForm() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginValues>({
        mode: "onChange"
    })
    const [loginUser] = useLoginMutation()

    async function onSubmit(data: LoginValues) {
        try {
            await loginUser(data).unwrap()
        } catch (error) {
            const apiError = error as FetchBaseQueryError
            let message = "Щось пішло не так, спробуйте ще раз"

            if (apiError.status === 401) {
                message = "Неправильний email або пароль"
            }
            if (apiError.status === "FETCH_ERROR") {
                message = "Немає зв'язку з сервером, спробуйте ще раз"
            }

            setError("root", { message: message })
        }
    }

    return (
        <div className="form-block">
            <h2 className="form-title">Вхід</h2>
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

                <button type="submit" className="send-btn">login</button>

                {errors.root && <p className="form-error">{errors.root.message}</p>}
            </form>
        </div>
    )
}