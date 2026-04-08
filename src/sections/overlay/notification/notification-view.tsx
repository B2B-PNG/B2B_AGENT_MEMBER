import { useState } from 'react';
import { Bell, Calendar, CheckCheck, Filter, Search, Trash2 } from 'lucide-react';

const NotificationView = () => {
    const [filter, setFilter] = useState('all');

    const allNotifications = [
        {
            id: 1,
            title: "Xác nhận Booking",
            content: "Booking 2C8F14C đã được Agent Host xác nhận thành công. Vui lòng kiểm tra lại lịch trình và danh sách khách hàng trong mục quản lý tour.",
            date: "02/04/2026",
            time: "10:30",
            type: "booking",
            isRead: false,
        },
        {
            id: 2,
            title: "Cập nhật giá Tour",
            content: "Tour Hà Nội - Hạ Long vừa có thay đổi về tổng giá dịch vụ từ nhà cung cấp. Mức giá mới đã được cập nhật tự động vào hệ thống.",
            date: "01/04/2026",
            time: "15:45",
            type: "system",
            isRead: true,
        },
        {
            id: 3,
            title: "Nhắc nhở Deadline",
            content: "Sắp đến hạn thanh toán cho dịch vụ Tour Phú Quốc (Mã: 7AB92KD). Vui lòng hoàn tất thanh toán trước 17:00 ngày mai.",
            date: "31/03/2026",
            time: "09:00",
            type: "payment",
            isRead: true,
        },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Thông báo của bạn</h1>
                    <p className="text-gray-500 text-sm mt-1 font-normal">Quản lý và cập nhật các hoạt động mới nhất từ hệ thống iTourlink.</p>
                </div>
                <button className="flex items-center gap-2 text-sm text-[#004b91] hover:underline font-medium">
                    <CheckCheck size={18} />
                    Đánh dấu tất cả là đã đọc
                </button>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 space-y-2">
                    {[
                        { id: 'all', label: 'Tất cả thông báo', count: 12 },
                        { id: 'unread', label: 'Chưa đọc', count: 3 },
                        { id: 'booking', label: 'Booking & Tour', count: 5 },
                        { id: 'system', label: 'Hệ thống', count: 4 },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setFilter(item.id)}
                            className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-sm transition-all ${filter === item.id
                                ? 'bg-[#004b91] text-white shadow-lg shadow-blue-100'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent'
                                }`}
                        >
                            <span className="font-medium">{item.label}</span>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full ${filter === item.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                {item.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="col-span-12 md:col-span-9 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm thông báo..."
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-300 transition-all"
                            />
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Filter size={16} />
                        </button>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {allNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-5 flex gap-4 transition-colors cursor-pointer hover:bg-blue-50/30 ${!notif.isRead ? 'bg-blue-50/10' : ''}`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notif.type === 'booking' ? 'bg-blue-100 text-[#004b91]' :
                                    notif.type === 'payment' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    <Bell size={20} />
                                </div>

                                <div className="flex-grow space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`text-sm ${!notif.isRead ? 'font-bold text-gray-800' : 'font-medium text-gray-600'}`}>
                                            {notif.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[11px] text-gray-400 font-normal">
                                            <Calendar size={12} />
                                            {notif.time} - {notif.date}
                                        </div>
                                    </div>
                                    <p className="text-[13px] text-gray-500 leading-relaxed font-normal">
                                        {notif.content}
                                    </p>
                                    {!notif.isRead && (
                                        <div className="pt-2 flex gap-3">
                                            <button className="text-[11px] text-[#004b91] font-semibold hover:underline">Xem chi tiết booking</button>
                                            <button className="text-[11px] text-gray-400 font-medium hover:underline">Đánh dấu đã đọc</button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-shrink-0">
                                    <button className="p-1 text-gray-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 text-center border-t border-gray-50">
                        <button className="text-xs text-gray-400 font-medium hover:text-gray-600">
                            Tải thêm thông báo cũ hơn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationView;