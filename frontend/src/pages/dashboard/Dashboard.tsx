import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="text-center md:w-1/2 mx-auto mt-8">
      <h4>Dashboard</h4>
      <div className="grid md:grid-cols-2 md:gap-6 sm:gap-2 mt-8">
        <div className="px-6 py-6 flex justify-center  text-white text-xl bg-diamond-purple my-6 border-diamond-gold border-4 rounded-xl">
          <Link to="/users">Users</Link>
        </div>
        <div className="px-6 py-6 flex justify-center  text-white text-xl bg-diamond-purple my-6 border-diamond-gold border-4 rounded-xl">
          <Link to="/customers">Customers</Link>
        </div>
      </div>
    </div>
  );
}
