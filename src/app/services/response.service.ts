
export abstract class ResponseService {
  abstract setStatus(code: number, message?: string): void;
}
