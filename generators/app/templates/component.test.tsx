import { render } from '@/test/test-utils';

import { <%= name %> } from '../<%= name %>';

describe('<%= name %>', () => {
  render({ui: <<%= name %> />});
})