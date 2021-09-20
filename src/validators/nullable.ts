import {NullableValidationRule, PromiseResult} from "../types";

export async function nullableValidator(_rule: NullableValidationRule, value: string): Promise<PromiseResult> {
    if(value == null) {
        return { bail: true }
    }
    return
}