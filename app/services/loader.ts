let loaderHandler: (show: boolean) => void = null,
  promises: Promise<any>[] = [];

let emitTimeout: number;

const callHandlers = () => {
  clearTimeout(emitTimeout);

  if (promises.length) {
    loaderHandler(promises.length > 0);
    return;
  }

  emitTimeout = setTimeout(() => loaderHandler(promises.length > 0), 500);
};

export function addHandler(handler: (show: boolean) => void): void {
  if (typeof handler !== 'function') throw new Error('Loader handler must be a func');
  loaderHandler = handler;
}

export function fromPromise<T>(promise: Promise<T>): Promise<T> {
  if (Array.isArray(promise)) {
    promise = Promise.all(promise) as any;
  }

  promises.push(promise);
  promise.then(() => {
    const index = promises.indexOf(promise);
    promises.splice(index, 1);

    callHandlers();
  });

  callHandlers();
  return promise;
}
