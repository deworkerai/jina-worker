import nodeFetch from 'node-fetch';

export const crawl = async ({ params, stream }: any = {}) => {
  const { url, mode } = params as {
    url: string;
    mode?: 'standard' | 'json';
  };
  console.log('params: ', params);
  if (stream) {
    const rtn = await nodeFetch(`https://r.jina.ai/${url}`, {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream',
      },
    });

    return rtn.body;
  } else if (mode === 'json') {
    const rtn = await nodeFetch(`https://r.jina.ai/${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    return rtn.json();
  }

  const rtn = await nodeFetch(`https://r.jina.ai/${url}`, {
    method: 'GET',
  });

  return rtn.text();
};
