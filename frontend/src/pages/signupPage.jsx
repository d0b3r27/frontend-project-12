import { useTranslation } from 'react-i18next'
import SignupForm from '../components/signupForm'
import NavBar from '../components/navigationBar'
import signup from '../assets/signup.jpg'

const SingupPage = () => {
  const { t } = useTranslation()

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src={signup} className="rounded-circle" alt={t('signup.signup')} />
                </div>
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingupPage
