import {NumberValidationRule, PromiseResult} from "../types";

const defaultMessage = 'This field must be a number.'

export async function numberValidator(rule: NumberValidationRule, value: any): Promise<PromiseResult> {
    const message = typeof rule === 'string' ? defaultMessage : rule.message ?? defaultMessage
    if(isNaN(value)){
        throw new Error(message)
    }
    return
}