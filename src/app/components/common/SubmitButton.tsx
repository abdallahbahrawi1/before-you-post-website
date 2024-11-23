const SubmitButton = ({ loading, label }: { loading: boolean; label: string }) => (
  <button
    type="submit"
    className="w-full py-3 mt-4 rounded-lg bg-gradient-to-br from-purple-500 to-red-400 text-white font-semibold hover:shadow-lg transition-transform transform hover:-translate-y-1"
    disabled={loading}
  >
    {loading ? `${label}...` : label}
  </button>
);

export default SubmitButton;