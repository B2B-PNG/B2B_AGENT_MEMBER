import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";
import { Calendar } from "lucide-react";

const NotificationPopup = () => {
    const router = useRouter()
    const notifications = [
        {
            id: 1,
            title: "Xác nhận Booking",
            content: "Booking 2C8F14C đã được Agent Host xác nhận thành công.",
            date: "02/04/2026 - 10:30",
            isRead: false,
        },
        {
            id: 2,
            title: "Cập nhật giá Tour",
            content: "Tour Hà Nội - Hạ Long vừa có thay đổi về tổng giá dịch vụ.",
            date: "01/04/2026 - 15:45",
            isRead: true,
        },
        {
            id: 3,
            title: "Nhắc nhở Deadline",
            content: "Sắp đến hạn thanh toán cho dịch vụ Tour Phú Quốc.",
            date: "31/03/2026 - 09:00",
            isRead: true,
        },
    ];

    return (
        <div className="relative">
            <div className="absolute right-0 top-[120%] pt-2 w-[320px]">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden z-50 p-1.5 shadow-2xl border border-gray-100">

                    <div className="px-3 py-2 mb-1 flex justify-between items-center">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Thông báo</span>
                        <span className="text-[10px] text-blue-500 hover:underline cursor-pointer">Đánh dấu đã đọc</span>
                    </div>

                    <div className="max-h-100 overflow-y-auto custom-scrollbar">
                        {notifications.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => router.push(paths.overlay.notification)}
                                className="group relative p-3 rounded-xl hover:bg-blue-50/50 transition-all cursor-pointer mb-0.5 border-b border-gray-50 last:border-0"
                            >
                                <div className="flex gap-3">
                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${item.isRead ? 'bg-transparent' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`} />

                                    <div className="space-y-1">
                                        <div className="text-start text-[13px] font-semibold text-gray-700 leading-none group-hover:text-[#004b91]">
                                            {item.title}
                                        </div>
                                        <p className="text-start text-[12px] text-gray-500 leading-snug line-clamp-2 font-normal">
                                            {item.content}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                            <Calendar size={12} />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <button onClick={() => router.push(paths.overlay.notification)} className="p-2 border-t border-gray-50 mt-1 w-full py-2 text-[12px] text-gray-500 hover:text-[#004b91] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                        Xem tất cả thông báo
                    </button>

                </div>
            </div>
        </div>
    );
};

export default NotificationPopup;