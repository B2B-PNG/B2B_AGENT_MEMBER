// import { useState, useRef, useEffect } from "react";
// import { useUser } from "@/hooks/actions/useAuth";
// import { User, LogOut, ChevronDown } from "lucide-react";
// import { getUrlImage } from "@/utils/format-image";
// import { CONFIG } from "@/config-global";

// const AuthUserInfo = () => {
//     // const { user, userLoading } = useUser();
//     const [isOpen, setIsOpen] = useState(false);
//     const menuRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: any) => {
//             if (menuRef.current && !menuRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     if (userLoading) return <div className="animate-pulse">Loading...</div>;
//     if (!user) return null;

//     const handleLogout = async () => {
//         window.location.href = `${CONFIG.serverUrl}auth/logout`;
//     };

//     return (
//         <div className="relative inline-block text-left" ref={menuRef}>
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-all"
//             >

//                 {user?.avatar ?

//                     <div className="w-8 h-8 rounded-full flex items-center justify-center text-white overflow-hidden">
//                         <img src={getUrlImage(user?.avatar)} alt={user?.avatar} className="w-full h-full object-cover" />
//                     </div>
//                     :
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
//                         <User size={20} />
//                     </div>

//                 }

//                 <span className="font-medium text-slate-700">{user.fullName || "User"}</span>
//                 <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
//             </button>

//             {isOpen && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-4 z-50">
//                     <div className="px-4 pb-3 border-b border-slate-50">
//                         <p className="font-bold text-slate-800">{user.fullName}</p>
//                         <p className="text-sm text-slate-400 truncate">{user.email}</p>
//                     </div>

//                     <div className="mt-2">
//                         <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors text-sm">
//                             <User size={18} /> Hồ Sơ Cá Nhân
//                         </button>
//                         {/* <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors text-sm">
//                             <FileText size={18} /> Đơn đặt của tôi
//                         </button>
//                         <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors text-sm">
//                             <Heart size={18} /> Yêu thích
//                         </button> */}
//                     </div>

//                     <div className="mt-2 pt-2 border-t border-slate-50">
//                         <button onClick={() => handleLogout()} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
//                             <LogOut size={18} /> Đăng xuất
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AuthUserInfo;