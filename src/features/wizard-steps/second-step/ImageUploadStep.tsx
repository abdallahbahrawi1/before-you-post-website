

import { useImageUpload } from "@/hooks/useImageUpload";
import AnimatedCard from "@/ui/data-display/AnimatedCard";
import { Preview } from "@/ui/data-display/Preview";
import Modal from "@/ui/feedback/Modal";
import DropZone from "@/ui/inputs/DropZone";
import Placeholder from "../components/Placeholder";
import { Actions } from "@/ui/inputs/Actions";
import { RequestFormData } from "@/types/types";

interface Props {
  initialData: RequestFormData;
  onChange: (data: RequestFormData) => void;
  onNext: () => void;
}

const ImageUploadStep: React.FC<Props> = ({ initialData, onChange, onNext }) => {
  const { fileInputRef, previewUrl, error, handlers } = useImageUpload({
    initialUrl: initialData.image,
    onChange: url => onChange({ ...initialData, image: url }),
  });

  const skip = () => {
    onChange({ ...initialData, image: null });
    onNext();
  };

  return (
    <Modal>
      <AnimatedCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-br from-purple-600 to-coral bg-clip-text text-transparent">
            Upload an Image
          </h2>
          <p className="text-deep-blue opacity-70">
            JPEG or PNG only. Max 2 MB. You can skip if not needed.
          </p>
        </div>

        <DropZone
          fileInputRef={fileInputRef}
          onFileChange={handlers.onFileChange}
          onDrop={handlers.onDrop}
          onDragOver={handlers.onDragOver}
        >
          {previewUrl ? (
            <Preview src={previewUrl} onRemove={handlers.remove} />
          ) : (
            <Placeholder />
          )}
        </DropZone>

        {error && <p className="text-coral text-center mb-6">{error}</p>}

        <Actions canNext={!!previewUrl} onNext={onNext} onSkip={skip} />
      </AnimatedCard>
    </Modal>
  );
};

export default ImageUploadStep;