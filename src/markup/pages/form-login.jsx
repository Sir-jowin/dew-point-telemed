import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { login } from '../../api';
import instance from '../../axiosInstance';

// Import Images
import logo from "../../images/logo.png";
import { TextInput } from '../common/Input';


const validationSchema = Yup.object().shape({
	email: Yup.string()
	.email("Enter a valid email address")
	.required("Required"),
	password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  )
})

const FormLogin = () => {
	const [error, setError] = useState(null)

	const initialValues = {
		email: "",
		password: ""
	}

const LoginFn = async (values, errorcb, setIsLoading) => {
	try {
		let response = await instance.post(login, {...values})

		if(response.status === 200 || response.status === 204 || response.status === 201) {
			setIsLoading(false)
		}
	} catch(e) {
		errorcb("We encountered an error login");
		setIsLoading(false);
	}
}
	
		return (
			<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, setSubmitting) => LoginFn(values, setError, setSubmitting)}>
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
											type="email" 
											className="form-control" 
											placeholder="Email"
											name="email"
											/>
										</div>
										<div className="form-group">
											<input 
											type="password" 
											className="form-control" 
											placeholder="Password"
											name="password"
											/>
										</div>
										<div className="form-group">
											<button
											 type="submit" 
											 className="btn mb-30 btn-lg btn-primary w-100"
											 disabled={isSubmitting}>{!isSubmitting ? "Login" : "Submitting..."}
											 </button>
											<div><Link to="/form-forget-password" data-toggle="tab">Forgot Password</Link></div>
											<div><Link to="/form-reset-password" data-toggle="tab">Reset Password</Link></div>
										</div>
										<div className="text-center mt-40">
											<p className="mt-0">Dont have any account?</p>
											<Link className="btn btn-lg btn-secondary w-100" data-toggle="tab" to="/form-register">Register</Link>
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