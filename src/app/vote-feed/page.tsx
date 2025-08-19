import ProtectedRoute from "@/features/auth/Services/ProtectedRoute"
import VoteFeed from "@/features/vote-feed"

const page = () => {
  return (
    <ProtectedRoute>
      <VoteFeed />
    </ProtectedRoute>
  )
}

export default page