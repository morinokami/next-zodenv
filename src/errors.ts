export class MissingEnvError extends ReferenceError {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, MissingEnvError.prototype)
  }
}

export class InvalidEnvError extends TypeError {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, InvalidEnvError.prototype)
  }
}
