import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, type ISignUpResult } from 'amazon-cognito-identity-js';
import type { writable } from "svelte/store";

export class Authentication {
    private cognitoUser: CognitoUser | null | undefined;
    private userPool: CognitoUserPool;
    private userStore : typeof writable;


    constructor(cognitoClientId:string, userpoolId:string, user: typeof writable) {
        this.userPool = new CognitoUserPool({
            ClientId: cognitoClientId,
            UserPoolId: userpoolId,
            Storage: undefined
        });
        this.userStore = user;
    }

    registerUser = async (email: string, givenName: string, familyName: string, password: string) => {
        const attributeList: CognitoUserAttribute[] = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            }),
            new CognitoUserAttribute({
                Name: 'given_name',
                Value: givenName
            }),
            new CognitoUserAttribute({
                Name: 'family_name',
                Value: familyName
            })
        ];
        this.userPool.signUp(email, password, attributeList, [], (err: Error | undefined, result: ISignUpResult | undefined) => {
            if (err) {
                console.log(err.message);
                // SHow error message
                return;
            }
            if (!result?.user) {
                // Show error message
                return;
            }
        })
    }

    loginUser = (email: string, password: string) => {
        const user = new CognitoUser({ Pool: this.userPool, Username: email });
        const authenticationDetails = new AuthenticationDetails({ Username: email, Password: password });
        user.authenticateUser(authenticationDetails, {
            onSuccess: async (result: CognitoUserSession) => {
                if (result.isValid()) {
                    this.cognitoUser = user;
                } else {
                    //TODO: Error Handling
                }

            },

            onFailure: (err) => {
                //TODO: Error Handling
                if (err.code == 'UserNotConfirmedException') {
                    // Not confirmed
                } else if (err.code == 'PasswordResetRequiredException') {
                    // Reset Password Required
                } else if (err.code == 'NotAuthorizedException') {
                    // Not Authorised (Incorrect Password)
                } else if (err.code == 'ResourceNotFoundException') {
                    // User Not found
                } else {
                    // Unknown
                }
            },
        });
        this.userStore(user)
    }


    verifyUser = (email: string, code: string) => {
        const user = new CognitoUser({ Pool: this.userPool, Username: email });
        user.confirmRegistration(code, false, (err, result) => {
            if (err) {
                console.log(err.message, JSON.stringify(err));
                //TODO: ERROR HANDLING
            }
            if (result == 'SUCCESS') {
                //TODO: SUCCESS
            }
        });
        this.cognitoUser = this.userPool.getCurrentUser();
    }

    logout = () => {

    }

    get isAuthenticated(): boolean {
        return !!this.cognitoUser;
    }
}