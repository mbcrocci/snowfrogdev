export abstract class Result<T, E> {
  constructor(protected value: T | E) {}

  isOk(): this is Ok<T> {
    return this instanceof Ok;
  }

  isErr(): this is Err<E> {
    return !this.isOk();
  }

  contains(value: T): boolean {
    return this.isOk() && this.value === value;
  }

  containsErr(err: E): boolean {
    return this.isErr() && this.value === err;
  }

  map<U>(f: (value: T) => U): Result<U, E> {
    return this.isOk() ? new Ok(f(this.value as T)) : new Err((<Err<E>>this).value as E);
  }

  mapOr<U>(defaultValue: U, f: (value: T) => U): U {
    return this.isOk() ? f(this.value as T) : defaultValue;
  }

  mapOrElse<U>(defaultValue: (e: E) => U, f: (value: T) => U): U {
    return this.isOk() ? f(this.value as T) : defaultValue((<Err<E>>this).value as E);
  }

  and<U>(res: Result<U, E>): Result<U, E> {
    return this.isOk() ? res : new Err((<Err<E>>this).value as E);
  }
}

export class Ok<T> extends Result<T, any> {
  constructor(value: T) {
    super(value);
  }
}

export class Err<E> extends Result<any, E> {
  constructor(value: E) {
    super(value);
  }
}
