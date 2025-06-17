import RequestCard from "./RequestCard";

const requests = [
  {
    category: "LinkedIn",
    title: "Review My LinkedIn Summary",
    description: "Need feedback on my newly written LinkedIn summary. Focus on impact and clarity.",
    points: 150,
    timeLeft: "2 hours left",
    responses: "5 responses",
    bgColor: "bg-blue-600",
  },
  {
    category: "Resume",
    title: "Technical Resume Review",
    description: "Software engineer seeking feedback on resume formatting and content structure.",
    points: 200,
    timeLeft: "5 hours left",
    responses: "3 responses",
    bgColor: "bg-green-500",
  },
  {
    category: "Portfolio",
    title: "UX Portfolio Feedback",
    description: "Looking for feedback on my case studies and overall portfolio structure.",
    points: 175,
    timeLeft: "12 hours left",
    responses: "8 responses",
    bgColor: "bg-purple-600",
  },
  {
    category: "LinkedIn",
    title: "Profile Picture Review",
    description: "Need help choosing the most professional headshot for my profile.",
    points: 100,
    timeLeft: "1 hour left",
    responses: "12 responses",
    bgColor: "bg-blue-600",
  },
  {
    category: "Resume",
    title: "Career Change Resume",
    description: "Transitioning from marketing to UX design. Need help highlighting transferable skills.",
    points: 250,
    timeLeft: "8 hours left",
    responses: "4 responses",
    bgColor: "bg-green-500",
  },
  {
    category: "Portfolio",
    title: "Design Portfolio Review",
    description: "Graphic designer seeking feedback on project presentations and layout.",
    points: 180,
    timeLeft: "6 hours left",
    responses: "7 responses",
    bgColor: "bg-purple-600",
  },
];


const RequestGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {requests.map((request, index) => (
        <RequestCard key={index} {...request} />
      ))}
    </div>
  );
};

export default RequestGrid;
