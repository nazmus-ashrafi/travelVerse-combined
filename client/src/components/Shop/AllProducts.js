import React, { useEffect, useState } from 'react'
import Product from './ProductScreen'
import { Link } from 'react-router-dom'

import { getProducts, deleteProduct } from '../../features/product/productSlice'
import { useSelector, useDispatch } from "react-redux";

import Spinner from '../Spinner';
import UpdateProduct from './UpdateProduct';


const AllProducts = ({profileUserId}) => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getProducts(profileUserId));

  }, [])

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  )

  const { user } = useSelector(
    (state) => state.auth
  )


  const { userDetails } = useSelector(
        (state) => state.user
    )

  // console.log(products);

// const products = [
//   {
//     id: 1,
//     name: 'Earthen Bottle',
//     href: '#',
//     price: '48',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
//     imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
//   },
//   {
//     id: 2,
//     name: 'Nomad Tumbler',
//     href: '#',
//     price: '35',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
//     imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
//   },
//   {
//     id: 3,
//     name: 'Focus Paper Refill',
//     href: '#',
//     price: '89',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
//     imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
//   },
//   {
//     id: 4,
//     name: 'Machined Mechanical Pencil',
//     href: '#',
//     price: '35',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//     imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//   },
//   {
//     id: 1,
//     name: 'Earthen Bottle',
//     href: '#',
//     price: '48',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
//     imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
//   },
//   {
//     id: 2,
//     name: 'Nomad Tumbler',
//     href: '#',
//     price: '35',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
//     imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
//   },
//   {
//     id: 3,
//     name: 'Focus Paper Refill',
//     href: '#',
//     price: '89',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
//     imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
//   },
//   {
//     id: 4,
//     name: 'Machined Mechanical Pencil',
//     href: '#',
//     price: '35',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//     imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//   },
//   {
//     id: 4,
//     name: 'Machined Mechanical Pencil',
//     href: '#',
//     price: '35',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//     imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//   },
// ]

    const onDeleteClick = (id) => {
        dispatch(deleteProduct(id));
    }

    const [addProductModalOpened, setAddProductModalOpened] = useState(false)


    const [product, setProduct] = useState({})
    const onUpdateClick = (data) => {
      setAddProductModalOpened(true)
      setProduct(data)
    }
  
  return (
    <div className="bg-base-100">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {isLoading ? <h2><Spinner /></h2> : isError ? <h2>{message}</h2> : 

        <>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div class="grid grid-rows-4 grid-flow-col gap-4">
              <Link key={product._id} className="group" to={`/product/${product._id}`}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.profileImage}
                    // alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm ">{product.name}</h3>
                <p className="mt-1 text-lg font-medium ">৳ {product.price}</p>
              </Link>

              {user && user.user._id === profileUserId && user.user.isShop &&
              // user is a shop and this is his own profile
                <div>
                  <button class="btn btn-sm btn-info" onClick= {()=> onUpdateClick(product)}>Update</button>
                  <button class="btn btn-sm btn-error ml-4" disabled onClick={()=>onDeleteClick(product._id)}>Delete</button>
                </div>
              }
              
              
            </div>

            
            
          ))}
        </div>

        <UpdateProduct showProfileModal={addProductModalOpened} setShowProfileModal={setAddProductModalOpened} data={product}/>
        </>
        
        
        }

        
      </div>
    </div>
  )
}

export default AllProducts