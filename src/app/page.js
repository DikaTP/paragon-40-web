"use client"

import ListItems from '@/components/ListItems';
import AddItem from '../components/AddItems'

export default function Home() {
    return (
        <div className="bg-white h-screen w-screen text-black flex flex-col justify-center items-center">
            <h1>PARAGON 40</h1>
            <AddItem/>
            <ListItems/>
        </div>
    );
}
