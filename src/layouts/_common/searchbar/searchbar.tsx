'use client';

import React, { useState, useMemo, memo, useCallback, useEffect } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { m } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import _toLower from 'lodash/toLower';
import _round from 'lodash/round';
import _orderBy from 'lodash/orderBy';
import List from '@mui/material/List';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useRouter } from 'src/routes/hooks';
import SearchNotFound from 'src/components/search-not-found';
import { IResultItem } from 'src/types/search';
import { PATH_PAGE } from 'src/routes/paths';
import { useDebounce } from 'src/hooks/use-debounce';
import { httpPostSearch } from 'src/services/search';
import { varFade } from 'src/components/animate';
import minimalRequestTimer from 'src/utils/minimal-request-timer';
import ResultItem from './result-item';
import Loader from './loader';

interface Props {
  iconSize?: 'small' | 'medium' | 'large';
}

const StyledIconBox: any = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.standard,
  }),
  '& svg.iconify, .MuiTypography-root': {
    color: theme.palette.grey[300],
  },
  '&:hover': {
    '& svg.iconify, .MuiTypography-root': {
      color: theme.palette.grey[100],
    },
  },
}));

const variantsContainer = {
  hidden: varFade().in.initial,
  show: {
    ...varFade().in.animate,
    transition: { ...varFade().in.animate.transition, staggerChildren: 0.05 }
  },
};

const variantsVarFadeIn = {
  hidden: varFade().inUp.initial,
  show: varFade().inUp.animate
};

function Searchbar({ iconSize = 'medium' }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const search = useBoolean();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultItems, setResultItems] = useState<IResultItem[]>([]);
  const debouncedQuery = useDebounce(_toLower(String(searchQuery).trim()), 500);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      setResultItems([]);

      try {
        const [productResultItems] = await Promise.all([
          httpPostSearch({ text: debouncedQuery }),
          minimalRequestTimer(1000),
        ]);

        setResultItems(productResultItems);
      } catch (err) {
        console.log('err', err);
      } finally {
        setLoading(false);
      }
    }

    if (debouncedQuery.length > 0) {
      fetchSearch();
    }
  }, [debouncedQuery]);

  const handleClose = useCallback(() => {
    search.onFalse();

    setSearchQuery('');
    setLoading(false);
    setResultItems([]);
  }, [search]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (path: string) => {
      handleClose();
      return path.includes('http') ? window.open(path) : router.push(path);
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
  }, [setResultItems]);

  const resultItemsMemo = useMemo(() => {
    if (resultItems.length === 0) {
      return null;
    }

    const matchedResultItems = resultItems.map(({ alias, code, title }) => {
      const partsTitle = parse(title, match(title, searchQuery, { insideWords: true, findAllOccurrences: true }));
      const partsCode = parse(String(code), match(String(code), searchQuery, { insideWords: true, findAllOccurrences: true }));
      const matchTitles = partsTitle.filter((i) => i.highlight);
      const matchCodes = partsCode.filter((i) => i.highlight);

      return { alias, code, title, partsTitle, partsCode, score: _round(matchTitles.length + matchCodes.length) };
    });

    const sortedResultItems = _orderBy(matchedResultItems, 'score', ['desc']);

    return (
      <m.div variants={variantsContainer} initial="hidden" animate="show">
        <List disablePadding>
          {sortedResultItems.map(({ alias, code, title }) => {
            const path = `${PATH_PAGE.product(alias)}`;
            const partsTitle = parse(title, match(title, searchQuery, { insideWords: true, findAllOccurrences: true }));
            const partsCode = parse(String(code), match(String(code), searchQuery, { insideWords: true, findAllOccurrences: true }));

            return (
              <m.div variants={variantsVarFadeIn} key={code}>
                <ResultItem
                  path={path}
                  title={partsTitle}
                  key={`${title}${path}`}
                  code={partsCode}
                  onClickItem={() => handleClick(path)}
                />
              </m.div>
            );
          })}
        </List>
      </m.div>
    );
  }, [resultItems]);

  const renderButton = (
    <StyledIconBox onClick={search.onTrue}>
      <IconButton disableRipple size={iconSize}>
        <Iconify icon='solar:magnifer-outline' width={20} />
      </IconButton>

      <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant='caption'>Пошук</Typography>
    </StyledIconBox>
  );

  const scrollbarHeightMemo = useMemo(() => {
    if (debouncedQuery.length > 0 && !resultItems.length && !isLoading) {
      return '146px';
    }

    if (isLoading && debouncedQuery.length > 0) {
      return '98px';
    }

    if (debouncedQuery.length === 0) {
      return '0px';
    }

    return `${resultItems.length >= 6 ? '400px' : `${_round((resultItems.length * 58) + 24 + 24)}px` }`;
  }, [isLoading, debouncedQuery, resultItems]);

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'unset',
          },
        }}
        sx={{
          [`& .${dialogClasses.container}`]: {
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{
          p: 3,
          borderBottom: debouncedQuery.length > 0 || isLoading ? `solid 1px ${theme.palette.divider}` : 'none',
        }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Введіть артикул або назву моделі"
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="solar:magnifer-outline" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{
              sx: { typography: 'h6' },
            }}
            sx={{
              input: {
                paddingLeft: theme.spacing(2),
                '&::placeholder': {
                  color: theme.palette.grey['500'],
                },
              },
            }}
          />
        </Box>

        <Scrollbar sx={{ height: scrollbarHeightMemo, transition: 'all 0.2s ease-out' }}>
          <Box sx={{ p: 3 }}>
            {isLoading && (<Loader />)}
            {searchQuery.length > 0 && !resultItems.length && !isLoading && (
              <SearchNotFound query={searchQuery} sx={{ py: 3 }} />)
            }
            {!isLoading && resultItems.length > 0 && resultItemsMemo}
          </Box>
        </Scrollbar>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
