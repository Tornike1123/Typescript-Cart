const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
	currency: "Eur",
	style: "currency",
});

export const formatCurrency = (number: number) => {
	return CURRENCY_FORMATTER.format(number);
};
