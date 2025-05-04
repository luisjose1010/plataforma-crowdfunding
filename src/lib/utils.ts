export type GenericObject = Record<string | number | symbol, unknown>;

export function isKeyOf<T extends GenericObject>(
  obj: T,
  key: string | number | symbol,
): key is keyof T {
  return key in obj;
}

export function isValueOf<T extends GenericObject>(obj: T, value: string) {
  return Object.values(obj).includes(value);
}

export function findKeyByValue<
  T extends GenericObject,
  U extends GenericObject,
>(
  objectWithValue: T,
  valueToFind: string | undefined,
  objectToCheckKey: U | null | undefined,
): keyof U | undefined {
  if (valueToFind == null) return;
  if (objectToCheckKey == null) return;

  const foundKey = Object.keys(objectWithValue).find(
    (key) => objectWithValue[key as keyof T] === valueToFind,
  );

  if (foundKey == null) return;

  if (isKeyOf(objectToCheckKey, foundKey)) {
    return foundKey as keyof U;
  }

  return;
}
