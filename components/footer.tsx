import { APP_NAME } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t'>
      <div className='p-5 flex-center'>
        <span className='mr-1'>{currentYear}</span>  
        <span className='mr-1'>{APP_NAME}.</span> 
        <span>All Rights reserved.</span> 
      </div>
    </footer>
  );
};

export default Footer;