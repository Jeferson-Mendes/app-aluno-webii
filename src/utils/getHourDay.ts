
export function getHourDay(): string {
    const date = new Date();

    const hour = date.getHours();

    if (hour <= 12) {
        return 'Bom Dia';
    }

    if (hour > 12 && hour < 18) {
        return 'Boa Tarde';
    }

    if (hour > 18 && hour < 23) {
        return 'Boa Noite';
    }

    return 'Bom dia';
}