import React from 'react'
import Header from '../components/Header/Header'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
const Success = () => {
    const router = useRouter();

    return (
        <div className="bg-gray-100 h-screen">
            <Header />
            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5">
                    <CheckCircleIcon className="text-green-600 h-10" />
                    <h1 className="text-xl">Thank You, your order has been confirmed</h1>
                    </div>
                    <p>
                    Thank you for shopping with us. We will send a confirmation message to you once your item has shipped. If you would like to check the status of order(s) please press below link.
                </p>
                <button onClick={() => router.push('/')} className="button mt-8">Continue Shopping</button>
                </div>
                
            </main>
        </div>
    )
}

export default Success
