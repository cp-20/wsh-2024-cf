import styled from 'styled-components';

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';

const _Container = styled.div`
  position: relative;
  container-type: normal;
`;

const _Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  --page-count-per-view: 2;
  @container (width < 708px) {
    --page-count-per-view: 1;
  }
  --width: calc(100cqw / var(--page-count-per-view));
  --page-height: calc(var(--width) / (1075 / 1518));
  height: clamp(500px, var(--page-height), 650px);
  overflow: hidden;
`;

type Props = {
  episodeId: string;
};

export const ComicViewer: React.FC<Props> = ({ episodeId }) => {
  return (
    <_Container>
      <_Wrapper>
        <ComicViewerCore episodeId={episodeId} />
      </_Wrapper>
    </_Container>
  );
};
