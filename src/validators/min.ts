import {MinValidationRule, PromiseResult} from "../types";

const defaultMessage = (value: number) => `This field must be greater than ${value}`

export async function minValidator(rule: MinValidationRule, value: any): Promise<PromiseResult> {
    const message = rule.message ?? defaultMessage(value)

    if(typeof value === 'number' && value < rule.value){
        throw new Error(message)
    }

    if(typeof value === 'string' && value.length < rule.value){
        throw new Error(message)
    }

    return
}