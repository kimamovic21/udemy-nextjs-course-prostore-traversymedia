import { TiStarFullOutline } from 'react-icons/ti';
import { FaStarHalfStroke } from 'react-icons/fa6';
import { IoIosStarOutline } from 'react-icons/io';

const Rating = ({ value, caption }: { value: number; caption?: string }) => {
  const Full = () => (
    <TiStarFullOutline className='text-yellow-400' />
  );

  const Half = () => (
    <FaStarHalfStroke className='text-yellow-400' />
  );

  const Empty = () => (
    <IoIosStarOutline /> 
  );

  return (
    <div className='flex gap-2'>
      <div className='flex gap-1'>
        {value >= 1 ? <Full /> : value >= 0.5 ? <Half /> : <Empty />}
        {value >= 2 ? <Full /> : value >= 1.5 ? <Half /> : <Empty />}
        {value >= 3 ? <Full /> : value >= 2.5 ? <Half /> : <Empty />}
        {value >= 4 ? <Full /> : value >= 3.5 ? <Half /> : <Empty />}
        {value >= 5 ? <Full /> : value >= 4.5 ? <Half /> : <Empty />}
      </div>

      {caption && (
        <span className='text-sm'>
          {caption}
        </span>
      )}
    </div>
  );
};

export default Rating;