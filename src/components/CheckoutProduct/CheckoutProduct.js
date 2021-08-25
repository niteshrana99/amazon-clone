import Image from 'next/image';
import React from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../slices/basketSlice';


const CheckoutProduct = ({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime
}) => {
    const dispatch = useDispatch()
    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime
        }
        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket(id))
    }

    return (
        <div className="grid grid-cols-5">
            <div className="col-span-1">
                <Image src={image} height={200} width={200} objectFit="contain" />
            </div>
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="INR" />
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img src="https://links.papareact.com/fdw" alt="" className="w-12" />
                        <p className="text-xs text-gray-500">Free Next Day Delivery</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button" onClick={addItemToBasket}>Add to Basket</button>
                <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
