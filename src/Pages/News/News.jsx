import React from 'react';
import Cover from '../../Componets/Cover';
import { Helmet} from 'react-helmet-async'
const News = () => {
          return (
                    <div>   <Helmet>
                    <title>Language Learner | News</title>
                  </Helmet>
                              <Cover></Cover>
                    </div>
          );
};

export default News;