import { useNavigate } from 'react-router-dom'


export const Cards = ({ data, ...props }) => {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`${data.id}`);
    }
    return (
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md dark:bg-gray-500 dark:text-white cursor-pointer xl:mx-3 md:mx-6 sm: mb-4" onClick={handleClick}>
            <div className="relative overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                {data.poster_path ? (<img
                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                    alt="img-blur-shadow"
                />) : ''}
            </div>
            <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {data.original_title || data.name}
                    </h5>
                    <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="-mt-0.5 h-5 w-5 text-yellow-700"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        {data.vote_average}
                    </p>
                </div>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased text-elipsis">
                    {data.overview}
                </p>
            </div>
            <div className="p-6 pt-0 mt-auto ">
                <button
                    className="dark:bg-[#2e4069] dark:hover:bg-[#576b98] inline-flex mt-auto items-center select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Read More
                </button>
            </div>
        </div>
    )
}

export default Cards