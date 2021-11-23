export type FieldTypes = 'query' | 'body' | 'params'

type RuleWithMessage<T extends string, B = {}> = { type: T, message?: string } & B
type Rule<T extends string, B = {}> = T | RuleWithMessage<T,  B>

export const RequiredRule = 'required' as const
export type RequiredValidationRule = Rule<typeof RequiredRule>

export const StringRule = 'string' as const
export type StringValidationRule = Rule<typeof StringRule>

export const NumberRule = 'number' as const
export type NumberValidationRule = Rule<typeof NumberRule>

export const MinRule = 'min' as const
export type MinValidationRule = RuleWithMessage<typeof MinRule, { value: number }>

export const MaxRule = 'max' as const
export type MaxValidationRule = RuleWithMessage<typeof MaxRule, { value: number }>

export const BooleanRule = 'boolean' as const
export type BooleanValidationRule = Rule<typeof BooleanRule>

export const EmailRule = 'email' as const
export type EmailValidationRule = Rule<typeof EmailRule, { regex?: RegExp }>

export const DateRule = 'date' as const
export type DateValidationRule = Rule<typeof DateRule>

export const NullableRule = 'nullable' as const
export type NullableValidationRule = typeof NullableRule

export const CustomRule = 'custom' as const
export type CustomValidationRule = RuleWithMessage<typeof CustomRule, {rule: ((value: string, request: any) => Promise<boolean>)}>

export type ValidationRules = RequiredValidationRule | StringValidationRule | MinValidationRule | MaxValidationRule | BooleanValidationRule | EmailValidationRule | DateValidationRule | NullableValidationRule | NumberValidationRule | CustomValidationRule

export type ValidationSchema = {
    [key: string]: ValidationRules[]
}

export type PromiseResult = undefined | { bail?: boolean }
export type RulesMethod = (rule: ValidationRules, value: any, data: Record<string, any>) => Promise<PromiseResult>
