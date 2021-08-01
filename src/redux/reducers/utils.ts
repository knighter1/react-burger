import moment from "moment";

export const formatOrderDate = (date: Date | null): string =>
{
    if (!date)
        return "";

    const formats = {
        sameDay: '[Сегодня], HH:mm Z',
        lastDay: '[Вчера], HH:mm Z',
        lastWeek: 'DD.MM.YYYY HH:mm Z',
        sameElse: 'DD.MM.YYYY HH:mm Z'
    }

    return moment(new Date(date)).calendar(formats)
}