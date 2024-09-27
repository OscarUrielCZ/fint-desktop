export function numberWithCommas(x: number | string) {
    if (typeof x === 'string')
        x = Number(x);
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}