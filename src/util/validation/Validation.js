// import * as Yup from "yup";
// import { REGEX_EMAIL_ADDRESS, REGEX_PASSWORD, REGEX_NAME_NO_NUMBERS, REGEX_LETTERS_AND_NUMBERS_ONLY,
//          REGEX_ZIPCODE, REGEX_STREET_ADDRESS, REGEX_PHONE_NUMBER, REGEX_DOLLAR_AMOUNT, 
//          REGEX_COMPANY_NAME, stateAbbreviations, Job_Trades_Array } from "../../appConstants";

// const EMAIL_YUP_FIELD = Yup.string()
//     .min(2, "Invalid Email Address")
//     .max(200, "Email Address cannot exceed 200 characters")
//     .matches(REGEX_EMAIL_ADDRESS, "Invalid Email Address")
//     .required("Email Required")

// const PASSWORD_YUP_FIELD = Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .max(100, "Password cannot exceed 100 characters")
//     .matches(REGEX_PASSWORD, "Invalid Password")
//     .required("Password Required")

// const CONFIRM_PASSWORD_YUP_FIELD = Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .max(100, "Password cannot exceed 100 characters")
//     .matches(REGEX_PASSWORD, "Invalid Password")
//     .required("Confirm Password Required")

// const FIRST_NAME_YUP_FIELD = Yup.string()
//     .min(2, "First Name must be at least 2 characters")
//     .max(50, "First Name cannot exceed 50 characters")
//     .matches(REGEX_NAME_NO_NUMBERS, "First Name cannot contain numbers")
//     .required("First Name Required")

// const LAST_NAME_YUP_FIELD = Yup.string()
//     .min(2, "Last Name must be at least 2 characters")
//     .max(50, "Last Name cannot exceed 50 characters")
//     .matches(REGEX_NAME_NO_NUMBERS, "Last Name cannot contain numbers")
//     .required("Last Name Required")

// const TRADE_YUP_FIELD = Yup.string()
//     .oneOf(Job_Trades_Array, "Invalid Trade")
//     .required("Trade Required")

// const COMPANY_NAME_YUP_FIELD = Yup.string()
//     .min(2, "Company Name must be at least 2 characters")
//     .max(50, "Company Name cannot exceed 50 characters")
//     .required("Company Name Required")

// const PHONE_YUP_FIELD_NOT_REQUIRED = Yup.string()
//     .matches(REGEX_PHONE_NUMBER, "Invalid Phone Number")
//     .nullable().notRequired()

// const PHONE_YUP_FIELD_REQUIRED = Yup.string()
//     .matches(REGEX_PHONE_NUMBER, "Invalid Phone Number")
//     .required("Phone Number Required")

// const STREET_ADDRESS_YUP_FIELD = Yup.string()
//     .min(5, "Street Address must be at least 5 characters")
//     .max(50, "Street Address cannot exceed 50 characters")
//     .matches(REGEX_STREET_ADDRESS, "Invalid Street Address")
//     .required("Street Address Required")

// const CITY_YUP_FIELD = Yup.string()
//     .min(3, "City must be at least 3 characters")
//     .max(50, "City cannot exceed 50 characters")
//     .matches(REGEX_NAME_NO_NUMBERS, "Invalid City")
//     .required("City Required")

// const STATE_YUP_FIELD = Yup.string()
//     .oneOf(stateAbbreviations, 'Invalid State')
//     .required("State Required")

// const ZIP_YUP_FIELD = Yup.string()
//     .min(5, "Zip Code must be at least 5 characters")
//     .max(10, "Zip Code cannot exceed 10 characters")
//     .matches(REGEX_ZIPCODE, "Invalid Zip Code")
//     .required("Zip Code Required")

// const UNION_SIGNUP_LOCAL_NUMBER_YUP_FIELD = Yup.string()
//     .min(1)
//     .max(50, "Invalid Local Number")
//     .matches(REGEX_LETTERS_AND_NUMBERS_ONLY, "Invalid Local Number")
//     .required("Local Number Required")

// const HOME_LOCAL_YUP_FIELD = Yup.mixed().when('userIsNotInUnion', {
//     is: true,
//     then: Yup.string()
//       .nullable()
//       .notRequired(),
//     otherwise: Yup.string()
//       .min(1)
//       .max(50, "Invalid Local Number")
//       .matches(REGEX_LETTERS_AND_NUMBERS_ONLY, "Invalid Local Number")
//       .required("Local Number Required")
//   });

// export const LoginSchema = Yup.object().shape({
//     email: Yup.string().min(2).max(200).matches(REGEX_EMAIL_ADDRESS).required(),
//     password: Yup.string().min(8).max(100).required()
// });

// export const PasswordResetSchema = Yup.object().shape({
//     email: Yup.string().min(2).max(200).matches(REGEX_EMAIL_ADDRESS).required(),
//     password: Yup.string().min(8).max(100).matches(REGEX_PASSWORD).required(),
//     passwordConfirmation: Yup.string().min(8).max(100).matches(REGEX_PASSWORD).required()
// });

// export const JobSeekerSignupStepOneSchema = Yup.object().shape({
//     email: EMAIL_YUP_FIELD,
//     password: PASSWORD_YUP_FIELD,
//     confirmPassword: CONFIRM_PASSWORD_YUP_FIELD,
//     firstName: FIRST_NAME_YUP_FIELD,
//     lastName: LAST_NAME_YUP_FIELD,
//     trade: TRADE_YUP_FIELD,
// });

// export const JobSeekerSignupStepTwoSchema = Yup.object().shape({
//     phone: PHONE_YUP_FIELD_NOT_REQUIRED,
//     streetAddress: STREET_ADDRESS_YUP_FIELD,
//     city: CITY_YUP_FIELD,
//     state: STATE_YUP_FIELD,
//     zip: ZIP_YUP_FIELD,
// });

// export const JobSeekerSignupStepThreeSchema = Yup.object().shape({
//     apprenticeshipLevel: Yup.string().required(),
//     homeLocal: HOME_LOCAL_YUP_FIELD,
// });

// export const JobSeekerAccountInfoSchema = Yup.object().shape({
//     indvFirstName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     indvLastName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     indvStreetAddress: Yup.string().min(5).max(50).matches(REGEX_STREET_ADDRESS).required(),
//     indvCity: Yup.string().min(3).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     indvZip: Yup.string().min(5).max(10).matches(REGEX_ZIPCODE).required(),
//     indvPhone: Yup.string().matches(REGEX_PHONE_NUMBER).nullable().notRequired()
// });

// export const ContractorAccountInfoSchema = Yup.object().shape({
//     firstName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     lastName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     fullName: Yup.string().min(5).max(50).matches(REGEX_COMPANY_NAME).required(),
//     streetAddress: Yup.string().min(5).max(50).matches(REGEX_STREET_ADDRESS).required(),
//     city: Yup.string().min(3).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     zip: Yup.string().min(5).max(10).matches(REGEX_ZIPCODE).required(),
//     phone: Yup.string().matches(REGEX_PHONE_NUMBER).nullable().required(),
// });

// export const UnionAccountInfoSchema = Yup.object().shape({
//     firstName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     lastName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     localStreetAddress: Yup.string().min(5).max(50).matches(REGEX_STREET_ADDRESS).required(),
//     localCity: Yup.string().min(3).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     localZipcode: Yup.string().min(5).max(10).matches(REGEX_ZIPCODE).required(),
//     localPhone: Yup.string().matches(REGEX_PHONE_NUMBER).nullable().required(),
// });

// export const CareerInfoSchema = Yup.object().shape({
//     apprenticeshipLevel: Yup.string().required(),
//     homeLocal: Yup.number().min(2, 'Home Local Required').required()
// });

// export const ConfirmationCodeSchema = Yup.object().shape({
//     confirmationCode: Yup.string().required(),
// });

// export const ContractorSignupStepOneSchema = Yup.object().shape({
//     email: EMAIL_YUP_FIELD,
//     firstName: FIRST_NAME_YUP_FIELD,
//     lastName: LAST_NAME_YUP_FIELD,
//     companyName: COMPANY_NAME_YUP_FIELD,
//     password: PASSWORD_YUP_FIELD,
//     confirmPassword: CONFIRM_PASSWORD_YUP_FIELD,
// });

// export const ContractorSignupStepTwoSchema = Yup.object().shape({
//     phone: PHONE_YUP_FIELD_REQUIRED,
//     streetAddress: STREET_ADDRESS_YUP_FIELD,
//     city: CITY_YUP_FIELD,
//     state: STATE_YUP_FIELD,
//     zip: ZIP_YUP_FIELD
// });

// export const UnionSignupStepOneSchema = Yup.object().shape({
//     unionEmail: EMAIL_YUP_FIELD,
//     password: PASSWORD_YUP_FIELD,
//     confirmPassword: CONFIRM_PASSWORD_YUP_FIELD,
//     localNumber: HOME_LOCAL_YUP_FIELD,
//     localTrade: TRADE_YUP_FIELD,
// });

// export const UnionSignupStepTwoSchema = Yup.object().shape({
//     firstName: FIRST_NAME_YUP_FIELD,
//     lastName: LAST_NAME_YUP_FIELD,
//     localPhone: PHONE_YUP_FIELD_REQUIRED,
//     localStreetAddress: STREET_ADDRESS_YUP_FIELD,
//     localCity: CITY_YUP_FIELD,
//     localState: STATE_YUP_FIELD,
//     localZipcode: ZIP_YUP_FIELD,
// });

// // {User Type: {Step: Schema Reference}}
// export const SignupSchemas = {
//     1: {
//         1: JobSeekerSignupStepOneSchema,
//         2: JobSeekerSignupStepTwoSchema,
//         3: JobSeekerSignupStepThreeSchema,
//     },
//     2: {
//         1: ContractorSignupStepOneSchema,
//         2: ContractorSignupStepTwoSchema,
//     },
//     3: {
//         1: UnionSignupStepOneSchema,
//         2: UnionSignupStepTwoSchema,
//     },   
// };


// export const JobAddFormSchema = Yup.object().shape({
//     jobName: Yup.string().min(2).max(75).required(), // Allow letters, numbers and symbols
//     jobPayRate: Yup.string().min(2).max(5).matches(REGEX_DOLLAR_AMOUNT).required(),
//     jobStreetAddress: Yup.string().min(5).max(50).matches(REGEX_STREET_ADDRESS).required(),
//     jobCity: Yup.string().min(3).max(30).matches(REGEX_NAME_NO_NUMBERS).required(),
//     jobZip: Yup.string().min(5).max(10).matches(REGEX_ZIPCODE).required(),
//     jobContactFName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     jobContactLName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     jobContactPhone: Yup.string().matches(REGEX_PHONE_NUMBER).required(),
//     jobContactEmail: Yup.string().min(2).max(200).matches(REGEX_EMAIL_ADDRESS).required(),
// });

// export const ContactUsSchema = Yup.object().shape({
//     email: Yup.string().min(2).max(200).matches(REGEX_EMAIL_ADDRESS).required(),
//     firstName: Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     lastName:  Yup.string().min(2).max(50).matches(REGEX_NAME_NO_NUMBERS).required(),
//     subject: Yup.string().min(2).max(50).required(), 
//     body: Yup.string().min(25).max(1000).required(),
// });