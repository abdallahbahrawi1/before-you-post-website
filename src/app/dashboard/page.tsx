import ProtectedRoute from "@/features/auth/Services/ProtectedRoute"
import Dashboard from "@/features/dashboard/components/Dashboard"


const page = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

export default page