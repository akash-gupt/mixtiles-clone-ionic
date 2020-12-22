export class DatabaseErrors extends Error {
  public static isUniqueConstraintViolation(error) {
    return 'QueryFailedError' === error.name && 23505 == error.code;
  }
}
