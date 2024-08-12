import MessageContainer from "../../components/messages/MessageContainer";
import LogoutButton from "../../components/sidebar/LogoutButton";
import Sidebar from "../../components/sidebar/Sidebar";
import maintenanceGif from './maintenance.gif';
const Home = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center p-8 bg-gray-100">
		<h1 className="text-2xl font-semibold">
			Site is Under Maintenance and Working on some Updates
		</h1>
		<img src={maintenanceGif} alt="Animated GIF" />
		<p className="font-semibold text-black">
		Please try again after some time...
			
		</p>
		<div>
		<LogoutButton />
		</div>
	  
    </div>
  );
};
export default Home;
