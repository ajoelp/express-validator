import {BooleanValidationRule, CustomValidationRule, PromiseResult} from "../types";

const defaultMessage = 'Failed asserting true.'


export async function customValidator(rule: CustomValidationRule, value: any): Promise<PromiseResult> {
    const message = rule.message ?? defaultMessage
    const result = await rule.rule(value);

    if(!result){
      throw new Error(message)
    }

    return;
}
