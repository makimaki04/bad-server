import { Router } from 'express'
import {
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
} from '../controllers/customers'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { doubleCsrfProtection } from '../middlewares/csrf-protection'
import { Role } from '../models/user'

const customerRouter = Router()

customerRouter.get('/', auth, getCustomers)
customerRouter.get('/:id', auth, getCustomerById)
customerRouter.patch('/:id', doubleCsrfProtection, auth, updateCustomer)
customerRouter.delete('/:id',  doubleCsrfProtection, auth, deleteCustomer)

export default customerRouter
