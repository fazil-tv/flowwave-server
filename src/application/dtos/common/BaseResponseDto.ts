export class BaseResponseDto<T> {
  constructor(
    public readonly success: boolean,
    public readonly data: T | null,
    public readonly message: string,
    public readonly statusCode: number = 200,
    public readonly timestamp: number = Date.now()
  ) {}

  static success<T>(data: T, message: string = 'Operation successful'): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      true,
      data,
      message,
      200
    );
  }

  static error<T>(message: string, statusCode: number = 400): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      false,
      null,
      message,
      statusCode
    );
  }

  static notFound(message: string = 'Resource not found'): BaseResponseDto<null> {
    return new BaseResponseDto(
      false,
      null,
      message,
      404
    );
  }

  static unauthorized(message: string = 'Unauthorized'): BaseResponseDto<null> {
    return new BaseResponseDto(
      false,
      null,
      message,
      401
    );
  }

  static badRequest(message: string): BaseResponseDto<null> {
    return new BaseResponseDto(
      false,
      null,
      message,
      400
    );
  }

  static forbidden(message: string = 'Forbidden'): BaseResponseDto<null> {
    return new BaseResponseDto(
      false,
      null,
      message,
      403
    );
  }

  static serverError(message: string = 'Internal Server Error'): BaseResponseDto<null> {
    return new BaseResponseDto(
      false,
      null,
      message,
      500
    );
  }
}
