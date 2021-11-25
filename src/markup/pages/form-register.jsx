import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as Yup from 'yup'
import { register } from '../../api';
import instance from '../../axiosInstance';

// Import Images
import logo from "../../images/logo.png";
import { TextInput } from '../common/Input';
import '../../css/register.css';

const phoneValidation = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, "Enter a valid name")
		.max(50, "Name too long")
		.required("Required"),
	lastName: Yup.string()
		.min(2, "Enter a valid name")
		.max(50, "Name too long")
		.required("Required"),
	email: Yup.string()
		.email("Enter a valid email address")
		.required('Required'),
	phoneNumber: Yup.string()
		.matches(phoneValidation, "Enter a valid phone number")
		.required("Required"),
	countryOfResidence: Yup.string()
		.required("Required"),
	stateOfResidence: Yup.string().required('Required'),
	residentialAddress: Yup.string().required('Required'),
	practiceDescriptionId: Yup.string().required('Required'),
	// gender: Yup.string().oneOf(["Male, Female"]).required('Required'),
	gender: Yup.string().required('Required'),
	userName: Yup.string().required('Required'),
	password: Yup.string().required('Required'),
	confirmPassword: Yup.string().required('Required')
})


const FormLogin = () => {
	
	const [error, setError] = useState(null)

	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		countryOfResidence: "",
		stateOfResidence: "",
		residentialAddress: "",
		practiceDescriptionId: "",
		gender: "",
		userName: "",
		password: "",
		confirmPassword: ""
	}

	const registerFn = async (values, errorcb, setIsLoading) => {
		try {
			let response = await instance.post(register, {...values})

			if(response.status === 200 || response.status === 204 || response.status === 201) {
				setIsLoading(false);
			}
		} catch(e) {
			errorcb("We encountered an error registering.");
			setIsLoading(false);
		}
	}

	return (
		<>
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, setSubmitting) => registerFn(values, setError, setSubmitting)}>
				{({isSubmitting}) => (<Form>
					<div className="section-area account-wraper2">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-xl-5 col-lg-6 col-md-8">
									<div className="appointment-form form-wraper">
										<div className="logo">
											<img src={logo} alt=""/>
										</div>
											<div className="form-group">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="First Name"
													name="firstName"
												/>
											</div>
											<div className="form-group">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Last Name"
													name="lastName"
												/>
											</div>
											<div className="form-group">
												<TextInput 
													type="email" 
													className="form-control" 
													placeholder="Email"
													name="email"
												/>
											</div>
											<div className="form-group">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Country Of Residence"
													name="countryOfResidence"
												/>
											</div>
											<div className="form-group">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="State Of Residence"
													name="stateOfResidence"
												/>
											</div>
											<div className="form-group">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Gender"
													name="gender"
												/>
											</div>
											<div className="form-group">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Practice Description"
													name="practiceDescriptionId"
												/>
											</div>
											
											<div className="form-group">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Username"
													name="userName"
												/>
											</div>
											<div className="form-group">
												<TextInput 
													type="password" 
													className="form-control" 
													placeholder="Password"
													name="password"
												/>
											</div>	
											<div className="form-group">
												<TextInput 
													type="password" 
													className="form-control" 
													placeholder="Confirm Password"
													name="confirmPassword"
												/>
											</div>	
											<div className="form-group">
												<button 
												type="submit" 
												className="btn btn-primary w-100 radius-xl" 
												disabled={isSubmitting}>{!isSubmitting ? "Register Now": "Submitting..."}
												</button>
											</div>
											<div className="text-center mt-40">						
												<p className="mt-0">Already have an account?</p>
												<Link className="btn btn-lg btn-secondary w-100" data-toggle="tab" to="/form-login">Login</Link>
											</div>	
									</div>
								</div>
							</div>					
						</div>
					</div>
				</Form>)}
			</Formik>
		</>
	);
}

export default FormLogin;