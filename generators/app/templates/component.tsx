import React from 'react';

import './<%= name %>.css';

export function <%= name %>(): React.ReactElement {
  return <div className='<%= className %>'><%= name %></div>;
}