import { EmailValidationRule, PromiseResult } from "../types";

const defaultMessage = 'This field must be a valid email'
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export async function emailValidator(rule: EmailValidationRule, value: string): Promise<PromiseResult> {
    const message = typeof rule === 'string' ? defaultMessage : rule.message ?? defaultMessage
    const regex = typeof rule === 'string' ? emailRegex : rule.regex ?? emailRegex
    if(!regex.test(String(value))){
        throw new Error(message)
    }
    return
}