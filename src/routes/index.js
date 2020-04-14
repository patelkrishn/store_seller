import Home from '../views/Home';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Products from './../views/products/Products';
import Inventories from '../views/inventories/Inventories';
import InventoryAdd from '../views/inventories/InventoryAdd';
import InventoryReport from '../views/inventories/InventoryReport';
import InvoiceCreate from '../views/invoices/InvoiceCreate';

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
    {
        path : '/invoice-create',
        component : InvoiceCreate,
        name : 'Create Invoice',
        meta : {
            requiresAuth : true
        }
    },
    
];