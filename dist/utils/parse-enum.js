export function parseEnum(enumType, label) {
    return (value) => {
        const enumValues = Object.values(enumType);
        if (!enumValues.includes(value)) {
            throw new Error(`❌ "${value}" is not a valid ${label}. Allowed values: ${enumValues.join(', ')}`);
        }
        return value;
    };
}
