import React, { useState } from 'react';
import { FlatList, ListRenderItem, ViewStyle } from 'react-native';
import { PaginationButton } from '../PaginationButton';
import { BF_DEFAULT_PAGINATION } from '../../utils/constants';
import { ListRenderItemInfo } from 'react-native';
import { HasKey } from '../Carousels/FlatCarousel';
import { LineSpacer } from '../Layout/Layout';

interface BFPaginatedListProps<T extends HasKey> {
  items: T[];
  style?: ViewStyle;
  initialItems?: number;
  pageSize?: number;
  itemHeight: number;
  contentType: 'clubs' | 'workouts' | 'programs' | 'nutrition' | 'lifestyle';
  showSeparator?: boolean;
  renderItem: ListRenderItem<T>;
}

interface PaginationButtonType extends HasKey {
  key: string;
  isPagination: boolean;
}

const isPaginationButton = (
  item: ListRenderItemInfo<any | PaginationButtonType>
): item is ListRenderItemInfo<PaginationButtonType> => {
  return item.item.isPagination;
};

const BFPaginatedList = <T extends HasKey>({
  contentType,
  style,
  items,
  pageSize = BF_DEFAULT_PAGINATION.DEFAULT.pageSize,
  initialItems = BF_DEFAULT_PAGINATION.DEFAULT.initialItems,
  itemHeight,
  showSeparator,
  renderItem
}: BFPaginatedListProps<T>) => {
  const [page, setPage] = useState<number>(0);

  const paginatedItems: (T | PaginationButtonType)[] = items.slice(
    0,
    page * pageSize + initialItems
  );

  paginatedItems.push({
    key: 'paginationButtonKey',
    isPagination: true
  });

  return (
    <FlatList
      style={style}
      data={paginatedItems}
      keyExtractor={(item) => item.key}
      ItemSeparatorComponent={() => {
        if (showSeparator) return <LineSpacer marginVertical={8} />;
        return <></>;
      }}
      getItemLayout={(_, index: number) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index: index
      })}
      renderItem={(item) => {
        if (isPaginationButton(item)) {
          return (
            <PaginationButton
              key={item.item.key}
              hide={items.length <= initialItems}
              hasMore={items.length > paginatedItems.length}
              content={contentType}
              onPress={() => {
                setPage(page + 1);
              }}
            />
          );
        }
        return renderItem((item as any) as ListRenderItemInfo<T>);
      }}
    />
  );
};

export default BFPaginatedList;
