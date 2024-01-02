import Header from "../component/header/Header"
import SideBar from "../component/sideBar/Sidebar"

const DefaultLayouts = ({ children }) => {
    return (
        <>
            <SideBar />
            <div>
                <div className="ml-[256px]">
                    <Header />
                    <div className="px-[24px] ">
                        {children}
                    </div>
                </div>
            </div >
        </>
    )
}

export default DefaultLayouts