import z from 'zod';

export const verifyOtpRequestSchema = z.object({
  otp: z.string(),
});

export const verifyOtpResponseSchema = z.object({
  sessionId: z.string(),
  token: z.string(),
});

export type VerifyOtpRequest = z.infer<typeof verifyOtpRequestSchema>;
export type VerifyOtpResponse = z.infer<typeof verifyOtpResponseSchema>;
