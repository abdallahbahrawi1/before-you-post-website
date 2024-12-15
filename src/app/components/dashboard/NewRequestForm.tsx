import RequestTypeSelector from "./RequestTypeSelector";
import Input from "../ui/Input";
import PointsSelector from "./PointsSelector";
import FormActions from "./FormActions";


const NewRequestForm = () => (
  <form className="new-request-form bg-white p-8 rounded-xl shadow-md space-y-6">
    <RequestTypeSelector />
    <Input
      label="Description"
      type="textarea"
      placeholder="Describe your request..."
      className="form-group"
    />
    <Input label="Attachments" type="file" className="form-group file-upload" />
    <PointsSelector />
    <FormActions />
  </form>
);

export default NewRequestForm;