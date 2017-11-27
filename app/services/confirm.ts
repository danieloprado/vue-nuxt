import marked from 'marked';

let confirmComponent: (message: string) => Promise<boolean> = null;

export function addHandler(handler: (message: string) => Promise<boolean>): void {
  if (typeof handler !== 'function') throw new Error('Confirm handler must be a func');
  confirmComponent = handler;
}

export function show(message: string): Promise<boolean> {
  if (!confirm) throw new Error('Confirm handler is not set');
  return confirmComponent(marked(message));
}
