import {Tooltip} from 'react-tooltip'
import { FaQuestionCircle } from 'react-icons/fa'

const ContentTypeCategoriesStep: React.FC = () => {
  return (
    <div className='p-4'>
      <div className='flex flex-col items-center mb-4 space-y-1'>
        <h2 className='text-xl font-semibold'>
          Choose Content Type & Categories
        </h2>
        <p className='text-sm text-gray-600'>
          We’ll match your request with reviewers who know this format.
        </p>
      </div>

      <form >
        <div className='flex items-center space-x-2'>
          <h3 className='text-lg'>Content Type</h3>
          <span 
            data-tooltip-id="content-type-tooltip" 
            data-tooltip-content="Select the content type that best describes your request. This helps us match you with the right reviewers."
            className="cursor-pointer text-gray-500 hover:text-gray-700">
            <FaQuestionCircle size={18}/>
          </span>
          <Tooltip
            id="content-type-tooltip"
            place="top"
            className='bg-gray-700 text-white text-sm p-2 rounded-md'
          />
        </div>
      </form>

    </div>
  )
}

export default ContentTypeCategoriesStep