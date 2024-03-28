
export const formattedData = (isoDateString: string) => {
    const date = new Date(isoDateString);

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', weekday: 'short', };
    const createDate = date.toLocaleDateString('en-US', options);
    return { createDate };
}