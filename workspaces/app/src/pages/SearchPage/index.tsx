import { Suspense, useCallback, useEffect, useId, useState } from 'react';

import { useBookList } from '../../features/book/hooks/useBookList';
import { Box } from '../../foundation/components/Box';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { Input } from './internal/Input';
import { SearchResult } from './internal/SearchResult';

let timeout: NodeJS.Timeout;

const SearchPage: React.FC = () => {
  const { data: books } = useBookList({ query: {} });

  const searchResultsA11yId = useId();

  const [isClient, setIsClient] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [deferredKeyword, setDeferredKeyword] = useState(keyword);

  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setDeferredKeyword(event.target.value);
      }, 200);
    },
    [setKeyword],
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box px={Space * 2}>
      <Input disabled={!isClient} onChange={onChangedInput} />
      <Box aria-labelledby={searchResultsA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text color={Color.MONO_100} id={searchResultsA11yId} typography={Typography.NORMAL20} weight="bold">
          検索結果
        </Text>
        {deferredKeyword !== '' && <SearchResult books={books} keyword={deferredKeyword} />}
      </Box>
    </Box>
  );
};

const SearchPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
};

export { SearchPageWithSuspense as SearchPage };
