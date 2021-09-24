import {PromiseResult, RequiredValidationRule} from "../types";

const defaultMessage = 'This field is required.'

export async function requiredValidator(rule: RequiredValidationRule, value: string): Promise<PromiseResult> {

    const message = typeof rule === 'string' ? defaultMessage : rule.message ?? defaultMessage

    if(value == null) {
        throw new Error(message)
    }

    if(typeof value === 'string' && value == ""){
      throw new Error(message)
    }

    return
}
