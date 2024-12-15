const FormActions = () => (
  <div className="form-actions flex gap-4 justify-end">
    <button
      type="button"
      className="btn-secondary bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
    >
      Preview
    </button>
    <button
      type="submit"
      className="btn-primary bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
    >
      Submit Request
    </button>
  </div>
);

export default FormActions;