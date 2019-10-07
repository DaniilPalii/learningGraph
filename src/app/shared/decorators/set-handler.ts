export function SetHandler<T>(
  handleSet: (value: T) => void
): (target: Object, key: string | symbol) => void { // Unused because of decorators can't access user object instance
  return (target: Object, key: string | symbol) => {
    let value = target[key] as T;

    Object.defineProperty(target, key, {
      get: () => value,
      set: (newValue: T) => {
        value = newValue;
        handleSet(value);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
