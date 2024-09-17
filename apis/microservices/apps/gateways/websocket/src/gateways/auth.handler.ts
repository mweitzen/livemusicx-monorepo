import { IncomingMessage } from 'http';

export const handleAllowRequest = (
  message: IncomingMessage,
  callback: (err: string | null | undefined, success: boolean) => void,
) => {
  callback(null, true);
};
