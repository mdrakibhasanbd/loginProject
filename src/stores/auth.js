import { defineStore } from 'pinia';
import router from '../router'
import api from '../main';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

export const useAuthStore = defineStore('auth',{
    state: () => ({
        user: JSON.parse(localStorage.getItem('identity')),
        access_token: JSON.parse(localStorage.getItem('access_token')),
        refresh_token: JSON.parse(localStorage.getItem('refresh_token')),
        role: JSON.parse(localStorage.getItem('role')),
        returnUrl: null,
        refreshTokenTimeout: null
    }),
    getters: {
        isAuthenticated() {
            console.log('authenticated');
            return !!this.access_token && !!this.user;
        }
    },
    actions: {
        async login(username, password) {
            try {
                const response = await api.post('/login', {
                    username,
                    password
                });

                const { identity, access_token, refresh_token, role } = response.data;

                this.user = identity;
                this.access_token = access_token;
                this.refresh_token = refresh_token;
                this.role = role;

                // console.log('access_token:',access_token);
                // console.log('refresh_token:',refresh_token);

                localStorage.setItem('identity', JSON.stringify(identity));
                localStorage.setItem('access_token', JSON.stringify(access_token));
                localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
                localStorage.setItem('role', JSON.stringify(role));

                // Set a timer to automatically refresh the token before it expires
                this.startRefreshTokenTimer();

                // router.push(this.returnUrl || '/dashboard');
                router.push( '/dashboard');
                $toast.success('You have been logged in successfully!');
            } catch (error) {
                console.error('Login Error:', error);
                // const alertStore = useAlertStore();
                // alertStore.error(error);
            }
        },
        logout() {
            this.user = null;
            this.access_token = null;
            this.refresh_token = null;
            localStorage.removeItem('identity');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('role');
            router.push('/login');
            this.stopRefreshTokenTimer();
        },
        setToken(access_token,refresh_token) {
            this.access_token = access_token;
            this.refresh_token = refresh_token;
            // console.log('set token with reload');
            this.startRefreshTokenTimer();
        },

        async refreshToken() {
            try {
                // console.log("Refreshing token...");
                // Set the access token in the request header
                const response = await api.post('/refreshToken', { refresh_token: this.refresh_token }, {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
                // console.log("Token refreshed successfully.");
                const { access_token,refresh_token } = response.data;
                this.access_token = access_token;
                this.refresh_token = refresh_token;
                // console.log('new access_token:',access_token);
                // console.log('new refresh_token:',refresh_token);
                localStorage.setItem('access_token', JSON.stringify(access_token));
                localStorage.setItem('refresh_token', JSON.stringify(refresh_token));

                // Set a timer to automatically refresh the token before it expires
                this.startRefreshTokenTimer();
            } catch (error) {
                // Handle error if necessary
                console.error("Token refresh error:", error);
            }
        },


        startRefreshTokenTimer() {
            // console.log('start timer');
            const jwtBase64 = this.access_token.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));
            const expirationTime = jwtToken.exp * 1000; // Convert expiration time to milliseconds

            // Calculate the remaining time until token expiration
            const timeout = expirationTime - Date.now() - 5000; // Refresh 5 seconds before token expiration

            // Check if the token is still valid (expiration time not passed)
            if (timeout > 0) {
                // console.log("Setting refreshTokenTimeout with timeout:", timeout);
                this.refreshTokenTimeout = setTimeout(() => {
                    // Call the refreshToken action to obtain a new access token using the refresh token
                    this.refreshToken();
                }, timeout);
            } else {
                console.log("Token has already expired, logging out the user immediately");
                this.logout();
            }
        },


        stopRefreshTokenTimer() {
            console.log("Reset the timeout to null after clearing it");
            if (this.refreshTokenTimeout) {
                clearTimeout(this.refreshTokenTimeout);
                this.refreshTokenTimeout = null; // Reset the timeout to null after clearing it
            }
        }


    }
});
