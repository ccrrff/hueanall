import { z } from 'zod'

const phoneRegex = /^(010|011|016|017|018|019)[0-9]{3,4}[0-9]{4}$|^0[2-9][0-9]{1,2}[0-9]{3,4}[0-9]{4}$|^\d{4}-\d{4}$/

export const consultationSchema = z.object({
  customer_name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  customer_phone: z
    .string()
    .regex(phoneRegex, '올바른 전화번호를 입력해주세요 (예: 010-1234-5678)'),
  consultation_type: z.enum(['general', 'director_specific', 'quick', 'kakao']).refine(
    (v) => ['general', 'director_specific', 'quick', 'kakao'].includes(v),
    { message: '상담 유형을 선택해주세요' }
  ),
  director_id: z.string().uuid().optional().nullable(),
  message: z.string().max(500, '메시지는 500자 이내로 입력해주세요').optional(),
  privacy_agreed: z.boolean().refine((v) => v === true, '개인정보 처리방침에 동의해주세요'),
})

export const reviewSchema = z.object({
  customer_name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  director_id: z.string().uuid().optional().nullable(),
  rating: z
    .number()
    .int()
    .min(1, '별점을 선택해주세요')
    .max(5, '별점은 1~5 사이여야 합니다'),
  content: z.string().min(10, '후기는 10자 이상 입력해주세요').max(1000, '후기는 1000자 이내로 입력해주세요'),
  image_urls: z.array(z.string().url()).max(5).optional(),
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>
export type ReviewFormValues = z.infer<typeof reviewSchema>
