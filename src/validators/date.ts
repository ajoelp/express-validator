import {BooleanValidationRule, PromiseResult} from "../types";
import isValid from 'date-fns/isValid'

const defaultMessage = 'This field must be a valid date'

export async function dateValidator(rule: BooleanValidationRule, value: string): Promise<PromiseResult> {
    const message = typeof rule === 'string' ? defaultMessage : rule.message ?? defaultMessage
    if(!isValid(value)){
        throw new Error(message)
    }
    return
}