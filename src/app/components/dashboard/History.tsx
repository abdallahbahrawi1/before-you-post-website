import Card from "../ui/Card";

const History = () => (
  <div className="space-y-4">
    <Card>
      <h4 className="font-semibold text-lg">Portfolio Website Review</h4>
      <p className="text-sm text-gray-600">8 responses • Completed on May 15</p>
      <div className="text-sm italic text-gray-500 mt-2">
        &quot;Great design choices, consider adding more project details&quot;
      </div>
      <button className="btn-secondary mt-4">Repost</button>
    </Card>
  </div>
);

export default History;
