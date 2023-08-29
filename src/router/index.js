import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from "../views/Dashboard.vue";
import Devices from "../components/Mikrotik.vue"
import MikrotikClientsSyncVue from '../components/MikrotikClientsSync.vue';
import MirotikPackagesSyncVue from '../components/MirotikPackagesSync.vue';
import Table from '../components/Table/Template/Table.vue';
import Users from '../components/MikrotikClients.vue';
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import NotFound from "../views/NotFound.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }
        },

        {
            path: '/table',
            name: 'table',
            component: Table,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }
        }, {
            path: '/users',
            name: 'users',
            component: Users,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }
        },

        {
            path: '/devices',
            name: 'devices',
            component: Devices,
            history:null,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }
        },

        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next({ name: 'dashboard' });
                } else {
                    next();
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next({ name: 'dashboard' });
                } else {
                    next();
                }
            }
        },


        {
            path: '/mikrotikPackagesSync/:_id',
            name: 'mikrotikPackagesSync',
            component: MirotikPackagesSyncVue,
            // component: () => import('../components/MirotikPackagesSync.vue'),
            history: null,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }
        },

        {
            path: '/mikrotikClientsSync/:_id',
            name: 'mikrotikClientsSync',
            component: () => import('../components/MikrotikClientsSync.vue'),
            history: null,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('access_token')) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     console.log("Route changed to:", to.path);
//     next();
//   });

export default router
