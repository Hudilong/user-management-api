type JsonValue =
    | string
    | number
    | boolean
    | { [key: string]: JsonValue }
    | JsonValue[];

const snakeToCamel = (str: string): string =>
    str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
    );

export const transformKeysToCamelCase = (obj: JsonValue): JsonValue => {
    if (Array.isArray(obj)) {
        return obj.map((v) => transformKeysToCamelCase(v));
    } else if (obj && typeof obj === "object" && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [snakeToCamel(key)]: transformKeysToCamelCase(
                    (obj as { [key: string]: JsonValue })[key]
                ),
            }),
            {} as { [key: string]: JsonValue }
        );
    }
    return obj;
};

const camelToSnake = (str: string): string =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const transformKeysToSnakeCase = (obj: JsonValue): JsonValue => {
    if (Array.isArray(obj)) {
        return obj.map((v) => transformKeysToSnakeCase(v));
    } else if (obj && typeof obj === "object" && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelToSnake(key)]: transformKeysToSnakeCase(
                    (obj as { [key: string]: JsonValue })[key]
                ),
            }),
            {} as { [key: string]: JsonValue }
        );
    }
    return obj;
};
