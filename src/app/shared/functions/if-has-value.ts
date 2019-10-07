export function ifHasValue<TObject extends Object, TResult>(
  object: TObject,
  thanDo: (object: TObject) => TResult
): TResult {
  if (object != null) {
    return thanDo(object);
  }
}
