import Card from "../ui/Card";
import { Request } from "../../../types/types";

const requests: Request[] = [
  {
    id: 1,
    status: "Active",
    points: 50,
    title: "Resume Review Request",
    description:
      "Looking for feedback on my software developer resume. Focus on highlighting technical skills.",
    responses: 5,
    likes: 12,
  },
  {
    id: 2,
    status: "Active",
    points: 50,
    title: "Resume Review Request",
    description:
      "Looking for feedback on my software developer resume. Focus on highlighting technical skills.",
    responses: 5,
    likes: 12,
  },
];

const ActiveRequests = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((req) => (
        <Card key={req.id} className="hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 ">{req.status}</span>
            <div className="text-sm text-gray-500">{req.points} points</div>
          </div>
          <h3 className="font-bold text-lg mb-2">{req.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{req.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{req.responses} responses</span>
            <span>{req.likes} likes</span>
          </div>
          <div className="flex mt-4 justify-between">
            <button className="btn-secondary px-3 py-1" aria-label="Eidt request">Edit</button>
            <button className="btn-secondary px-3 py-1" aria-label="Delete request">Delete</button>
            <button className="btn-secondary px-3 py-1" aria-label="View responses">View Responses</button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ActiveRequests;
