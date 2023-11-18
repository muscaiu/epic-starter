import { type DataFunctionArgs, json, } from '@remix-run/node'
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: DataFunctionArgs) {
  return json({
    user: {
      name: 'test',
      username: 'test',
    }
  }
  )
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>()
  console.log('data:', data)

  return (
    <>
      <div>Dashboard</div>
      <Link
        to="/apis/test"
      >
        Test apis data
      </Link>
      <p>
        {JSON.stringify(data, null, 2)}
      </p>
    </>
  )
}
