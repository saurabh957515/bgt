import MessageContainer from "../../components/messages/MessageContainer";
import LogoutButton from "../../components/sidebar/LogoutButton";
import Sidebar from "../../components/sidebar/Sidebar";
import Layout from "../../Fileds/Layout";
import MaintenancePage from "./MaintenancePage";
const Home = () => {
  return (
    <Layout title={"Dashboard"}>
      <div className="w-full h-full p-4 ml-4 text-gray-800">Dashboard View</div>
    </Layout>
  );
};
export default Home;
