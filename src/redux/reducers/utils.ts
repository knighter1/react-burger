import moment from "moment";

export const formatOrderDate = (date: Date | null) => {
    const formats = {
        sameDay: '[Сегодня], HH:mm Z',
        lastDay: '[Вчера], HH:mm Z',
        sameElse: 'DD.MM.YYYY HH:ii Z'
    }

    return moment().calendar(date, formats);
}