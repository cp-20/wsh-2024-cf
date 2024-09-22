import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import jsesc from 'jsesc';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { SWRConfig, unstable_serialize } from 'swr';

import { authorApiClient } from '@wsh-2024/app/src/features/author/apiClient/authorApiClient';
import { bookApiClient } from '@wsh-2024/app/src/features/book/apiClient/bookApiClient';
import { episodeApiClient } from '@wsh-2024/app/src/features/episode/apiClient/episodeApiClient';
import { featureApiClient } from '@wsh-2024/app/src/features/feature/apiClient/featureApiClient';
import { rankingApiClient } from '@wsh-2024/app/src/features/ranking/apiClient/rankingApiClient';
import { releaseApiClient } from '@wsh-2024/app/src/features/release/apiClient/releaseApiClient';
import { ClientApp } from '@wsh-2024/app/src/index';
import { getDayOfWeekStr } from '@wsh-2024/app/src/lib/date/getDayOfWeekStr';

import { CLIENT_HTML_PATH } from '../../constants/paths';

const app = new Hono();

async function createInjectDataStr(path: string): Promise<Record<string, unknown>> {
  const json: Record<string, unknown> = {};

  if (path === '/') {
    const dayOfWeek = getDayOfWeekStr(new Date());
    const releases = await releaseApiClient.fetch({ params: { dayOfWeek } });
    json[unstable_serialize(releaseApiClient.fetch$$key({ params: { dayOfWeek } }))] = releases;
    const featureList = await featureApiClient.fetchList({ query: {} });
    json[unstable_serialize(featureApiClient.fetchList$$key({ query: {} }))] = featureList;
    const rankingList = await rankingApiClient.fetchList({ query: {} });
    json[unstable_serialize(rankingApiClient.fetchList$$key({ query: {} }))] = rankingList;
  }

  const matchBook = path.match(/\/books\/((?:[0-9a-z]|-)+)/);
  if (matchBook) {
    const bookId = matchBook[1] as string;
    const book = await bookApiClient.fetch({ params: { bookId } });
    json[unstable_serialize(bookApiClient.fetch$$key({ params: { bookId } }))] = book;
    const episodeList = await episodeApiClient.fetchList({ query: { bookId } });
    json[unstable_serialize(episodeApiClient.fetchList$$key({ query: { bookId } }))] = episodeList;
  }

  const matchEpisode = path.match(/\/books\/((?:[0-9a-z]|-)+)\/episodes\/((?:[0-9a-z]|-)+)/);
  if (matchEpisode) {
    const bookId = matchEpisode[1] as string;
    const episodeId = matchEpisode[2] as string;
    const episodeList = await episodeApiClient.fetchList({ query: { bookId } });
    json[unstable_serialize(episodeApiClient.fetchList$$key({ query: { bookId } }))] = episodeList;
    const episode = await episodeApiClient.fetch({ params: { episodeId } });
    json[unstable_serialize(episodeApiClient.fetch$$key({ params: { episodeId } }))] = episode;
  }

  if (path === '/search') {
    const books = await bookApiClient.fetchList({ query: {} });
    json[unstable_serialize(bookApiClient.fetchList$$key({ query: {} }))] = books;
  }

  const matchAuthor = path.match(/\/authors\/((?:[0-9a-z]|-)+)/);
  if (matchAuthor) {
    const authorId = matchAuthor[1] as string;
    const author = await authorApiClient.fetch({ params: { authorId } });
    json[unstable_serialize(authorApiClient.fetch$$key({ params: { authorId } }))] = author;
  }

  return json;
}

async function createHTML({
  body,
  injectData,
  styleTags,
}: {
  body: string;
  injectData: Record<string, unknown>;
  styleTags: string;
}): Promise<string> {
  const htmlContent = await fs.readFile(CLIENT_HTML_PATH, 'utf-8');

  const content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags)
    .replaceAll(
      '<script id="inject-data" type="application/json"></script>',
      `<script id="inject-data" type="application/json">${jsesc(injectData, {
        compact: true,
        isScriptContext: true,
        json: true,
        minimal: true,
      })}</script>`,
    );

  return content;
}

app.get('*', async (c) => {
  const injectData = await createInjectDataStr(c.req.path);
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <SWRConfig
          value={{
            fallback: injectData,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
          }}
        >
          <StaticRouter location={c.req.path}>
            <ClientApp />
          </StaticRouter>
        </SWRConfig>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, injectData, styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
