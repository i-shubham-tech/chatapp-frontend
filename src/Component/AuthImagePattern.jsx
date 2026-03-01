import React from 'react'

function AuthImagePattern({ tittle, subtittle }) {
    return (
        <main className='w-full h-full hidden lg:flex justify-center items-center  p-12 bg-base-content/2'>
            <section className='max-w-md text-center'>
                <div className='h-[350px] grid grid-cols-3 gap-y-5 mb-4'>
                    {[...Array(9)].map((_, i) => {
                        return (
                            <div className={`w-[115px] rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""
                                }`} />
                        )
                    })
                    }
                </div>
                <h2 className=' text-2xl font-bold'>{tittle}</h2>
                <p className='text-base-content/60 mt-4'>{subtittle}</p>

            </section>
        </main>
    )
}

export default AuthImagePattern