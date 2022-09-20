import log from 'loglevel';

// status of the rpc message command or response
export type RPCMessageStatus = 'success' | 'failure';
// command sent to the worker, including data
export type RPCCommandMessage<TData> = {
  data: TData;
};

// response from the worker
export type RPCResponseMessage<TData> = {
  status: RPCMessageStatus;
  error?: any;
  data: TData;
};

/**
 * Runs a single-purpose worker, terminating the given worker
 * once it completes the given command. Data returned from the worker is
 * passed along via a Promise.
 *
 * @param url
 * @param message
 * @returns Promise<TData>
 */
export const runWorkerWithMessage = async <TMessage, TData>(
  // url: string,
  worker: Worker,
  message: TMessage
): Promise<TData> => {
  // create the worker
  // const workerURL = new URL('data-url:./../' + url, import.meta.url);
  // const worker = new Worker(workerURL, {
  //   type: 'module',
  // });

  // wrap the worker RPC exchange in a promise
  return new Promise((resolve, reject) => {
    // console.log('starting worker', workerURL, worker);
    worker.onmessage = (e: MessageEvent<RPCResponseMessage<TData>>) => {
      /**
       * If the worker response does not confront to the required format,
       * assume a failure and reject.
       *
       * If there is an explicit failure then reject, otherwise resolve with the recieved data
       */
      (!e.data || e.data.status) === 'failure'
        ? reject()
        : resolve(e.data.data);
      log.info('Terminating web worker');
      worker.terminate();
    };
    worker.postMessage(message);
  });
};
