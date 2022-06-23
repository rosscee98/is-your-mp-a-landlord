import type { NextPage } from "next";

const IsNotLandlord: NextPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-green-500">
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className="text-6xl font-bold text-white">
                    Not a landlord!
                </h1>
            </main>
        </div>
    )
}

export default IsNotLandlord;