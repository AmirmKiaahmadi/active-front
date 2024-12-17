function formatDurationInJalali(seconds: number): string {
	const days = Math.floor(seconds / (24 * 3600));
	seconds %= 24 * 3600;
	const hours = Math.floor(seconds / 3600);
	seconds %= 3600;
	const minutes = Math.floor(seconds / 60);

	// Helper function to convert English numbers to Persian
	const toPersianNumber = (num: number): string => {
		const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
		return num
			.toString()
			.split('')
			.map((digit) => persianDigits[parseInt(digit, 10)] || digit)
			.join('');
	};

	const parts: string[] = [];
	if (days > 0) parts.push(`${toPersianNumber(days)} روز`);
	if (hours > 0) parts.push(`${toPersianNumber(hours)} ساعت`);
	if (minutes > 0) parts.push(`${toPersianNumber(minutes)} دقیقه`);

	return parts.length > 0 ? parts.join(' و ') : '۰ دقیقه';
}

export default formatDurationInJalali;
