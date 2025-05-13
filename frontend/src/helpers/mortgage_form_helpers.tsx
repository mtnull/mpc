// Converts float to formatted money string.
export const format_money_string = (money: number): string => `$${money.toLocaleString()}`;

// Removes commas from money string.
export const remove_commas = (val: string): string => val.replace(/,/g, "");
