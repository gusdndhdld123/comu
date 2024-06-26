import HotBoardList from "./HotBoardList";
import TitleBanner from "./TitleBanner";
import ChatComponent from "./ChatComponent";
import React from "react";


function HomePage() {
    return (
        <div>
            <TitleBanner />
            <HotBoardList />
            <ChatComponent></ChatComponent>
        </div>
    )
}
export default HomePage;