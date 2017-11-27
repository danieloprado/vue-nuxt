let loginComponent: (step: string) => Promise<boolean> = null;

export function addLoginHandler(handler: (step: string) => Promise<boolean>): void {
  if (typeof handler !== 'function') throw new Error('Login handler must be a func');
  loginComponent = handler;
}

export function openLogin(): Promise<boolean> {
  if (!loginComponent) throw new Error('Login handler is not set');
  return loginComponent('login');
}

export function openRegistration(): Promise<boolean> {
  if (!loginComponent) throw new Error('Login handler is not set');
  return loginComponent('registration');
}

export function login(email: string, password: string): Promise<void> {
  console.log(email, password);
  return new Promise(resolve => setTimeout(resolve, 3000));
}

export function registration(model: any): Promise<void> {
  console.log(model);
  return new Promise(resolve => setTimeout(resolve, 3000));
}
