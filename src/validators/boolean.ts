import {BooleanValidationRule, PromiseResult} from "../types";

const defaultMessage = 'This field must be true or false.'

const allowedValues = [true, false, 'true', 'false']

export async function booleanValidator(rule: BooleanValidationRule, value: string): Promise<PromiseResult> {
    const message = typeof rule === 'string' ? defaultMessage : rule.message ?? defaultMessage
    if(!allowedValues.includes(value)){
        throw new Error(message)
    }
    return
}