import Card from "../ui/Card";
import { HistoryItem } from "../../../types/types";

const historyItems: HistoryItem[] = [
  {
    id: 1,
    title: "Resume Review Request",
    metadata: "8 responses • Completed on May 15",
    feedback: "Great design choices, consider adding more project details",
  },
  {
    id: 2,
    title: "Resume Review Request",
    metadata: "8 responses • Completed on May 15",
    feedback: "Great design choices, consider adding more project details",
  },
];


const History = () => (
  <div className="space-y-6">
    { 
      historyItems.map(((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
          <h4 className="font-semibold text-lg">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.metadata}</p>
          <blockquote className="text-sm italic text-gray-500 mt-2">
            {item.feedback}
          </blockquote>
          <div className="flex mt-4 justify-between">
                <button className="px-3 py-1" aria-label="Eidt request">Repost</button>
                <button className="px-3 py-1" aria-label="Delete request">Delete</button>
                <button className="px-3 py-1" aria-label="View responses">View feedback</button>
          </div>
        </Card>
    )))}

  </div>
);

export default History;
