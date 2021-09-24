import {
    BooleanRule, DateRule, EmailRule,
    FieldTypes, MaxRule, MinRule,
    NullableRule, NumberRule,
    RequiredRule,
    RulesMethod, StringRule,
    ValidationSchema
} from "./types";
import get from 'lodash.get'
import {requiredValidator} from "./validators/required";
import {booleanValidator} from "./validators/boolean";
import {nullableValidator} from "./validators/nullable";
import {minValidator} from "./validators/min";
import {maxValidator} from "./validators/max";
import {dateValidator} from "./validators/date";
import {emailValidator} from "./validators/email";
import {numberValidator} from "./validators/number";
import {stringValidator} from "./validators/string";

const rulesFactory: Record<string, RulesMethod> = {
    [RequiredRule]: requiredValidator,
    [BooleanRule]: booleanValidator,
    [NullableRule]: nullableValidator,
    [MinRule]: minValidator,
    [MaxRule]: maxValidator,
    [DateRule]: dateValidator,
    [EmailRule]: emailValidator,
    [NumberRule]: numberValidator,
    [StringRule]: stringValidator
}

const makeValidationMiddleware = (field: FieldTypes, validationRules: ValidationSchema) => {
    return async (request: any, _response: any, next: any) => {
        const messages: Record<string, string> = {}

        for (const [key, rules] of Object.entries(validationRules)) {
            const fieldResult = get(request, `${field}.${key}`)
            for (const rule of rules) {
                const type = typeof rule === 'string' ? rule : rule.type
                const factoryMethod = rulesFactory[type]

                if (!factoryMethod) {
                    console.warn(`No factory method for ${type} defined`)
                    continue
                }

                try {
                    const result = await factoryMethod(rule, fieldResult)
                    if(result?.bail){
                        break
                    }
                } catch (e){
                    messages[key] = e.message
                    break
                }

            }
        }

        request.messageBag = messages
        next()
    }
}

const buildMiddleware = (field: FieldTypes) => {
    return (rules: ValidationSchema) => makeValidationMiddleware(field, rules)
}

export const query = buildMiddleware('query')
export const body = buildMiddleware('body')
export const params = buildMiddleware('params')

export const validationResponseMiddleware = (req: any, res: any, next: any) => {
    if(req.messageBag && Object.keys(req.messageBag).length > 0){
        return res.status(400).json({
            error: 'validation-error',
            message: 'Validation Error',
            messages: req.messageBag
        })
    }
    next()
}
