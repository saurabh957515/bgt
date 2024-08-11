
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex w-full overflow-hidden bg-gray-400 bg-opacity-0 rounded-lg sm:h-full bg-clip-padding backdrop-filter backdrop-blur-lg'>
			<Sidebar />
			<MessageContainer />
         
           
		</div>
	);
};
export default Home;