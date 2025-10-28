import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import Layout from './Component/common/Layout'
import Table from './Component/userlist/Userlist'
import Edit from './Component/userlist/Edit'
import View from './Component/userlist/View'
import Profile from './Component/profile/Profile'
import Updatepassword from './Component/profile/Updatepassword'
import Logout from './Component/profile/Logout'
import Authenticate from './Component/profile/Authenticate'
import Category from './Component/category/Category'
import EditCategory from './Component/category/EditCategory'
import ViewCategory from './Component/category/ViewCategory'
import AddCategory from './Component/category/AddCategory'
import ProductList from './Component/products/ProductList'
import ViewProduct from './Component/products/ViewProduct'
import EditProduct from './Component/products/EditProduct'
import BookingList from './Component/bookings/BookingList'
import ViewBooking from './Component/bookings/ViewBooking'
import EditBooking from './Component/bookings/EditBooking'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<Layout />}>
        <Route element={<Authenticate/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userList' element={<Table />} />
          <Route path='/editUser/:id' element={<Edit />} />
          <Route path='/viewUser/:id' element={<View />} />
          <Route path='/adminProfile' element={<Profile />} />
          <Route path='/adminPass' element={<Updatepassword />} />
          <Route path='/logOut' element={<Logout />} />
          <Route path='/categoryList' element={<Category />} />
          <Route path='/editCategory/:id' element={<EditCategory />} />
          <Route path='/viewCategory/:id' element={<ViewCategory />} />
          <Route path='/addCategory' element={<AddCategory />} />
          <Route path='/productList' element={<ProductList />} />
          <Route path='/viewProduct/:id' element={<ViewProduct />} />
          <Route path='/editProduct/:id' element={<EditProduct />} />
          <Route path='/bookingList' element={<BookingList />} />
          <Route path='/viewBooking/:id' element={<ViewBooking />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
