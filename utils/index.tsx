
export const truncateString = (value: string, maxLength = 36) => {
    try {
        if (value && value.length > maxLength) {
            return `${value.slice(0, maxLength - 1)} ...`;
        } else {
            return value;
        }
    } catch (error) {
        console.log('Truncate string failed: ', error)
    }
};