import { useSetAtom } from 'jotai';
import React, { Suspense, useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

const LazyTerm = React.lazy(() =>
  fetch('/assets/constants/term.txt')
    .then((res) => res.text())
    .then((text) => {
      return { default: () => <>{text}</> };
    }),
);

const LazyContact = React.lazy(() =>
  fetch('/assets/constants/contact.txt')
    .then((res) => res.text())
    .then((text) => {
      return { default: () => <>{text}</> };
    }),
);

const LazyQuestion = React.lazy(() =>
  fetch('/assets/constants/question.txt')
    .then((res) => res.text())
    .then((text) => {
      return { default: () => <>{text}</> };
    }),
);

const LazyCompany = React.lazy(() =>
  fetch('/assets/constants/company.txt')
    .then((res) => res.text())
    .then((text) => {
      return { default: () => <>{text}</> };
    }),
);

const LazyOverview = React.lazy(() =>
  fetch('/assets/constants/overview.txt')
    .then((res) => res.text())
    .then((text) => {
      return { default: () => <>{text}</> };
    }),
);

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          <Suspense fallback={<div />}>
            <LazyTerm />
          </Suspense>
        </Text>
      </_Content>,
    );
  };

  const handleRequestToContactDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          <Suspense fallback={<div />}>
            <LazyContact />
          </Suspense>
        </Text>
      </_Content>,
    );
  };

  const handleRequestToQuestionDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          <Suspense fallback={<div />}>
            <LazyQuestion />
          </Suspense>
        </Text>
      </_Content>,
    );
  };

  const handleRequestToCompanyDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          <Suspense fallback={<div />}>
            <LazyCompany />
          </Suspense>
        </Text>
      </_Content>,
    );
  };

  const handleRequestToOverviewDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          <Suspense fallback={<div />}>
            <LazyOverview />
          </Suspense>
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
