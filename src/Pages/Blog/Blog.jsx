import React from 'react';
import Cover from '../../Componets/Cover';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
          return (
                    <div>
                     <Helmet>
        <title>Language Learner | Blog</title>
      </Helmet>
                              <Cover></Cover>
                    </div>
          );
};

export default Blog;