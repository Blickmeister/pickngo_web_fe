import axios from 'axios'
import {getLoginUrl} from "../../constants/endpoints";

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'AuthenticatedUser';

const USER_NAME_SESSION_ATTRIBUTE_PASSWORD = 'UserPassword';

const USER_NAME_SESSION_ATTRIBUTE_ROLE = 'UserRole';

const USER_NAME_SESSION_ATTRIBUTE_ID = 'UserId';

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {

        let role = '';
        let id = '';

        return axios.get(`${getLoginUrl}`, {
            headers: {
                authorization: this.createBasicAuthToken(username, password),
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((response) => {
                {role = response.data.roleName}
                {id = response.data.id}
            })
            .then(() => {
                {sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_ROLE, role)}
                {sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_ID, id)}
            })
    }

    createBasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(username + ":" + password)
    };

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD, password)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return '';
        return user;
    }

    getLoggedInUserRole() {
        let roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if (roleName === null) return '';
        return roleName;
    }

    getLoggedInUserPassword() {
        let userPassword = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        if (userPassword === null) return '';
        return userPassword;
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
    }
}

export default new AuthenticationService();
