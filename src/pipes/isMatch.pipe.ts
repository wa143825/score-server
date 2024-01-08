import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator'

@ValidatorConstraint({ name: 'isMatch' })
class MatchConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const [relatedPropertyName] = args.constraints

		const relatedValue = (args.object as any)[relatedPropertyName]

		return value === relatedValue
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		const [relatedPropertyName] = validationArguments.constraints

		return `$property must match ${relatedPropertyName}`
	}
}

export function IsMatch(property: string, validationOptions?: ValidationOptions) {
	return (object: any, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: MatchConstraint,
		})
	}
}
