import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Products from './components/products/Products';
import Inventories from './components/inventories/Inventories';
import InventoryAdd from './components/inventories/InventoryAdd';
import InventoryReport from './components/inventories/InventoryReport';

export const routes = [
    {
        path : '/login',
        name : 'Login',
        component : Login
    },
    {
        path : '/register',
        name : 'Register',
        component : Register
    },
    {
        path : '/',
        component : Home,
        name : 'Dashboard',
        meta : {
            requiresAuth : true
        }
    },
    {
        path : '/products',
        component : Products,
        name : 'Products',
        meta : {
            requiresAuth : true
        }
    },
    {
        path : '/inventories',
        component : Inventories,
        name : 'Inventory',
        meta : {
            requiresAuth : true
        }
    },
    {
        path : '/inventories-add',
        component : InventoryAdd,
        name : 'Add Inventory',
        meta : {
            requiresAuth : true
        }
    },
    {
        path : '/inventories-report',
        component : InventoryReport,
        name : 'Inventory Report',
        meta : {
            requiresAuth : true
        }
    },
    
];