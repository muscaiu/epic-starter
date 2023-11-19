import { type DataFunctionArgs, json, } from '@remix-run/node'
import { Link, useFetcher, useLoaderData } from "@remix-run/react";

export async function loader({ request }: DataFunctionArgs) {
  return json({
    user: {
      name: 'initial',
      username: 'initial',
    }
  }
  )
}

export const action = async () => {
  return json({
    user: {
      name: 'new',
      username: 'user',
    }
  }
  )
};

export default function Test() {
  const data = useLoaderData<typeof loader>()
  console.log('data:', data)
  const fetcher = useFetcher()

  const newData = fetcher.formData && fetcher.formData.get("user")
  console.log('newData:', newData)

  return (
    <div className="text-center">
      <div>Test</div>
      <Link
        to="/apis/test"
      >
        Test apis data
      </Link>
      <p>
        {JSON.stringify(data, null, 2)}
      </p>

      {/* <Form method="post">
        <button type="submit">Call endpoint</button>
      </Form> */}
      <fetcher.Form method="post">
        <button type="submit">Call endpoint</button>
      </fetcher.Form>
    </div>
  )
}
