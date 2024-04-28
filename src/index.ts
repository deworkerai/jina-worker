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
    const json = await rtn.json();
    console.log('response in json mode: ', json);
    return json;
  }

  const rtn = await nodeFetch(`https://r.jina.ai/${url}`, {
    method: 'GET',
  });
  const text = await rtn.text();
  console.log('response in standard mode: ', text);
  return text;
};
