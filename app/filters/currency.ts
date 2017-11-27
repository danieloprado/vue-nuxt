export default function(value: number, opt?: string): string {
  const symbol = opt === 'no-symbol' ? '' : opt || 'R$';

  try {
    if (typeof value === 'string') {
      value = Number(value);
    }

    return `${symbol} ${value.toFixed(2).replace('.', ',')}`.trim();
  } catch (err) {
    return `${symbol} 0,00`.trim();
  }
}
