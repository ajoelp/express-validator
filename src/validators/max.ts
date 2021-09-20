import {MaxValidationRule, PromiseResult} from "../types";

const defaultMessage = (value: number) => `This field must be less than ${value}`

export async function maxValidator(rule: MaxValidationRule, value: any): Promise<PromiseResult> {
    const message = rule.message ?? defaultMessage(value)

    if(typeof value === 'number' && value > rule.value){
        throw new Error(message)
    }

    if(typeof value === 'string' && value.length > rule.value){
        throw new Error(message)
    }

    return
}