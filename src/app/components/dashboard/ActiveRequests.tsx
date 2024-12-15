import Card from "../ui/Card";
import { Request } from "../../../types/types";



const requests: Request[] = [
  {
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
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((req, idx) => (
        <Card key={idx}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-600 font-semibold">{req.status}</span>
            <div className="text-sm text-gray-500">{req.points} points</div>
          </div>
          <h3 className="font-bold text-lg mb-2">{req.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{req.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{req.responses} responses</span>
            <span>{req.likes} likes</span>
          </div>
          <div className="flex mt-4 space-x-2">
            <button className="btn-secondary">Edit</button>
            <button className="btn-secondary">Delete</button>
            <button className="btn-primary">View Responses</button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ActiveRequests;
