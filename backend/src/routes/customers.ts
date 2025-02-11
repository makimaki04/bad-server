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

customerRouter.get('/', auth, roleGuardMiddleware(Role.Admin), getCustomers)
customerRouter.get('/:id', auth, roleGuardMiddleware(Role.Admin), getCustomerById)
customerRouter.patch('/:id', doubleCsrfProtection, roleGuardMiddleware(Role.Admin), auth, updateCustomer)
customerRouter.delete('/:id', doubleCsrfProtection, roleGuardMiddleware(Role.Admin), auth, deleteCustomer)

export default customerRouter
