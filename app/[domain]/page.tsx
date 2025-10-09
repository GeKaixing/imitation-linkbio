import PlaygroundBrowser from '@/components/PlaygroundBrowser'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'


export default async function page(props) {
    const data = await props.params
    const rul = await fetch(`http://localhost:3001/api/login?user_domain=${data.domain}`)
    const data1 = await rul.json()
    const userData = data1.user
    const link = await fetch(`http://localhost:3001/api/link-data?user_domain=${data.domain}`)
    const data2 = await link.json()
    return (
        <div className="flex justify-center grow pb-10 z-10 items-center px-4 bg-main">
            <Script defer src="http://192.168.1.2:3000/script.js"
                data-website-id={userData.user_website_id}
            />
            <div className="w-full max-w-[584px]">
                <div className="rounded-xl border-4 md:border-8 border-[#3c3e44] overflow-hidden min-h-[calc(100vh-160px)]">
                    {/* Browser Bar */}
                    <PlaygroundBrowser></PlaygroundBrowser>
                    {/* Content Area */}
                    <form className="space-y-6">
                        <div className="px-[15px] md:px-[70px] py-[30px] md:py-[45px] flex flex-col items-center justify-center w-full">
                            {/* Profile Section */}
                            <div className="relative flex flex-col items-center justify-center w-full">
                                {/* Avatar */}
                                <div className="relative group cursor-pointer">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pink-500 flex items-center justify-center">
                                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-full transition-all duration-200"></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 2C7.89 2 7 2.89 7 4v1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Name, Title, Bio */}
                                <div className="text-center my-4  w-full">
                                    <input
                                        className={`rounded-lg bg-transparent px-4 py-2 transition-all duration-200 ease-in-out 
                  text-light text-center border-0 outline-none w-full truncate 
                  hover:bg-dark hover:text-lighter focus:bg-dark focus:text-lighter `}
                                        value={userData.user_name}
                                        readOnly
                                    />

                                    <input
                                        className={`rounded-lg bg-transparent px-4 py-2 transition-all duration-200 ease-in-out 
                  text-light text-center border-0 outline-none w-full truncate 
                  hover:bg-dark hover:text-lighter focus:bg-dark focus:text-lighter`}
                                        value={userData.user_title}
                                        readOnly
                                    />

                                    <div className="text-sm w-full sm:w-[70%] m-auto">
                                        <textarea
                                            className="text-light text-center bg-transparent border-0 outline-none w-full h-auto 
                 rounded-lg px-3 py-2 resize-none overflow-hidden 
                 hover:bg-dark hover:text-lighter focus:bg-dark focus:text-lighter 
                 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out mt-2"
                                            rows={1}
                                            maxLength={250}
                                            value={userData.user_bio}
                                            readOnly
                                            style={{ minHeight: "36px" }}
                                        />
                                    </div>

                                    {/* Add Button */}
                                    <Link 
                                    href={userData.user_button.link}
                                    className="mt-4 h-[55px] w-[90%] md:w-[80%] mx-auto"
                                        data-umami-event="button"
                                    >
                                        <button className={"text-center bg-primary rounded-lg font-bold text-sm py-2 border-2 border-secondary px-3 w-full max-w-[150px] text-light cursor-pointer hover:bg-dark hover:text-lighter focus:text-lighter focus:bg-dark focus:border-primary"}
                                        >
                                            {userData.user_button.text}
                                        </button>

                                    </Link>
                                </div>
                            </div>

                            {/* Grid Layout */}
                            <div className="flex flex-wrap gap-4 w-[416px] justify-between">

                                {data2.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((item) => {
                                    return <ItemContent key={item.id} item={item}></ItemContent>
                                })
                                }

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function ItemContent({ item }) {
    switch (item.type) {
        case "link":
            {
                switch (item.size) {
                    case "mini":
                        return (
                            <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-umami-event="mini card"
                                data-umami-event-id={item.id}
                                className="group flex flex-col justify-center items-center rounded-2xl bg-[#23262c]  w-16 h-16 p-2 relative">
                                <div className=" w-8 h-8">
                                    {item.icon ?
                                        <img className='w-8 h-8 object-cover' src={item.icon} alt='logo'></img> :
                                        <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>
                                    }
                                </div>
                            </Link >

                        )
                    case "little":
                        return (
                            <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-umami-event="little card"
                                data-umami-event-id={item.id}
                                className="flex justify-center items-center rounded-2xl bg-[#23262c] w-[426px] h-14 p-2 relative group">
                                <div className=" w-8 h-8">
                                    {item.icon ?
                                        <img className='w-8 h-8 object-cover' src={item.icon} alt='logo'></img> :
                                        <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>
                                    }
                                </div>
                                <div

                                    className="text-blue-600  text-xs break-all text-center text-nowrap truncate"
                                >
                                    {item.title ? item.title : item.link}
                                </div>
                                <Link href={item.link}>
                                    <ArrowUpRight className='text-light'></ArrowUpRight>
                                </Link>
                            </Link>
                        )
                    case "normal":
                        return (
                            <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-umami-event="normal card"
                                data-umami-event-id={item.id}
                                className="flex  items-center rounded-2xl  bg-[#23262c] w-[416px] h-[200px] p-2 relative group">
                                <div className="flex flex-col flex-1 gap-2  items-start">
                                    <div className=" w-8 h-8 flex-1 relative">
                                        {item.icon ?
                                            <img className='w-8 h-8 object-cover' src={item.icon} alt='logo'></img> :
                                            <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>
                                        }
                                    </div>
                                    <div className="text-sm font-semibold text-blue-800 mb-2 flex-1">{item.title}</div>
                                    {item.button.text && <div className="mt-4 h-[38px] w-[90%] md:w-[80%] mx-auto flex-1">
                                        <input
                                            className="rounded-lg bg-transparent transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 text-center cursor-pointer outline-none font-bold text-sm py-2 border-2 border-secondary px-3 w-full max-w-[150px] text-light hover:bg-dark hover:text-lighter focus:text-lighter focus:bg-dark focus:border-primary"
                                            placeholder="Add Button"
                                            name="ctaButton"
                                            readOnly
                                        />
                                    </div>}
                                </div>
                                <div className="bg-[#252933] rounded-2xl h-[150px] flex-1 flex justify-center items-center" dangerouslySetInnerHTML={{ __html: "<div style=\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;\"><iframe src=\"https://www.youtube.com/embed/CLXt3yh2g0s?rel=0\" style=\"top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;\" allowfullscreen scrolling=\"no\" allow=\"accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;\" referrerpolicy=\"strict-origin\"></iframe></div>" }}>
                                </div>

                            </Link>
                        )
                    case "big":
                        return (
                            <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-umami-event="big card"
                                data-umami-event-id={item.id}
                                className="flex flex-col  rounded-2xl items-start bg-[#23262c] w-[192px] h-[200px] p-2 relative group">
                                <div className=" w-8 h-8 flex-1 relative">
                                    {item.icon ?
                                        <img className='object-cover w-8 h-8' src={item.icon} alt='logo'></img> :
                                        <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4613 17.0032C29.6421 14.7071 29.2071 12.4044 28.2013 10.3325C26.5365 11.9143 24.5685 13.1426 22.416 13.9432C22.5891 16.0676 22.4932 18.2054 22.1307 20.3058C24.75 19.6461 27.2318 18.528 29.4613 17.0032ZM20.012 20.7338C20.4379 18.6978 20.5868 16.6137 20.4547 14.5378C19.1853 14.8405 17.8613 15.0005 16.5 15.0005C15.1387 15.0005 13.8147 14.8405 12.5453 14.5378C12.4163 16.6137 12.5652 18.6974 12.988 20.7338C15.3158 21.0906 17.6843 21.0906 20.012 20.7338ZM13.5293 22.8258C15.5029 23.0593 17.4971 23.0593 19.4707 22.8258C18.7924 25.0093 17.7911 27.0789 16.5 28.9658C15.2089 27.0789 14.2076 25.0093 13.5293 22.8258ZM10.8693 20.3072C10.5049 18.206 10.409 16.0671 10.584 13.9418C8.43105 13.1415 6.46257 11.9132 4.79734 10.3312C3.79176 12.4036 3.35727 14.7068 3.53868 17.0032C5.7682 18.528 8.25004 19.6475 10.8693 20.3072ZM28.9747 19.6698C28.3015 21.9511 27.0163 24.0043 25.2585 25.6067C23.5008 27.2091 21.3377 28.2994 19.004 28.7592C20.1727 26.7942 21.0647 24.6773 21.6547 22.4685C24.2273 21.9293 26.6981 20.9851 28.9747 19.6712V19.6698ZM4.02534 19.6698C6.26801 20.9645 8.73201 21.9205 11.3453 22.4685C11.9354 24.6773 12.8273 26.7942 13.996 28.7592C11.6625 28.2995 9.49953 27.2094 7.7418 25.6073C5.98407 24.0051 4.69874 21.9522 4.02534 19.6712V19.6698ZM19.004 3.24049C22.3076 3.88983 25.2308 5.79493 27.1587 8.55516C25.7356 9.99299 24.0367 11.1286 22.164 11.8938C21.6594 8.83758 20.5877 5.90267 19.004 3.24049ZM16.5 3.03516C18.4459 5.87795 19.7244 9.12364 20.24 12.5298C19.044 12.8365 17.7907 13.0005 16.5 13.0005C15.2093 13.0005 13.956 12.8378 12.76 12.5298C13.2756 9.12363 14.5541 5.87793 16.5 3.03516ZM13.996 3.24049C12.4123 5.90266 11.3406 8.83757 10.836 11.8938C8.96329 11.1286 7.26443 9.99302 5.84134 8.55516C7.76939 5.79533 10.6925 3.88937 13.996 3.24049Z" fill="url(#paint0_linear_1779_5696)"></path><defs><linearGradient id="paint0_linear_1779_5696" x1="15.8333" y1="2.66536" x2="15.8333" y2="31.332" gradientUnits="userSpaceOnUse"><stop stopColor="#0091F0"></stop><stop offset="1" stopColor="#23262C"></stop></linearGradient></defs></svg>
                                    }

                                </div>
                                <div className="text-sm font-semibold text-blue-800 break-words whitespace-normal line-clamp-3 w-full">
                                    {item.title}</div>
                                {item.button.text !== "" && <div className="mt-4 h-[38px] w-[90%] md:w-[80%] mx-auto flex-1">
                                    <input
                                        className="rounded-lg bg-transparent transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 text-center cursor-pointer outline-none font-bold text-sm py-2 border-2 border-secondary px-3 w-full max-w-[150px] text-light hover:bg-dark hover:text-lighter focus:text-lighter focus:bg-dark focus:border-primary"
                                        placeholder="Add Button"
                                        name="ctaButton"
                                        readOnly
                                    />
                                </div>}

                            </Link>
                        )
                }

            };

        case "post":
            return (
                <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="post card"
                    data-umami-event-id={item.id}
                    className=" group relative flex flex-col justify-center items-center rounded-2xl bg-[#23262c] w-[192px] h-auto p-2 ">
                    <div className="w-full h-auto rounded-2xl " dangerouslySetInnerHTML={{__html:item.embedCode}}></div>
                    <div className="text-gray-700 text-xs p-2 text-center overflow-hidden w-full">
                        {item.title}
                    </div>
                </Link>
            );

        case "embed":
            return (<Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="post embed"
                data-umami-event-id={item.id}
                className=" group relative  w-[416px] h-auto p-2 bg-[#23262c]  flex flex-col justify-center items-center rounded-2xl">
                <div className='w-full' dangerouslySetInnerHTML={{ __html: item.embedCode }}></div>
            </Link>
            );

        default:
            return (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    Unknown type
                </div>
            );
    }
}