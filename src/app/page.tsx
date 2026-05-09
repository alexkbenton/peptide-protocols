import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function RootPage() {
  const gatePassed = cookies().get('gate_passed')?.value

  if (gatePassed) {
    redirect('/home')
  }

  redirect('/gate')
}
