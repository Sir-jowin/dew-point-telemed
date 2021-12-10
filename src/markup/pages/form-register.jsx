import { Formik, Form } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup'
import { register } from '../../api';
import instance from '../../axiosInstance';

// Import Images
import logo from "../../images/logo.png";
import { SelectInput, TextInput } from '../common/Input';
import '../../css/register.css';


const categoryOptions = options => {
	let arr = []
	options.map(o => {
		arr.push({value: o.practiceCategoryId, label: o.practiceCategoryName})
	})

	return arr;
}

const descriptionOptions = options => {
	let arr = []
	options.map(o => {
		arr.push({value: o.practiceDescriptionId, label: o.practiceDescriptionName})
	})

	return arr;
}

const countryOptions = options => {
	let arr = []
	options.map(o => {
		arr.push({value: o.countryId, label: o.countryName})
	})

	return arr;
}

const stateOptions = options => {
	let arr = []
	options.map(o => {
		arr.push({value: o.stateId, label: o.stateName})
	})

	return arr;
}

const genderOptions = [{value: "Male", label: "Male"},{value: "Female", label: "Female"},{value: "Others", label: "Others"},]

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
		// .matches(phoneValidation, "Enter a valid phone number")
		.required("Required"),
	countryOfResidenceId: Yup.string()
		.required("Required"),
	stateOfResidenceId: Yup.string().required('Required'),
	residentialAddress: Yup.string().required('Required'),
	practiceDescriptionId: Yup.string().required('Required'),
	categoryId: Yup.string().required('Required'),
	gender: Yup.string().required('Required'),
	userName: Yup.string().min(6, "user name must contain at least 6 characters.").required('Required'),
	password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
          return this.parent.password === value;
        }
  )
})

const instanceGet = async(url, cb, errorcb) => {
	errorcb(null);
	try{
		let response = await instance.get(url)
		if(response.status === 200 || response.status === 201 || response.status === 204) {
			cb(response.data.data);
		}
	} catch(e) {
		errorcb("We couldn't fetch necessary resources. Reload page.")
	}
}

const FormLogin = () => {
	const history = useHistory()

	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		countryOfResidenceId: 0,
		stateOfResidenceId: 0,
		residentialAddress: "",
		practiceDescriptionId: 0,
		categoryId:0,
		gender: "",
		userName: "",
		password: "",
		confirmPassword: ""
	}

	const registerFn = async (cb, values, errorcb, setIsLoading) => {
		setIsLoading(true);
		errorcb(null);
		try {
			let response = await instance.post(register, {...values})

			if(response.status === 200 || response.status === 204 || response.status === 201) {
				setIsLoading(false);
				cb();
			}
		} catch(e) {
			errorcb("We encountered an error registering.");
			setIsLoading(false);
			// cb();
		}
	}

	const [categories, setCategories] = useState([])
	const [countries, setCountries] = useState([])
	const [states, setStates] = useState([])
	const [descriptions, setDescriptions] = useState([])

	const getCategories = () => instanceGet('/Shared/PracticeCategory', setCategories, setError)
	const getDescription = () => instanceGet('/Shared/PracticeDescription', setDescriptions, setError)
	const getCountries = () => instanceGet('/Shared/GetAllCountries', setCountries, setError);
	const getCurrentStates = id => instanceGet(`/Shared/GetStatesByCountryId/${id}`, setStates, setError);

	
	const [currentCountry, setCurrentCountry] = useState(null);

	useEffect(() => {
		if(currentCountry) getCurrentStates(currentCountry)
	}, [currentCountry])
	
	useEffect(() => {
		getCategories();
		getCountries();
		getDescription()
	}, [])
	

	return (
		<>
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, {resetForm}) => {
				registerFn(() => {
					history.push('/form-reg-confirm')
				}, values, setError, setIsLoading)
			}}
			>
				<Form>
					<div className="section-area account-wraper2">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-xl-6 col-lg-8 col-md-12">
									<div className="appointment-form form-wraper">
										<div className="logo">
											<img src={logo} alt=""/>
										</div>
										{error && <div>{error}</div>}
										<div className="row">
											<div className="form-group col-md-6">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="First Name"
													name="firstName"
												/>
											</div>
											<div className="form-group col-md-6">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Last Name"
													name="lastName"
												/>
											</div>
											<div className="form-group col-md-6">
												<TextInput 
													type="email" 
													className="form-control" 
													placeholder="Email"
													name="email"
												/>
											</div>
											<div className="form-group col-md-6">
												<SelectInput 
													className="form-control" 
													placeholder="Country Of Residence"
													name="countryOfResidence"
													options={countryOptions(countries)}
													setCurrent={setCurrentCountry}
												/>
											</div>
											<div className="form-group col-md-6">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Phone Number"
													name="phoneNumber"
												/>
											</div>
											<div className="form-group col-md-6">
												<SelectInput 
													className="form-control" 
													name="stateOfResidenceId"
													placeholder="State Of Residence"
													options={stateOptions(states)}
													setCurrent={setCurrentCountry}
												/>
											</div>
											<div className="form-group col-md-6">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Address"
													name="residentialAddress"
												/>
											</div>
											<div className="form-group col-md-6">
												<SelectInput 
													className="form-control" 
													options={genderOptions}
													placeholder="Gender"
													name="gender"
												/>
											</div>

											<div className="form-group col-md-6">
												<SelectInput 
													className="form-control" 
													options={descriptionOptions(descriptions)}
													placeholder="Practice DSP"
													name="practiceDescriptionId"
												/>
											</div>
											
											<div className="form-group col-md-6">
												<SelectInput 
													className="form-control" 
													options={categoryOptions(categories)}
													placeholder="Practice CAT"
													name="practiceCategoryId"
												/>
											</div>

											<div className="form-group col-md-6">
												<TextInput 
													type="text" 
													className="form-control" 
													placeholder="Username"
													name="userName"
													autoComplete={false}
												/>
											</div>
											<div className="form-group col-md-6">
												<TextInput 
													type="password" 
													className="form-control" 
													placeholder="Password"
													name="password"
												/>
											</div>	
											<div className="form-group col-md-6">
												<TextInput 
													type="password" 
													className="form-control" 
													placeholder="Confirm Password"
													name="confirmPassword"
												/>
											</div>	
										</div>
											<div className="form-group col-md-12">
												<button 
													type="submit" 
													className="btn btn-primary w-100 radius-xl" 
													disabled={isLoading}> {!isLoading ? "Register Now": "Submitting..."}
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
				</Form>
			</Formik>
		</>
	);
}

export default FormLogin;