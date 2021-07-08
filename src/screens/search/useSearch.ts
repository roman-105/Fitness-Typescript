import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SEARCH_RESULT_TYPES } from '../../store/models/full-search/fullSearchModel';
import formatMessage from 'format-message';
import { EntryCollection } from 'contentful';
import { IFullSearchContent } from '../../store/models/full-search/fullSearchAdapter';

export interface ISelectedContent {
  title: string;
  data: {
    type: SEARCH_RESULT_TYPES;
    values: any[] | EntryCollection<any> | undefined;
    contentType: keyof IFullSearchContent;
    isShowingAll?: boolean;
  }[];
}

const useSearch = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<ISelectedContent | null>(null);
  const { appResults, contentResults } = useSelector((state) => state.fullSearchModel);
  const isLoading = useSelector((state) => state.loading.effects.fullSearchModel.search);
  const query = useSelector((state) => state.fullSearchModel.query);

  const dispatch: Dispatch = useDispatch();
  const listRef = useRef<any>();

  const handleClearQuery = useCallback(() => {
    setIsScrolling(false);
    setSelectedContent(null);
  }, []);

  const handleClearSelectedContent = useCallback(() => {
    setSelectedContent(null);
  }, []);

  const combinedData = useMemo(() => {
    handleClearSelectedContent();
    const array = [];
    if (!appResults && !contentResults) return null;

    if (appResults) {
      if (appResults.length) {
        array.push({
          type: SEARCH_RESULT_TYPES.BLOCK_HEADER,
          title: formatMessage('App results')
        });
        array.push({
          type: SEARCH_RESULT_TYPES.APP_RESULTS,
          key: 'app-results-container',
          values: appResults
        });
      }
    }

    if (contentResults) {
      if (Object.values(contentResults).some((result) => result && result.length > 0)) {
        array.push({
          type: SEARCH_RESULT_TYPES.BLOCK_HEADER,
          title: formatMessage('Training and blog results')
        });
      }

      Object.keys(contentResults).forEach((contentResultKey: string) => {
        const key = contentResultKey as keyof IFullSearchContent;
        if (contentResults[key].length > 0) {
          array.push({
            type: SEARCH_RESULT_TYPES.CONTENT_HEADER,
            title: key,
            onSeeAll:
              contentResults[key].length > 3
                ? () => {
                    listRef.current.scrollToOffset({ animated: true, offset: 0 });
                    setSelectedContent({
                      title: key,
                      data: [
                        {
                          type: SEARCH_RESULT_TYPES.CONTENT_RESULTS_PAGINATED,
                          isShowingAll: true,
                          contentType: key,
                          values: contentResults[key]
                        }
                      ]
                    });
                  }
                : undefined,
            results: contentResults[key]
          });
          array.push({
            type: SEARCH_RESULT_TYPES.CONTENT_RESULTS,
            contentType: key,
            values: contentResults[key].slice(0, 3) ?? []
          });
        }
      });
    }

    return array;
  }, [appResults, contentResults, setSelectedContent, handleClearSelectedContent]);

  // Clear query state when unmount component
  useEffect(() => {
    return () => {
      dispatch.fullSearchModel.setQuery('');
      dispatch.fullSearchModel.setResults({ contentResults: null, appResults: null });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isScrolling,
    combinedData,
    isLoading,
    selectedContent,
    listRef,
    query,
    setIsScrolling,
    handleClearSelectedContent,
    handleClearQuery
  };
};

export default useSearch;
