import { useState } from 'react';
import { Bell, Calendar, Filter, Search, Trash2 } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useUserStore } from '@/zustand/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/actions/query-keys';
import { useListAgentNotify } from '@/hooks/actions/useUser';
import { fDateTime } from '@/utils/format-time';

const NotificationView = () => {
    const [filter, setFilter] = useState('all');
    const user = useUserStore((state) => state.user);

    const { data } = useQuery({
        queryKey: [QUERY_KEYS.USER.LIST_AGENT_NOTIFY],
        queryFn: () =>
            useListAgentNotify({
                strCompanyGUID: user?.strCompanyGUID,
                strMemberGUID: null,
                strPassengerGUID: null,
                strGuideGUID: null,
                intLangID: user?.intLangID,
                intCurPage: null,
                intPageSize: null,
                strOrder: null,
                tblsReturn: "[0]"
            }),
    });

    const listData = data?.[0] ?? []

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Thông báo của bạn</h1>
                    <p className="text-gray-500 text-sm mt-1 font-normal">Quản lý và cập nhật các hoạt động mới nhất từ hệ thống iTourlink.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3 space-y-2">
                    {[
                        { id: 'all', label: 'Tất cả thông báo', count: 12 },
                        { id: 'unread', label: 'Chưa đọc', count: 3 },
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
                    <div className="divide-y divide-gray-50">
                        {listData.map((notif: any) => (
                            <div
                                key={notif?.strAgentNotifyGUID}
                                className={`p-5 flex gap-4 transition-colors cursor-pointer hover:bg-blue-50/30 ${!notif?.isRead ? 'bg-blue-50/10' : ''}`}
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-[#004b91]">
                                    <Bell size={20} />
                                </div>

                                <div className="flex-grow space-y-1">
                                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                        <Calendar size={12} />
                                        {fDateTime(notif?.dtmCreatedDateAgentNotifyTo)}
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-semibold text-gray-800">
                                            {notif?.strAgentNotifyTitle}
                                        </h3>
                                    </div>

                                    <p className="text-[13px] text-gray-500 leading-relaxed">
                                        {notif?.strAgentNotifyContent}
                                    </p>
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