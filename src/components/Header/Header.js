import Image from "next/image";
import  {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/basketSlice";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      <div className="flex items-center p-1 bg-amazon_blue flex-grow py-2">
        <div className="mt-2 p-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/') }
            src="https://links.papareact.com/f90"
            width={120}
            height={30}
            objectFit="containe"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex flex-grow items-center h-10 rounded-md cursor-pointer bg-yellow-400 hover:bg-yellow-500">
            <input className=" h-full w-6 flex-grow flex-shrink rounded-l-md px-4 focus:outline-none" type="text" />
            <SearchIcon className="h-12 p-4" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
            <div className="link" onClick={!session ? signIn : signOut}>
                <p>
                  {session ? `Hello, ${session.user.name}` : 'Sign In'}
                </p>
                <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>
            <div className="link">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            <div className="relative link flex items-center" onClick={() => router.push('/checkout')}>
                <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>
                <ShoppingCartIcon className="h-10" />
                <p className="font-extrabold md:text-sm hidden md:inline mt-2">Basket</p>
            </div>
        </div>
      </div>
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6 ">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food and Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health and Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
