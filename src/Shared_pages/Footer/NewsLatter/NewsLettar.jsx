import React from 'react';

import './NewsLatter.css'

const NewsLettar = () => {
          return (
                 
                    <div  className="newsletter  -mb-8 relative mx-auto">
                      <div className="text-center">
                        <h2 className="mb-4">Subscribe Our Newsletter</h2>
                        <div className="subscribe">
                          <input type="text" placeholder="Email" />
                          <button className="btn">Subscribe</button>
                        </div>
                      </div>
                    </div>
                 
          );
};

export default NewsLettar;