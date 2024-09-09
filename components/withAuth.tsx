import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { Session } from "next-auth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const { data: session, status } = useSession() as { data: Session | null, status: string };
    const router = useRouter()

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/login")
      }
    }, [status, router])

    if (status === "authenticated") {
      return <WrappedComponent {...props} />
    }

    return null
  }

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`
  return WithAuth
}

function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withAuth