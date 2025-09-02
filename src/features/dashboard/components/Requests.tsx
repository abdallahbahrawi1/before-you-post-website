
import Card from "@/ui/Card";
import { useRequests } from "../hooks/useRequests";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-green-100 text-green-600';
    case 'completed': return 'bg-blue-100 text-blue-600';
    case 'pending_review': return 'bg-orange-100 text-orange-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};


const Requests = () => {
  const { requests, loading, error, deleteRequest } = useRequests();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await deleteRequest(id);
      } catch (err) {
        alert(`Failed to delete request, ${err}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">Loading requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">No requests found. Create your first request!</div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((req) => (
        <Card key={req.id} className="hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`font-semibold px-2 py-1 rounded ${getStatusColor(req.status)}`}>   {req.status}
            </span>
            <div className="text-sm text-gray-500">{req.currentPoints} points</div>
          </div>
          <h3 className="font-bold text-lg mb-2">{req.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{req.description}</p>
          {/* Show categories */}
          <div className="mb-3">
            {req.categories && req.categories.map((category: string, index: number) => (
              <span key={index} className="inline-block bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded mr-2 mb-1">
                {category}
              </span>
            ))}
          </div>
          <div className="flex mt-4 justify-between">
            <button className="btn-secondary px-3 py-1" aria-label="Eidt request">Edit</button>
            <button
              className="btn-secondary px-3 py-1"
              aria-label="Delete request"
              onClick={() => handleDelete(req.id)}
            >
              Delete
            </button>
            <button className="btn-secondary px-3 py-1" aria-label="View responses">View Responses</button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Requests;
