'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
type Form = z.infer<typeof schema>

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors }} = useForm<Form>({
    resolver: zodResolver(schema)
  })
  function onSubmit(data: Form) {
    console.log('submit', data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm">Email</label>
        <input {...register('email')} className="w-full rounded border px-2 py-1" />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input type="password" {...register('password')} className="w-full rounded border px-2 py-1" />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <button className="px-4 py-2 rounded bg-sky-600 text-white">Sign in</button>
    </form>
  )
}
