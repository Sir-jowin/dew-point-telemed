import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Elements
import BackToTop from './elements/back-top';
import PageScrollTop from './elements/page-scroll-top';

// All Pages Router
import Index from './pages/index';
import AboutUs from './pages/about-us';
import Team from './pages/team';
import Services from './pages/services';
import ServiceDetail from './pages/service-detail';
import FormLogin from './pages/form-login';
import FormRegister from './pages/form-register';
import FormForgetPassword from './pages/form-forget-password';
import FormRegConfirm from './pages/form-reg-confirm';
import FormResetPassword from './pages/form-reset-password';
import Faq from './pages/faq';
import ContactUs from './pages/contact-us';
import Booking from './pages/booking';
import BlogGrid from './pages/blog-grid';
import BlogDetails from './pages/blog-details';
import Error from './pages/error-404';
import ConfirmEmail from './pages/confirmEmail';

class Markup extends Component{
	render(){
		return(
			<>
				<BrowserRouter>
				
					<Switch>
					
						<Route path='/' exact component={Index} />
						<Route path='/about-us' exact component={AboutUs} />
						<Route path='/team' exact component={Team} />
						<Route path='/services' exact component={Services} />
						<Route path='/service-detail' exact component={ServiceDetail} />
						<Route path='/form-login' exact component={FormLogin} />
						<Route path='/form-register' exact component={FormRegister} />
						<Route path='/form-reg-confirm' exact component={FormRegConfirm} />
						<Route path='/form-forget-password' exact component={FormForgetPassword} />
						<Route path='/form-reset-password' exact component={FormResetPassword} />
						<Route path='/faq' exact component={Faq} />
						<Route path='/contact-us' exact component={ContactUs} />
						<Route path='/booking' exact component={Booking} />
						<Route path='/blog-grid' exact component={BlogGrid} />
						<Route path='/blog-details' exact component={BlogDetails} />
						<Route path='/confirm' exact component={ConfirmEmail} />
						<Route component={Error} />
						
					</Switch>
					
					<PageScrollTop />
					
				</BrowserRouter>
				
				<BackToTop />
				
			</>
		);
	}
}

export default Markup;