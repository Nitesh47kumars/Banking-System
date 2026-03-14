import { useSelector } from "react-redux";

const AccountCard = ({user, account}) => {
    return (
      <div className="w-[320px] bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {user.name.charAt(0)}
          </div>
  
          <div>
            <h3 className="text-base font-semibold">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
  
        {/* Divider */}
        <div className="border-t my-3"></div>
  
        {/* Details */}
        <div className="space-y-2 text-sm">
  
          <div className="flex justify-between">
            <span className="text-gray-500">Account ID</span>
            <span className="font-medium text-gray-700 text-xs">
              {account._id.slice(-8)}
            </span>
          </div>
  
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
              {account.status}
            </span>
          </div>
  
          <div className="flex justify-between">
            <span className="text-gray-500">Member Since</span>
            <span className="font-medium text-gray-700">
              {new Date(account.createdAt).toLocaleDateString()}
            </span>
          </div>
  
        </div>
  
      </div>
    );
  };
  
  export default AccountCard;
  