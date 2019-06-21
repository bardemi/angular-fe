/* eslint-disable space-before-function-paren */

// eslint-disable-next-line func-style
export function log(
    target: any,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value

    // ... ist ein Spread-Operator
    descriptor.value = function(...args: Array<any>) {
        const klasseAsString = target.toString()
        const positionColon = klasseAsString.indexOf(':')
        const klassenname =
            positionColon === -1
                ? klasseAsString
                : klasseAsString.substring(0, positionColon)

        if (args.length === 0) {
            console.log(`> ${klassenname}.${key as string}()`)
        } else {
            console.log(`> ${klassenname}.${key as string}():`, args)
        }

        const result = originalMethod.apply(this, args)

        const resultStr = `< ${klassenname}.${key as string}(): result =`

        if (result === undefined) {
            console.log(`${resultStr} void || undefined`)
        } else {
            console.log(resultStr, result)
        }

        return result
    }
    return descriptor
}
