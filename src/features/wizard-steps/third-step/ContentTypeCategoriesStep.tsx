// pages/ContentTypeCategoriesStep.tsx
import { FormEvent } from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaRegFileAlt,
  FaPen,
} from 'react-icons/fa';

import { SectionWrapper } from '../components/SectionWrapper';
import { ContentTypeOption } from '../components/ContentTypeOption';
import { TagBadge } from '../components/TagBadge';
import { PopularTags } from '../components/PopularTags';
import { TagInput } from '../components/TagInput';
import { ContentType, RequestFormData } from '@/types/types';
import { useContentTypeCategories } from '../hooks/useContentTypeCategories';


interface Props {
  initialData?: RequestFormData;
  onChange: (data: RequestFormData) => void;
  onNext: () => void;
}

const popularTagsList = [
  'Career Advice',
  'Product Launch',
  'Personal Branding',
  'Marketing',
  'Tech',
];

const contentTypeOptions = [
  { key: 'linkedin', icon: <FaLinkedin size={24} />, label: 'LinkedIn Post' },
  { key: 'twitter', icon: <FaTwitter size={24} />, label: 'Tweet' },
  { key: 'instagram', icon: <FaInstagram size={24} />, label: 'Instagram Caption' },
  { key: 'facebook', icon: <FaFacebook size={24} />, label: 'Facebook Post' },
  { key: 'blog', icon: <FaRegFileAlt size={24} />, label: 'Blog Excerpt' },
  { key: 'other', icon: <FaPen size={24} />, label: 'Other' },
];

const ContentTypeCategoriesStep: React.FC<Props> = ({ initialData, onChange, onNext }) => {
  const {
    contentType,
    otherContentType,
    tags,
    tagInput,
    setContentType,
    setOtherContentType,
    setTagInput,
    addTag,
    removeTag,
    handleTagKeyDown,
  } = useContentTypeCategories(initialData, onChange);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (contentType) onNext();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start pt-10 px-4">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-md p-10 w-full">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            Choose Content Type & Categories
          </h1>
          <p className="text-base text-gray-600 text-center mb-8">
            We’ll match your request with reviewers who know this format.
          </p>

          <form onSubmit={handleSubmit}>
            <SectionWrapper
              title="Content Type"
              helpText="Select the primary format for your content.">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {contentTypeOptions.map(({ key, icon, label }) => (
                  <ContentTypeOption
                    key={key}
                    value={key}
                    checked={contentType === key}
                    onChange={() => setContentType(key as ContentType)}
                    icon={icon}
                    label={label}
                  />
                ))}
              </div>

              {contentType === 'other' && (
                <input
                  type="text"
                  value={otherContentType}
                  onChange={e => setOtherContentType(e.target.value)}
                  placeholder="Specify content type"
                  required
                  className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              )}
            </SectionWrapper>

            <SectionWrapper
              title="Categories / Tags"
              helpText="Add relevant tags to help reviewers understand the topic.">
              <div className="flex flex-wrap gap-2 border border-transparent p-2 mb-2 min-h-[40px]">
                {tags.map(tag => (
                  <TagBadge key={tag} tag={tag} onRemove={removeTag} />
                ))}
              </div>

              <TagInput
                value={tagInput}
                onChange={setTagInput}
                onKeyDown={handleTagKeyDown}
                placeholder="Type a tag and press Enter..."
              />
              <PopularTags tags={popularTagsList} onAdd={addTag} />
            </SectionWrapper>

            <div className="flex justify-center mt-10">
              <button
                type="submit"
                disabled={!contentType}
                className="px-8 py-3 bg-purple-600 text-white rounded-md
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:bg-purple-700 transition-colors"
              >
                Move to Next Stage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentTypeCategoriesStep;