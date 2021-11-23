import {query} from "./middleware";

describe('middleware', () => {
    it('will create and run the query middleware', async () => {
        const middleware = query({
            'email': ['required'],
            'canBeNullable': ['nullable', { type: 'boolean' }],
            'mustRequireBoolean': ['boolean'],
            'willValidateNullableBoolean': ['nullable', 'boolean'],
        })

        const request: any = {
            query: {
                willValidateNullableBoolean: 'blah'
            }
        }

        const nextFunction = jest.fn()

        await middleware(request, {}, nextFunction)

        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(request.messageBag).toEqual({
            email: expect.any(String),
            mustRequireBoolean: expect.any(String),
            willValidateNullableBoolean: expect.any(String)
        })
    })

    describe('custom', () => {
        it('will pass with custom rule', async () => {
          const middleware = query({
            'email': ['required', { type: 'custom', rule: () => Promise.resolve(true) }]
          })

          const request: any = {
            query: {
              email: 'test@example.com'
            }
          }

          const nextFunction = jest.fn();

          await middleware(request, {}, nextFunction)

          expect(nextFunction).toHaveBeenCalledTimes(1);
          expect(request.messageBag).toEqual({});
        })

        it('will fail with custom rule', async () => {
          const message = 'This is a custom error message';
          const middleware = query({
            'email': ['required', { type: 'custom', rule: () => Promise.resolve(false), message }]
          })

          const request: any = {
            query: {
              email: 'test@example.com'
            }
          }

          const nextFunction = jest.fn();

          await middleware(request, {}, nextFunction)

          expect(nextFunction).toHaveBeenCalledTimes(1);
          expect(request.messageBag).toEqual({
            email: message
          });
        })
    })
})
