import { type DataFunctionArgs, json } from "@remix-run/node"
import { requireUserId } from "#app/utils/auth.server.ts"
import { prisma } from "#app/utils/db.server.ts"
import { invariantResponse } from "#app/utils/misc.tsx"
import { useUser } from "#app/utils/user.ts"

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  })
  invariantResponse(user, 'User not found', { status: 404 })
  return json({})
}

export default function Dashboard() {
  const user = useUser()
  console.log('user:', user)

  return (
    <div>Dashboard</div>
  )
}
