import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }) => (
  <FixedSizeList height={600} itemCount={items.length} itemSize={50} width="100%">
    {({ index, style }) => <div style={style}>{items[index].name}</div>}
  </FixedSizeList>
);
