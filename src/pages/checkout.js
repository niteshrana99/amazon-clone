import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct/CheckoutProduct";
import Header from '../components/Header/Header';
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);


const Checkout = () => {
    const [session] = useSession();
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items,
            email: session.user.email
        })
        console.log(checkoutSession);
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });

        if(result.error) {
            alert(result.error.message)
        }
    }

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-xl mx-auto">
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="containe"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{
                            items.length === 0 ? "Your Amazon Basket is Empty" : "Shopping Basket"
                        }</h1>
                        {items.map((items, index) => {
                            return <CheckoutProduct
                                        key={index}
                                        id={items.id}
                                        title={items.title}
                                        rating={items.rating}
                                        price={items.price}
                                        description={items.description}
                                        category={items.category}
                                        image={items.image}
                                        hasPrime={items.hasPrime}
                                    />
                        })}
                    </div>
                </div>
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} items): 
                            <span className="font-bold">
                                <Currency quantity={total} currency="INR" />
                            </span>
                        </h2>
                        <button onClick={createCheckoutSession} role="link" className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                            {!session ? 'Sign In to Checkout' : 'Proceed to Checkout'}
                        </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
