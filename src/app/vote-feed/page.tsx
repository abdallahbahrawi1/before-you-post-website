import VoteFeed from "@/features/vote-feed"
import ProtectedRoute from "@/Services/ProtectedRoute"

const page = () => {
  return (
    <ProtectedRoute>
      <VoteFeed />
    </ProtectedRoute>
  )
}

export default page