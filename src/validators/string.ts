import {PromiseResult, StringValidationRule} from "../types";

const defaultMessage = 'This field must be a string.'

export async function stringValidator(rule: StringValidationRule, value: any): Promise<PromiseResult> {
    const message = typeof rule === 'string' ? defaultMessage : rule.message ?? defaultMessage

    if(typeof value !== 'string'){
        throw new Error(message)
    }

    return
}