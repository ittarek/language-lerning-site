import React from 'react';

const Container = ({children}) => {
          return (
                    <div className='max-w-[2520px] mx-auto xl:px-4 md:px-10 sm:px-2 '>
                         {children}     
                    </div>
          );
};

export default Container;